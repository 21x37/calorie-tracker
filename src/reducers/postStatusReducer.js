const postStatusReducerDefaultState = [];

const postStatusReducer = (state = postStatusReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_STATUS':
            return [
                action.status,
                ...state
            ];
        case 'DELETE_STATUS':
            return state.filter(statusItem => statusItem.id !== action.id);
        case 'SET_STATUS':
            return action.status;
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
