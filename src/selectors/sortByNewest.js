
const sortByNewest = (statusItems) => {
    return statusItems.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1
    });
};

export default sortByNewest;