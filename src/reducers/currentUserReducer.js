

const currentUserReducer = (state={}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return action.user
        case 'REMOVE_CURRENT_USER':
            return {}
        case 'ADD_FOLLOWING':
            return {
                ...state,
                following: [...state.following, action.follow]
            }
        case 'REMOVE_FOLLOWING':
        console.log('FOLLOWING FOLLOWING', state.following);
        console.log('ACTION ID ACTION ID', action.id);
            return {
                ...state,
                following: state.following.filter(follow => follow.userId.userId !== action.userId)
            }
        default:
            return state;
    };
};

export default currentUserReducer;