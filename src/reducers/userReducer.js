const usersReducerDefaultState = {};

const userReducer = (state = usersReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return action.user
        case 'SET_BIO':
            return {
                ...state,
                bio: action.bio
            }
        default:
            return state
    };
};

export default userReducer;