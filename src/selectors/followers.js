import database from '../firebase/firebase';


const followers = (userId) => {
    const followering = [];
    if (userId) {
        database.ref(`users/${userId}/followers`).once('value').then((snapshot) => {

            const follower = [] || Object.values(snapshot.val())
            follower.forEach((follow) => {
                database.ref(`users/${follow.userId}`).once('value').then((profileSnapshot) => {
                    followering.push(profileSnapshot.val());
                });
            });
        });
        return followering;
    };



    // const followers = [];
    // if (userFollowers) { 
    //     console.log(userFollowers);
    //     userFollowers.forEach(follow => {
    //         database.ref(`users/${follow.userId}`).once('value').then((snapshot) => {
    //             followers.push(snapshot.val());
    //         })
    //     })
    //     console.log('FOLLLLLLOWERS', followers);
    // }

    // return followers;
};

export default followers;