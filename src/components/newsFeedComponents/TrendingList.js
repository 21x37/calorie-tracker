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
    render() {
        return (
            <div>
                <h3>Trending Hashtags</h3>
                {this.props.hashtagCount.map(hashtag => {
                    console.log('HASHTAG ID', hashtag.id)
                    return (
                        <div key={uuid()}>
                            <Link to='/' ref='hashtagElement' id={hashtag.hashtag}>
                                <button onClick={() => {
                                    this.props.queryHashtags(hashtag.hashtag);
                                }}>{hashtag.hashtag}</button>
                            </Link>
                            <br/> {hashtag.count} {hashtag.count > 1? 'posts' : 'post'}
                        </div>
                    )
                })}
                {this.props.hashtagFilter.sortBy !== 'newest' && 
                <div>
                    <button onClick={() => {this.props.resetQuery()}}>Reset Search</button>
                </div>}
            </div>
        );
    };
};

// const TrendingList = (props) => {
//     return (
//         <div>
//             <h3>Trending Hashtags</h3>
//             {props.hashtagCount.map(hashtag => {
//                 console.log('HASHTAG ID', hashtag.id)
//                 return (
//                     <div key={uuid()}>
//                         <Link to='/'>{hashtag.hashtag}</Link>
//                         <br/> {hashtag.count} {hashtag.count > 1? 'posts' : 'post'}
//                     </div>
//                 )
//             })}
//         </div>
//     );
// };

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