import database from '../firebase/firebase';

export const addComment = (comment) => ({
    type: 'ADD_COMMENT',
    comment
});

export const startAddComment = (comment) => {
    return (dispatch) => {
        return database.ref(`comments`).push(comment).then((ref) => {
            dispatch(addComment({
                id: ref.key,
                ...comment
            }));
        });
    };
};

export const setComment = (comment) => ({
    type: 'SET_COMMENT',
    comment
});

export const startSetComment = () => {
    return (dispatch) => {
        return database.ref(`comments`).once('value').then((snapshot) => {
            const comments = [];
            snapshot.forEach(childSnapshot => {
                comments.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setComment(comments))
        });
    };
};

export const removeComment = ({ id }) => ({
    type: 'REMOVE_COMMENT',
    id
});


export const startRemoveComment = (comment) => {
    console.log(comment.id);
    return (dispatch) => {
        return database.ref(`comments/${comment.id}`).remove().then(() => {
            dispatch(removeComment({ id: comment.id }))
        })
    };
};

export const startRemoveAllComments = () => ({
    type: 'REMOVE_ALL_COMMENTS'
})
