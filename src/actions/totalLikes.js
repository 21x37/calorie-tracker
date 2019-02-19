import database from '../firebase/firebase';

export const addTotalLike = (like) => ({
    type: 'ADD_TOTAL_LIKE',
    like
});

export const startAddTotalLike = (like) => {
    return (dispatch) => {
        return database.ref(`likes`).push(like).then((snapshot) => {
            dispatch(addTotalLike({
                like,
                id: snapshot.key
            }));
        });
    };
};

export const setTotalLikes = (likes) => ({
    type: 'SET_TOTAL_LIKES',
    likes
})

export const startSetTotalLikes = () => {
    return (dispatch) => {
        return database.ref(`likes`).once('value').then((snapshot) => {
            const totalLikes = [];
            snapshot.forEach((childSnapshot) => {
                totalLikes.push(childSnapshot.val());
            })
            dispatch(setTotalLikes(totalLikes));
        })
    };
};

export const removeTotalLikes = (id) => ({
    type: 'REMOVE_TOTAL_LIKES',
    id
})

export const startRemoveTotalLikes = () => {
    return (dispatch) => {
        return database.ref(`likes/${id}`).remove().then(() => {
            dispatch(removeTotalLikes(id));
        })
    }
}