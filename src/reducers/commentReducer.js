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
            return state.comment.filter(commentItem => commentItem.id !== action.id) 
        default:
            return state;
    }
}

export default commentReducer;
