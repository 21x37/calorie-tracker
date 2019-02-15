const statusFeaturesReducerDefaultState = [];

const statusFeaturesReducer = (state=statusFeaturesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_HASHTAG':
            return [
                ...state,
                action.hashtag
            ];
        case 'SET_HASHTAG':
            return action.trendingList;
        default:
            return state;
    }
};

export default statusFeaturesReducer;
