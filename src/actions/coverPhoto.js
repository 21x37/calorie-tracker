import database, { storageRef } from '../firebase/firebase';

export const setCoverPhoto = (url) => ({
    type: 'SET_COVER_PHOTO',
    url
})

export const startSetCoverPhoto = (photo, id, prevName) => {
    return (dispatch) => {
        console.log('0')
        return storageRef.child(`images/${photo.name}`).put(photo).then(() => {
            console.log('1')
            storageRef.child(`images/${prevName}`).delete();
            storageRef.child(`images/${photo.name}`).getDownloadURL().then((url) => {
                console.log('URL', url);
                database.ref(`users/${id}`).update({
                    coverPhoto: {
                        picture: url,
                        name: photo.name
                    }
                });
                dispatch(setCoverPhoto({ picture: url, name: photo.name}))
            });
        });
    };
};

export const uploadProfilePicture = (url, id) => ({
    type: 'SET_PROFILE_PICTURE',
    url,
    id
});


export const startUploadProfilePicture = (photo, id) => {
    return (dispatch) => {
        return storageRef.child(`images/${photo.name}`).put(photo).then(() => {
            storageRef.child(`images/${photo.name}`).getDownloadURL().then((url) => {
                // UPDATE ALL TEXT STATUSES THAT ARE CREATED BY CURRENT USER WITH NEW IMAGE
                database.ref(`statusItem`).once('value').then((snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        console.log('COVER PHOTO ACTION', childSnapshot.val().createdBy, id);
                        if (childSnapshot.val().createdBy === id) {
                            database.ref(`statusItem/${childSnapshot.key}`).update({author: {...childSnapshot.val().author, picture: url}})
                        };
                    });
                });

                // UPDATING ALL IMAGE STATUSES THAT ARE CREATED BY CURRENT USER WITH NEW IMAGE
                database.ref(`uploadedImages`).once('value').then((snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        if (childSnapshot.val().createdBy === id) {
                            database.ref(`uploadedImages/${childSnapshot.key}`).update({author: {...childSnapshot.val().author, picture: url}})
                        };
                    });
                });

                database.ref(`users/${id}`).update({
                    picture: url
                });
                
                dispatch(uploadProfilePicture(url, id));
            });
        });
    };
};