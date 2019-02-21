const alreadyLiked = (currentUser, id) => {
    let boolean = false;
    currentUser.likes.forEach(like => {
        if (like.parentId === id) {
            boolean = true;
        };
    });
    return boolean;
};

export default alreadyLiked;