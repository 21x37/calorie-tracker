const totalLikesReducerDefaultState = [];

const totalLikesReducer = (state = totalLikesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_TOTAL_LIKE':
            return [
                ...state,
                action.like
            ]
        case 'SET_TOTAL_LIKES':
            return action.likes
        case 'REMOVE_TOTAL_LIKES':
            return state.filter(like.id !== action.id);
        default:
            return state;
    };
};

export default totalLikesReducer;