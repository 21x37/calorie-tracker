import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import countEachHastag from '../../selectors/trendingHashtags';
import { queryHashtags, resetQuery } from '../../actions/hashtagFilter';

class TrendingList extends React.Component {
    constructor(props) {
        super(props);
    };
    maxHashtags = () => {
        if ( this.props.hashtagCount.length > 10 ) {
            return this.props.hashtagCount.slice(0, 10)
        } else {
            return this.props.hashtagCount
        }
    }
    render() {
        const arr = this.maxHashtags();
        return (
            <div className='trending-list-wrapper'>
                <div className='trending-list-container'>
                    {this.props.hashtagCount[0] && <h3 className='trending-hashtag-title'>Trending Hashtags</h3>}
                    {this.maxHashtags().map(hashtag => {
                        return (
                            <div className='individual-hashtag-container' key={uuid()}>
                                <Link to='/' ref='hashtagElement' id={hashtag.hashtag}>
                                    <p className='trending-hashtag' style={{cursor: 'pointer'}} onClick={() => {
                                        this.props.queryHashtags(hashtag.hashtag);
                                    }}>{hashtag.hashtag}</p>
                                </Link>
                                <br/><p className='trending-hashtag-count'>{hashtag.count} {hashtag.count > 1? 'posts' : 'post'}</p>
                            </div>
                        )
                    })}
                    {this.props.hashtagFilter.sortBy !== 'newest' && 
                    <div>
                        <button className='trending-list-reset-button' onClick={() => {this.props.resetQuery()}}>Reset Search</button>
                    </div>}
                </div>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    queryHashtags: query => dispatch(queryHashtags(query)),
    resetQuery: () => dispatch(resetQuery())
})

const mapStateToProps = (state) => ({
    hashtags: state.hashtags,
    hashtagCount: countEachHastag(state.hashtags),
    hashtagFilter: state.hashtagFilter
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingList);