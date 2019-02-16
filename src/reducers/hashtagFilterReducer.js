const hashtagFilterDefaultState = {
    sortBy: 'newest'
};

const hashtagFilter = (state = hashtagFilterDefaultState, action) => {
    switch (action.type) {
        case 'HASHTAG_QUERY':
            return {sortBy: action.query}
        case 'RESET_QUERY':
            return hashtagFilterDefaultState;
        default:
            return state
    };
};

export default hashtagFilter;