const postStatusReducerDefaultState = [];

const postStatusReducer = (state = postStatusReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_STATUS':
            return [
                ...state,
                action.status
            ];
        case 'DELETE_STATUS':
            return state.filter(statusItem => {
                statusItem !== action.id
            });
        default:
            return state;
    };
};

export default postStatusReducer
// const store = createStore(postStatusReducer);

// // store.dispatch(postStatus({description: 'ok', id:2, date:'today'}));

// console.log(store.getState());

// // store.dispatch(deleteStatus({description: 'ok', id:2, date:'today'}));

// console.log(store.getState());
