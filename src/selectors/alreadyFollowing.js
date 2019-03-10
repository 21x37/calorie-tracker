const alreadyFollowing = (currentUserFollowing, id) => {
    if (currentUserFollowing) {

         const following = [];
         currentUserFollowing.forEach(follow => {
            following.push(follow.userId.userId);
         });
         if (following.indexOf(id) === -1 ) {
            return true

         } else {
            return false
         }
    } else {
        return true
    }
};

export default alreadyFollowing;