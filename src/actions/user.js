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