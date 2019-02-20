import database from '../firebase/firebase';

export const setUser = (user) => ({
    type: 'ADD_USER',
    user
});

export const startSetUser = (id, user) => {
    return (dispatch) => {
        if (user === undefined || user.id !== id) {
            return database.ref(`users/${id}`).once('value').then((snapshot) => {
                const user = {
                    ...snapshot.val(),
                    id: snapshot.key
                };
                dispatch(setUser(user));
            });  
        };
    };
};

export const setBio = (bio) => ({
    type: 'SET_BIO',
    bio
});

export const startSetBio = (id, bio) => {
    return (dispatch) => {
        return database.ref(`users/${id}`).update({bio}).then(() => {
            dispatch(setBio(bio));
        });
    };
};