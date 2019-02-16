import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import countEachHastag from '../../selectors/trendingHashtags';
import { queryHashtags } from '../../actions/hashtagFilter';

class TrendingList extends React.Component {
    constructor(props) {
        super(props);
    };
    onClick() {
        console.log('clicked');
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
    queryHashtags: query => dispatch(queryHashtags(query))
})

const mapStateToProps = (state) => ({
    hashtags: state.hashtags,
    hashtagCount: countEachHastag(state.hashtags)
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingList);