import database from '../firebase/firebase';

export const searchUser = (user) => ({
    type: 'SEARCH_USER',
    user
})

export const startSearchUser = (query) => {
    return (dispatch) => {
        return database.ref('users').once('value').then((snapshot) => {
            const userSearch = [];
            snapshot.forEach(childSnapshot => {
                if (query !== '') {
                    if (childSnapshot.val().name.toLowerCase().indexOf(query.toLowerCase()) > -1 ) {
                        userSearch.push({
                            name: childSnapshot.val().name,
                            id: childSnapshot.key,
                            picture: childSnapshot.val().picture
                        })
                    }
                }
            })
            dispatch(searchUser(userSearch));
        });
    };
};

export const clearUser = () => ({
    type: 'CLEAR_USER'
})