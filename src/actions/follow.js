import database from '../firebase/firebase';

export const follow = (follow) => ({
    type: 'ADD_FOLLOWING',
    follow
});

export const startFollow = (id, userId) => {
    return (dispatch) => {
        return database.ref(`users/${id}/following`).push({ id, userId }).then((currentUserSnapshot) => {
            database.ref(`users/${userId}/followers`).push({ id, userId }).then((userSnapshot) => {
                dispatch(follow({
                    id,
                    followingId: currentUserSnapshot.key,
                    followerId: userSnapshot.key,
                    following: userId
                }));
            });
        });
    };
};

export const unfollow = (id) => ({
    type: 'REMOVE_FOLLOWING',
    id
});

export const startUnfollow = (id, followingId, followerId, userId) => {
    return (dispatch) => {
        return database.ref(`users/${id}/following/${followingId}`).remove().then(() => {
            database.ref(`users/${userId}/followers/${followerId}`).remove().then(() => {
                dispatch(unfollow(id));
            });
        })


        console.log(1);
        console.log(`users/${id}/following/${followingId}`)
        database.ref(`users/${id}/${followingId}`).remove().then(() => {
            console.log(2);
            console.log(`users/${userId}/followers/${followerId}`)
            database.ref(`users/${userId}/${followerId}`).remove().then(() => {
                console.log(3);
                dispatch(unfollow(id));
            });
        });
    };
};


// STORE FOLLOWING IN USERS/CURRENTUSERID

// STORE FOLLOWERS IN USERS/USERID WITH CURRENTUSERID