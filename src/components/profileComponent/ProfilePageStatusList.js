import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import Comment from '../commentComponent/Comment';
import LikeStatus from '../likeComponent/LikeStatus';
import { startDeleteImage, startDeleteStatus } from '../../actions/postStatus';
import { startRemoveHashtag } from '../../actions/statusFeatures';
import sortByNewest from '../../selectors/sortByNewest';
import showHashtags from '../../selectors/showHashtags';
import { startSetUser } from '../../actions/user';
import { startRemoveComment } from '../../actions/comment';


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
    componentDidUpdate() {
        const id = window.location.href.split('/')[4];
        this.props.startSetUser(id, this.props.user);
    }
    removeComment(statusId) {
        this.props.commentItem.forEach(comment => {
            if (comment.parentId === statusId) {
                this.props.startRemoveComment(comment);
            };
        });
    };
    render() {
        const id = window.location.href.split('/')[4];
        this.props.startSetUser(id, this.props.user);

        if (this.props.user) {
            return (
                <div key={location.href}>
                    {this.props.statusItem.map(status => {
                        if(status.createdBy === this.props.user.id) {
                            if(status.type === 'post') {
                                return (
                                    <div key={status.id}>
                                        <Link to={`/profile/${status.createdBy}`}>
                                            <img src={status.author.picture} style={{width: '60px', height: '60px'}}/>
                                            <h3>{status.author.name}</h3>
                                        </Link>
                                        <h2>{status.description}</h2>
                                        {status.createdBy === this.props.currentUser.id && <button onClick={() => {
                                            this.props.startDeleteStatus(status)
                                            this.removeHashtag(status.description)
                                            this.removeComment(status.id)
                                        }}>Remove</button> }
                                        <LikeStatus dbLocation={'statusItem'} parentId={status.id} likesAmount={status.likes} />
                                        <Comment parentId={status.id}/>
                                    </div>
                                )
                            } else if (status.type === 'image') {
                                return (
                                <div key={status.id}>
                                    <Link to={`/profile/${status.createdBy}`}>
                                        <img src={status.author.picture} style={{width: '60px', height: '60px'}}/>
                                        <h3>{status.author.name}</h3>
                                    </Link>
                                    <h1>{status.description}</h1>
                                    <img src={status.url} style={{width: '17%', height: '17%'}}></img>
                                    <button onClick={() => {
                                        this.props.startDeleteStatus(status)
                                        this.removeHashtag(status.description)
                                        this.removeComment(status.id)
            
                                    }}>Remove</button>
                                    <LikeStatus dbLocation={'uploadedImages'} parentId={status.id} likesAmount={status.likes} />
                                    <Comment parentId={status.id}/>
                                </div>
                                )
                            }  
                        }        
                    })}
                </div>
            )
        }
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteStatus: statusItem => dispatch(startDeleteStatus(statusItem)),
        startRemoveHashtag: id => dispatch(startRemoveHashtag(id)),
        startRemoveComment: comment => dispatch(startRemoveComment(comment)),
        startDeleteImage: (id, name) => dispatch(startDeleteImage(id, name)),
        startSetUser: (id, user) => dispatch(startSetUser(id, user))
    };

};

const mapStateToProps = (state) => ({
    statusItem: sortByNewest(showHashtags(state.statusItem, state.hashtagFilter)),
    commentItem: state.commentItem,
    currentUser: state.currentUser,
    hashtags: state.hashtags,
    queryHashtags: showHashtags(state.statusItem, state.hashtagFilter),
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageStatusList);

