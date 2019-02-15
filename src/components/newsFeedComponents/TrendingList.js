import React from 'react';
import { connect } from 'react-redux';

const TrendingList = (props) => {
    return (
        <div>
            <h3>Trending Hashtags</h3>
            {props.hashtags.map(hashtag => {
                return (
                    <div key={hashtag.id}>{hashtag.hashtag}</div>
                )
            })}
        </div>
    );
};

const mapStateToProps = (state) => ({
    hashtags: state.hashtags
})

export default connect(mapStateToProps)(TrendingList);