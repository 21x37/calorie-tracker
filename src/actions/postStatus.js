import database from '../firebase/firebase';

// POST STATUS ACTIONS
export const addStatus = (status) => ({
    type: 'ADD_STATUS',
    status
});

export const startAddStatus = (status) => {
    return (dispatch) => {
         return database.ref('statusItem').push(status).then((ref) => {
             dispatch(addStatus({
                 id: ref.key,
                 ...status
             }))
         })
    };
};

export const deleteStatus = ({ id }) => ({
    type: 'DELETE_STATUS',
    id
});


export const startDeleteStatus = ({id}) => {
    return (dispatch) => {
        return database.ref(`statusItem/${id}`).remove().then(() => {
            dispatch(deleteStatus({ id }))
        });
    };
};

export const editStatus = ({id, updates}) => ({
    type: 'EDIT_STATUS',
    id,
    updates
});