import database from '../firebase/firebase';


export const startSetLike = (dbLocation, parentId, likes) => {
    return() => {
        return database.ref(`${dbLocation}/${parentId}`).update({ likes })
    };
};

const addHashTag = (hashtag) => ({
    type: 'ADD_HASHTAG',
    hashtag
});

export const startAddHashtags = (hashtag) => {
    return (dispatch) => {
        return database.ref(`trending-hashtags`).push(hashtag).then((snapshot) => {
            dispatch(addHashTag({hashtag, id: snapshot.key}));
        });
    };
};

export const setHashtags = (trendingList) => ({
    type: 'SET_HASHTAG',
    trendingList
});

export const startSetHashtags = () => {
    return (dispatch) => {
        return database.ref('trending-hashtags').once('value').then((snapshot) => {
            const trendingList = [];
            snapshot.forEach((childSnapshot) => {
                trendingList.push({hashtag: childSnapshot.val(), id: childSnapshot.key});
            })
            dispatch(setHashtags(trendingList));
        });
    };
};

export const removeHashtag = ({ id }) => ({
    type: 'REMOVE_HASHTAG',
    id
});


export const startRemoveHashtag = ({ id }) => {
    return(dispatch) => {
        return database.ref(`trending-hashtags/${id}`).remove().then(() => {
            dispatch(removeHashtag({ id }));
        });
    };
};

export const startRemoveAllHashtags = () => ({
    type: 'REMOVE_ALL_HASHTAGS'
})