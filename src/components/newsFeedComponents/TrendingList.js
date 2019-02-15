import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import countEachHastag from '../../selectors/trendingHashtags';

const TrendingList = (props) => {
    return (
        <div>
            <h3>Trending Hashtags</h3>
            {props.hashtagCount.map(hashtag => {
                console.log('HASHTAG ID', hashtag.id)
                return (
                    <div key={uuid()}>{hashtag.hashtag} posted {hashtag.count}</div>
                )
            })}
        </div>
    );
};

const mapStateToProps = (state) => ({
    hashtags: state.hashtags,
    hashtagCount: countEachHastag(state.hashtags)
});

export default connect(mapStateToProps)(TrendingList);