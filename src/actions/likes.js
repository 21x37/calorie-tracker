import database from '../firebase/firebase';

// export const addLike = (like) => ({
//     type: 'ADD_LIKE',
//     like
// });

// export const startAddLike = (like) => {
//     return (dispatch) => {
//         return database.ref(`users/${like.ref}/likes`).push(like).then((ref) => {
//             dispatch(addLike({
//                 id: ref.key,
//                 ...like
//             }));
//         });
//     };
// };

export const removeLike = (id) => ({
    type: 'REMOVE_LIKE',
    id
});

export const startRemoveLike = (ref, id) => {
    return (dispatch) => {
        return database.ref(`users/${ref}/likes/${id}`).remove().then(() => {
            dispatch(removeLike(id));
        })
    };
};

export const setLike = (likes) => ({
    type: 'SET_LIKE',
    likes
});

export const startSetLike = (ref) => {
    return (dispatch) => {
        database.ref(`users/${ref}/likes`).once('value').then((snapshot) => {
            const likes = [];
            snapshot.forEach((childSnapshot) => {
                likes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setLike(likes));
        });
    };
};