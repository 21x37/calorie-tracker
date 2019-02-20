const defaultCommentState = []

const commentReducer = (state = defaultCommentState, action) => {
    switch(action.type) {
        case 'ADD_COMMENT':
            console.log('add')
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
        default:
            return state;
    }
}

export default commentReducer;
