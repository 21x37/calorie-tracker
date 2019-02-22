
const searchUserDefaultState = [];

const searchUser = (state = searchUserDefaultState, action) => {
    switch (action.type) {
        case 'SEARCH_USER':
            return action.user;
        case 'CLEAR_USER':
            return searchUserDefaultState;
        default:
            return state;
    }
}

export default searchUser;