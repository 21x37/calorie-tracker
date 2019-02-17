import React from 'react';
import { connect } from 'react-redux';
import Comment from '../commentComponent/Comment';
import LikeStatus from '../likeComponent/LikeStatus';
import { startDeleteImage } from '../../actions/postStatus';
import { startRemoveHashtag } from '../../actions/statusFeatures';
import sortByNewest from '../../selectors/sortByNewest';
import showHashtags from '../../selectors/showHashtags';


class ProfilePageStatusList extends React.Component {
    constructor(props) {
        super(props);
    };
    removeHashtag(description) {
        const hashtag = this.props.hashtags
        for (let i = 0; i < hashtag.length; i++) {
            try {
                const hashtagWord = description.match(/(#[a-z0-9][a-z0-9\-_]*)/ig)[0];
                if (hashtag[i].hashtag === hashtagWord) {
                    this.props.startRemoveHashtag(hashtag[i]);
                    break
                }
            } catch (e) {
                break
            };
        };
    };
    removeComment(statusId) {
        this.props.commentItem.forEach(comment => {
            if (comment.parentId === statusId) {
                this.props.startRemoveComment(comment);
            };
        });
    };
    render() {
        return (
            <div>
                {this.props.statusItem.map(status => {
                    if(status.type === 'post') {
                        return (
                            <div key={status.id}>
                                <h2>{status.description}</h2>
                                <LikeStatus dbLocation={'statusItem'} parentId={status.id} likes={status.likes} />
                                <Comment parentId={status.id}/>
                            </div>
                        )
                    } else if (status.type === 'image') {
                        return (
                        <div key={status.id}>
                            <h1>{status.description}</h1>
                            <img src={status.url} style={{width: '17%', height: '17%'}}></img>
                            <button onClick={() => {
                                this.props.startDeleteImage(status.id, status.name)
                                this.props.startDeleteImage(status.id, status.name)
                                this.removeHashtag(status.description)
                                this.removeComment(status.id)
    
                            }}>Remove</button>
                            <LikeStatus dbLocation={'uploadedImages'} parentId={status.id} likes={status.likes} />
                            <Comment parentId={status.id}/>
                        </div>
                        )
                    }
    
                })}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteStatus: statusItem => dispatch(startDeleteStatus(statusItem)),
        startRemoveHashtag: id => dispatch(startRemoveHashtag(id)),
        startRemoveComment: comment => dispatch(startRemoveComment(comment)),
        startDeleteImage: (id, name) => dispatch(startDeleteImage(id, name))
    };

};

const mapStateToProps = (state) => ({
    statusItem: sortByNewest(showHashtags(state.statusItem, state.hashtagFilter))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageStatusList);

