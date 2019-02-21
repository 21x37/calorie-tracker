const defaultCommentState = []

const commentReducer = (state = defaultCommentState, action) => {
    switch(action.type) {
        case 'ADD_COMMENT':
            return [
                ...state,
                action.comment
            ];
        case 'REMOVE_COMMENT':
            return state.filter(commentItem => commentItem.id !== action.id); 
        case 'SET_COMMENT':
            return action.comment;
        case 'REMOVE_ALL_COMMENTS':
            return defaultCommentState;
        case 'ADD_COMMENT_LIKE':
        return state.map(comment => {
            if (comment.id === action.like.parentId) {
                comment.likes++
            }  
            return comment
        });
        case 'REMOVE_COMMENT_LIKE':
        return state.map(comment => {
            if (comment.id === action.parentId) {
                comment.likes--
            }  
            return comment
        });
        default:
            return state;
    }
}

export default commentReducer;
