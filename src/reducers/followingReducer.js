
const followingReducerDefaultState = [];

const followingReducer = (state = followingReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_FOLLOWING':
            return [
                ...state,
                action.follow
            ];
        case 'REMOVE_FOLLOWING':
            return state.filter(follows => follows.id !== action.id);
        default:
            return state;
    };
};

export default followingReducer;