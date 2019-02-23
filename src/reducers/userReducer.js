const usersReducerDefaultState = {};

const userReducer = (state = usersReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return action.user
        case 'SET_BIO':
            return {
                ...state,
                bio: action.bio
            };
        case 'RESET_USER':
            return usersReducerDefaultState;
        case 'SET_COVER_PHOTO':
            return {
                ...state,
                coverPhoto: action.url
            };
        case 'SET_PROFILE_PICTURE':
            return {
                ...state,
                picture: action.url
            }
        case 'ADD_FOLLOWING':
            return {
                ...state,
                followers: [...state.followers, action.follow]
            };
        case 'REMOVE_FOLLOWING':
        console.log('REDUCER STATE', state.followers);
        console.log('REDUCER ACTION', action.id);
            return {
                ...state,
                followers: state.followers.filter(follow => follow.userId.id !== action.id)
            };
        default:
            return state
    };
};

export default userReducer;