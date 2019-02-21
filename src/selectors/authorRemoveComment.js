
const authorRemoveComment = (parentId, currentUserId, authorId) => {
    if (currentUserId === authorId) {
        return true;
    } else {
        return false
    }
}

export default authorRemoveComment