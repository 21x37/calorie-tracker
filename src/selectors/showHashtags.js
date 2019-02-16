const showHashtags = (statusItems, filters) => {
    if (filters.sortBy === 'newest') {
        return statusItems
    } else {
        const hashtaggedStatusItems = statusItems.filter(statusItem => statusItem.description.search(/(#[a-z0-9][a-z0-9\-_]*)/ig) > 0);
        const test = hashtaggedStatusItems.filter(statusItem => statusItem.description.match(/(#[a-z0-9][a-z0-9\-_]*)/ig)[0] === filters.sortBy)
        return test;
    }
};

export default showHashtags;