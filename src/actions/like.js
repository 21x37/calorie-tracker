import database from '../firebase/firebase';

export const addLike = (like) => ({
    type: 'ADD_LIKE',
    like,
    parentId: like.parentId
});

export const startAddCommentLike = (like) => ({
    type: 'ADD_COMMENT_LIKE',
    like
})

export const startAddLike = (like, dbLocation, type) => {
    return (dispatch) => {
        return database.ref(`users/${like.likedBy}/likes`).push(like).then((ref) => {
            if (type) {
                dispatch(startAddCommentLike({
                    ...like,
                    id: ref.key
                }))
                database.ref(`${dbLocation}/${like.parentId}`).update({likes: parseInt(like.likesAmount) + 1});
            }else {
                dispatch(addLike({
                    ...like,
                    id: ref.key
                }));
                database.ref(`${dbLocation}/${like.parentId}`).update({likes: parseInt(like.likesAmount) + 1});
            }
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

export const removeLike = (id, parentId) => ({
    type: 'REMOVE_LIKE',
    id,
    parentId
});

export const removeCommentLike = (id, parentId) => ({
    type: 'REMOVE_COMMENT_LIKE',
    id,
    parentId
})

export const startRemoveLike = (currentUser, id, likesAmount, parentId, dbLocation, type) => {
    return (dispatch) => {
        return database.ref(`users/${currentUser}/likes/${id}`).remove().then(() => {
            if (type) {
                dispatch(removeCommentLike(id, parentId))

                database.ref(`${dbLocation}/${parentId}`).update({likes: likesAmount - 1});
            } else {
                dispatch(removeLike(id, parentId));
                database.ref(`${dbLocation}/${parentId}`).update({likes: likesAmount - 1});
            }

        })
    };
};

export const startRemoveAllLikes = () => ({
    type: 'REMOVE_ALL_LIKES'
})