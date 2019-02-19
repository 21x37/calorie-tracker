import database from '../firebase/firebase';

export const addLike = (like) => ({
    type: 'ADD_LIKE',
    like
});

export const startAddLike = (like) => {
    return (dispatch) => {
        return database.ref(`users/${like.likedBy}/likes`).push(like).then((ref) => {
            dispatch(addLike({
                ...like,
                id: ref.key
            }));
            database.ref(`statusItem/${like.parentId}`).update({likes: parseInt(like.likesAmount) + 1});
        });
    };
};


export const setLike = (likes) => ({
    type: 'SET_LIKES',
    likes
});


export const startSetLike = (currentUser) => {
    return (dispatch) => {
        return database.ref(`users/${currentUser}/likes`).once('value').then((snapshot) => {
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

export const removeLike = (id) => ({
    type: 'REMOVE_LIKE',
    id
});

export const startRemoveLike = (currentUser, id, likesAmount, parentId) => {
    return (dispatch) => {
        return database.ref(`users/${currentUser}/likes/${id}`).remove().then(() => {
            dispatch(removeLike(id));
            database.ref(`statusItem/${parentId}`).update({likes: likesAmount - 1});
        })
    };
};

export const startRemoveAllLikes = () => ({
    type: 'REMOVE_ALL_LIKES'
})