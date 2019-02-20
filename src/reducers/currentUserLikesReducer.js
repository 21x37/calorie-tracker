const likesReducerDefaultState = [];

const currentUserLikesReducer = (state = likesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_LIKE':
            return [
                ...state,
                action.like
            ];
        case 'ADD_COMMENT_LIKE':
            return [
                ...state,
                action.like
            ];
        case 'REMOVE_LIKE':
            return state.filter(likes => likes.id !== action.id);
        case 'REMOVE_COMMENT_LIKE':
            return state.filter(likes => likes.id !== action.id);
        case 'SET_LIKES':
            return action.likes;
        case 'REMOVE_ALL_LIKES':
            return likesReducerDefaultState;
        default:
            return state;
    }
}

export default currentUserLikesReducer;