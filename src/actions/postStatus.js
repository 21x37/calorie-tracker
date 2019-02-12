// POST STATUS ACTIONS
export const addStatus = (status) => ({
    type: 'ADD_STATUS',
    status
});

export const deleteStatus = ({ id }) => ({
    type: 'DELETE_STATUS',
    id
});

export const editStatus = ({id, updates}) => ({
    type: 'EDIT_STATUS',
    id,
    updates
});