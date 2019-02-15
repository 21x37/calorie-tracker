import React from 'react';
import { connect } from 'react-redux';
import { startDeleteStatus } from '../../actions/postStatus';
import { startRemoveHashtag } from '../../actions/statusFeatures';
import Comment from '../commentComponent/Comment';
import LikeStatus from '../likeComponent/LikeStatus';
import database from '../../firebase/firebase';
import { startRemoveComment } from '../../actions/comment';

class PostStatusList extends React.Component {
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
            }
        }
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

                    return (
                        <div key={status.id}>
                            <h1>{status.description} : {status.createdAt}</h1>
                            <button onClick={() => {
                                //console.log(status)
                                this.props.startDeleteStatus({id: status.id})
                                this.removeHashtag(status.description)
                                this.removeComment(status.id)
                            }}>Delete</button>
                            <LikeStatus dbLocation={'statusItem'} parentId={status.id} likes={status.likes} />
                            <Comment parentId={status.id}/>
                        </div>
                    )
                })}
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteStatus: statusItem => dispatch(startDeleteStatus(statusItem)),
        startRemoveHashtag: id => dispatch(startRemoveHashtag(id)),
        startRemoveComment: comment => dispatch(startRemoveComment(comment))
    };

};

const mapStateToProps = (state) => {
    return {
        statusItem: state.statusItem,
        commentItem: state.commentItem,
        hashtags: state.hashtags
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostStatusList);

