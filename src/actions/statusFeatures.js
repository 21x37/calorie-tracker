import database from '../firebase/firebase';

export const startSetLike = (dbLocation, parentId, likes) => {
    return() => {
        return database.ref(`${dbLocation}/${parentId}`).update({ likes })
    }
};

const addHashTag = (hashtag) => ({
    type: 'ADD_HASHTAG',
    hashtag
});

export const startAddHashtags = (hashtag) => {
    return (dispatch) => {
        return database.ref(`trending-hashtags`).push(hashtag).then(() => {
            dispatch(addHashTag(hashtag));
        });
    };
};

export const setHashtags = (trendingList) => ({
    type: 'SET_HASHTAG',
    trendingList
})

export const startSetHashtags = () => {
    return (dispatch) => {
        return database.ref('trending-hashtags').once('value').then((snapshot) => {
            const trendingList = [];
            snapshot.forEach((childSnapshot) => {
                trendingList.push({hashtag: childSnapshot.val(), id: childSnapshot.key});
            })
            dispatch(setHashtags(trendingList));
        })
    }
}
