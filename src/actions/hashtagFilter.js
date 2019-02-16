export const queryHashtags = (query) => ({
    type: 'HASHTAG_QUERY',
    query
});

export const resetQuery = () => ({
    type: 'RESET_QUERY'
})