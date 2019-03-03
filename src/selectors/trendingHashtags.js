
// COUNTING THE PURE HASHTAG ARRAY AND RETURNING AN OBJECT WITH COUNT AND NO DUPLICATED 
const count = (array_elements) => {
    array_elements.sort();
    const hashtags = [];
    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                hashtags.push({count: cnt, hashtag: current})
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        hashtags.push({count: cnt, hashtag: current})
    }
    const sortedHashtags = hashtags.sort((a, b) => b.count - a.count);
    return sortedHashtags

}
// PARSING HASHTAG OBJECTS IN ARRAY TO BE PURE HASHTAG ARRAY 
const countEachHastag = (obj) => {
    const hashtags = [];
    obj.forEach(hashtag => {
        hashtags.push(hashtag.hashtag);
    })
    return count(hashtags)
}

export default countEachHastag;
