import database, { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
    return (dispatch) => {
        return firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
            
            const googleId = result.additionalUserInfo.profile.id

            database.ref('userIDs').once('value').then((snapshot) => {

                let count = 0;
                // INCREMENT COUNT EACH TIME THE ID MATCHES A ID FOUND IN DATABASE
                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.val() === googleId) {
                        count++
                    }
                });

                // IF NO MATCHING IDS ARE FOUND DISPATCH THE NEW UNIQUE ID TO DATABASE
                if (count === 0) {
                    database.ref('users').push(result.additionalUserInfo.profile).then((ref) => {
                        database.ref('userIDs').push(googleId);
                        dispatch(addUser({
                            ...result.additionalUserInfo.profile,
                            id: ref.key,
                            googleId: result.additionalUserInfo.profile.id
                        }));
                    });
                }
            })
        });
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {  
        return firebase.auth().signOut();
    };
};


// ------ USERS ------- //

export const addUser = (user) => ({
    type: 'ADD_USER',
    user
});
