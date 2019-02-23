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
                    id: userSnapshot.key,
                    followingId: currentUserSnapshot.key,
                    userId: {
                        id: id,
                        userId: userId
                    }

                    // id,
                    // followingId: currentUserSnapshot.key,
                    // followerId: userSnapshot.key,
                    // following: userId
                }));
            });
        });
    };
};

export const unfollow = (id, userId) => ({
    type: 'REMOVE_FOLLOWING',
    id,
    userId
});

export const startUnfollow = (id, followingId, followerId, userId) => {
    return (dispatch) => {
        return database.ref(`users/${id}/following/${followingId}`).remove().then(() => {
            database.ref(`users/${userId}/followers/${followerId}`).remove().then(() => {
                dispatch(unfollow(id, userId));
            });
        });
    };
};


// STORE FOLLOWING IN USERS/CURRENTUSERID

// STORE FOLLOWERS IN USERS/USERID WITH CURRENTUSERID