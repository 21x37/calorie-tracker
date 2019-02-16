const hashtagFilterDefaultState = {
    sortBy: 'newest'
};

const hashtagFilter = (state = hashtagFilterDefaultState, action) => {
    switch (action.type) {
        case 'HASHTAG_QUERY':
            return {sortBy: action.query}
        default:
            return state
    };
};

export default hashtagFilter;