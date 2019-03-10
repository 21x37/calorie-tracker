import moment from 'moment'
import database from '../firebase/firebase';
import { storageRef, storageService } from '../firebase/firebase';

// POST STATUS ACTIONS
export const addStatus = (status) => ({
    type: 'ADD_STATUS',
    status
});

export const startAddStatus = (status) => {
    return (dispatch) => {
         return database.ref('statusItem').push(status).then((ref) => {
             dispatch(addStatus({
                 id: ref.key,
                 ...status
             }));
         });
    };
};

export const deleteStatus = ({ id }) => ({
    type: 'DELETE_STATUS',
    id
});


export const startDeleteStatus = ({id}) => {
    return (dispatch) => {
        return database.ref(`statusItem/${id}`).remove().then(() => {
            dispatch(deleteStatus({ id }))
        });
    };
};

export const setStatus = (status) => ({
    type: 'SET_STATUS',
    status
});

export const startSetStatus = () => {
    return(dispatch) => {
        return database.ref('statusItem').once('value').then((snapshot) => {
            const status = [];


            
            snapshot.forEach((childSnapshot) => {
                status.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                });
            });
            
            dispatch(setStatus(status));
        });
    };
};


export const editStatus = ({id, updates}) => ({
    type: 'EDIT_STATUS',
    id,
    updates
});

// ---- IMAGE UPLOADS ---- //

export const uploadImage = (image) => ({
    type: 'UPLOAD_IMAGE',
    image

});
export const storeImageNames = (imageStatus) => {
        return database.ref('uploadedImages').push({
            name: imageStatus.uploadedImage.name,
            url: imageStatus.url,
            description: imageStatus.description,
            type: 'image',
            likes: 0,
            createdAt: imageStatus.createdAt,
            createdBy: imageStatus.createdBy,
            author: imageStatus.author
        });
};

export const startUploadImage = (imageStatus) => {
    return (dispatch) => {
        // ADDING IMAGE TO FIREBASE STORAGE
        return storageRef.child(`images/${imageStatus.uploadedImage.name}`).put(imageStatus.uploadedImage).on('state_changed', (snapshot) => {
            
        },(e) => {
        }, () => {
            // ONCE ADDED, FETCHING THE DOWNLOAD URL
            storageRef.child(`images/${imageStatus.uploadedImage.name}`).getDownloadURL().then((url) => {
                // STORE THE IMAGE IN DATABASE WITH URL
                storeImageNames({...imageStatus, url}).then((ref) => {
                    const image = {
                        ...imageStatus,
                        type: 'image',
                        id: ref.key,
                        name: imageStatus.uploadedImage.name,
                        url
                    };
                    dispatch(uploadImage(image))
                });

            });
        });
    };
};

export const setImages = (images) => ({
    type: 'SET_IMAGE',
    images
})

export const startSetImages = () => {
    return (dispatch) => {
        return database.ref('uploadedImages').once('value').then((snapshot) => {
            const images = [];
            snapshot.forEach((childSnapshot) => {
                images.push({
                    ...childSnapshot.val(),
                    id: childSnapshot.key,
                })
            })
            dispatch(setImages(images));
        })
    };
};



export const deleteImage = (id) => ({
    type: 'DELETE_IMAGE',
    id
});

export const startDeleteImage = (id, name) => {
    return (dispatch) => {
        return storageRef.child(`images/${name}`).delete().then(() => {
            database.ref(`uploadedImages/${id}`).remove().then(() => {
                dispatch(deleteImage(id));
            })
        });
    };
};

export const startRemoveAllStatuses = () => ({
    type: 'REMOVE_ALL_STATUSES'
})