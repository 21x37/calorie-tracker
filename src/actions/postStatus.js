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
                    ...childSnapshot.val()
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
export const storeImageNames = (selectedFile, url, caption) => {
        return database.ref('uploadedImages').push({name: selectedFile.name, url, caption, likes: 0 });
};

export const startUploadImage = (selectedFile, caption) => {
    return (dispatch) => {
        return storageRef.child(`images/${selectedFile.name}`).put(selectedFile).on('state_changed', (snapshot) => {
            
        },(e) => {
            console.log(e);
        }, () => {
            console.log('uploaded');
            storageRef.child(`images/${selectedFile.name}`).getDownloadURL().then((url) => {

                storeImageNames(selectedFile, url, caption).then((ref) => {
                    const date = moment();
                    const image = {
                        id: ref.key,
                        name: selectedFile.name,
                        createdAt: date.format,
                        url,
                        caption,
                        likes: 0
                    };
                    dispatch(uploadImage(image))
                });

                console.log(url);
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
            snapshot.forEach(childSnpashot => {
                images.push({
                    ...childSnpashot.val(),
                    id: childSnpashot.key
                })
            })
            dispatch(setImages(images));
            console.log(images);
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

