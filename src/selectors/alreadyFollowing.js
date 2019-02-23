const alreadyFollowing = (currentUserFollowing, id) => {
    if (currentUserFollowing) {

         const following = [];
         currentUserFollowing.forEach(follow => {
            following.push(follow.userId.userId);
         });
         console.log(following);
         if (following.indexOf(id) === -1 ) {
            console.log('NOT FOLLOWING')
            return true

         } else {
            console.log('FOLLOWING');
            return false
         }
    } else {
        return true
    }
};

export default alreadyFollowing;