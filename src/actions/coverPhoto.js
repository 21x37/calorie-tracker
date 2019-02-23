import database, { storageRef } from '../firebase/firebase';

export const setCoverPhoto = (url) => ({
    type: 'SET_COVER_PHOTO',
    url
})

export const startSetCoverPhoto = (photo, id) => {
    return (dispatch) => {
        console.log('0')
        return storageRef.child(`images/${photo.name}`).put(photo).then(() => {
            console.log('1')
            storageRef.child(`images/${photo.name}`).getDownloadURL().then((url) => {
                console.log('URL', url);
                database.ref(`users/${id}`).update({
                    coverPhoto: url
                });
                dispatch(setCoverPhoto(url))
            });
        });
    };
};
