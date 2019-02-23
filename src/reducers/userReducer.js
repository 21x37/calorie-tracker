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
        case 'RESET_USER':
            return usersReducerDefaultState;
        case 'SET_COVER_PHOTO':
            return {
                ...state,
                coverPhoto: action.url
            }
        default:
            return state
    };
};

export default userReducer;