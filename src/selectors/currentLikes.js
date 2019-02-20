

const currentLikes = (statusItem, parentId) => {
    for (let i = 0; i < statusItem.length ; i++) {
        if (statusItem[i].id === parentId) {
            return statusItem[i].likes
        }
    }
};


export default currentLikes
