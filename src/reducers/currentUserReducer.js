

const currentUserReducer = (state={}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return action.user
        case 'REMOVE_CURRENT_USER':
            return {}
        // case 'ADD_LIKE':
        //     return {
        //         ...state,
        //         likes: [...state.likes, action.like]

        //     }
        // case 'SET_LIKE':
        //     return {
        //         ...state,
        //         likes: action.likes
        //     }
        // case 'REMOVE_LIKE':
        //     return {
        //         ...state,
        //         likes: state.likes.filter(like => like.id !== action.id)
        //     }
        default:
            return state;
    };
};

export default currentUserReducer;