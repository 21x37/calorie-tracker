
const authorRemoveComment = (parentId, currentUserId, authorId) => {
    console.log(authorId, 'AUTHOR REMOVE COMMENT');
    console.log(parentId, currentUserId, authorId);
    if (currentUserId === authorId) {
        return true;
    } else {
        return false
    }
}

export default authorRemoveComment