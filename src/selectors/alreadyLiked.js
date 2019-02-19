const alreadyLiked = (currentUser, id) => {
    let boolean = false;
    currentUser.likes.forEach(like => {
        if (like.parentId === id) {
            console.log(3);
            boolean = true;
        };
    });
    return boolean;
};

export default alreadyLiked;