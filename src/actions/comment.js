import database from '../firebase/firebase';

export const addComment = (comment) => ({
    type: 'ADD_COMMENT',
    comment
});

export const startAddComment = (parentId, comment) => {
    return (dispatch) => {
        return database.ref(`status/${parentId}/comment`).push(comment).then((ref) => {
            dispatch(addComent({
                id: ref.key,
                ...comment
            }));
        });
    };
};

export const removeComment = ({ id }) => ({
    type: 'REMOVE_COMMENT',
    id
});

const commentMockup = {
    id: 0,
    description: '',
    createdAt: ''
}