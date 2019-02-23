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
                if (status.id === action.like.parentId) {
                    status.likes++
                }  
                return status
            });
        case 'REMOVE_LIKE':
            return state.map(status => {
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
        case 'SET_PROFILE_PICTURE':
            return [
                ...state.map(statusItem => {
                    if (statusItem.createdBy === action.id) {
                        statusItem = {...statusItem, author: {...statusItem.author, picture: action.url}}
                    }
                    return statusItem;
                })
            ]
        default:
            return state;
    };
};

export default postStatusReducer

