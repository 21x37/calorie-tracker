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
        case 'UPLOAD_IMAGE':
            return [
                action.image,
                ...state
            ];
        case 'SET_IMAGE':
            return [
                ...state,
                ...action.images
            ]
        case 'DELETE_IMAGE':
            return state.filter(statusItem => statusItem.id !== action.id);
        case 'ADD_LIKE':
            return state.map(status => {
                console.log('ADDING LIKE', status);
                if (status.id === action.like.parentId) {
                    status.likes++
                }  
                return status
            });
        case 'REMOVE_LIKE':
            return state.map(status => {
                console.log('REMOVING LIKE');
                console.log(status.id, action.parentId);
                console.log('REMOVING LIKE');
                if (status.id === action.parentId) {
                    status.likes--
                }  
                return status
        });
            // return [
            //     ...state,
            //     action.like
            // ]
        case 'REMOVE_ALL_STATUSES':
            return postStatusReducerDefaultState;
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
