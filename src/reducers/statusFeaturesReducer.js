const statusFeaturesReducerDefaultState = [];

const statusFeaturesReducer = (state=statusFeaturesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_HASHTAG':
            return [...state, action.hashtag]
        case 'REMOVE_HASHTAG':
            return state.filter((hashtag) => hashtag.id !== action.id);
        case 'SET_HASHTAG':
            return action.trendingList;
        case 'REMOVE_ALL_HASHTAGS':
            return statusFeaturesReducerDefaultState;
        default:
            return state;
    }
};

export default statusFeaturesReducer;
