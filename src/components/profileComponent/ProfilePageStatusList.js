import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ModalImage from 'react-modal-image';
import { startDeleteStatus, startDeleteImage } from '../../actions/postStatus';
import { startRemoveHashtag } from '../../actions/statusFeatures';
import Comment from '../commentComponent/Comment';
import LikeStatus from '../likeComponent/LikeStatus';
import { startRemoveComment } from '../../actions/comment';
import showHashtags from '../../selectors/showHashtags';
import sortByNewest from '../../selectors/sortByNewest';
import { userInfo } from 'os';

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
            <div className='status-list-container'> 
                {this.props.statusItem.map(status => {
                    if (status.createdBy === this.props.user.id) {
                        if(status.type === 'post') {
                            return (
                                <div className='profile-page-status-list-container'>
                                    <div key={status.id}>
                                        <div className='text-status-container'>
                                            <div className='text-status-author__flex'>
                                                <Link to={`/profile/${status.createdBy}`}>
                                                    <img className='text-status-author-image' src={status.author.picture} style={{width: '60px', height: '60px'}}/>
                                                    <h3 className='text-status-author-name'>{status.author.name}</h3>
                                                </Link>
                                            </div>
                                            <div className='text-status-remove__wrapper'>
                                                {status.createdBy === this.props.currentUser.id && <div className='text-status-remove'><ion-icon name="trash" style={{cursor: 'pointer'}} onClick={() => {
                                                    //console.log(status)
                                                    this.props.startDeleteStatus({id: status.id})
                                                    this.removeHashtag(status.description)
                                                    this.removeComment(status.id)
                                                }}>Delete</ion-icon></div>  }
                                            </div>
                                            <p className='status-text-date'>{moment(status.createdAt).format('MMMM, Do YYYY')}</p>
                                            <h1 className='status-text-description'>{status.description}</h1>
  
                                        </div>
                                        <div className='status-text-like-comment'>
                                            <div className='status-like-container'>
                                                <LikeStatus dbLocation={'statusItem'} parentId={status.id} likesAmount={status.likes}/>
                                            </div>
                                            <Comment parentId={status.id} author={status.author.id} />
                                        </div>
                                    </div>

                                </div>
                            )
                        } else if (status.type === 'image') {
                            return (
                                <div key={status.id}>
                                    <Link to={`/profile/${status.createdBy}`}>
                                        <img src={status.author.picture} style={{width: '60px', height: '60px'}}/>
                                        <h3>{status.author.name}</h3>
                                    </Link>
                                    <h1>{status.description} : {moment(status.createdAt).format('MMMM, Do YYYY')}</h1>
                                    <ModalImage className='profile-modal-photo' small={status.url} large={status.url} hideDownload={true} hideZoom={true} style={{width: '17%', height: '17%'}}/>
                                    {status.createdBy === this.props.currentUser.id && <button onClick={() => {
                                        this.props.startDeleteImage(status.id, status.name)
                                        this.removeHashtag(status.description)
                                        this.removeComment(status.id)
                                    }}>Remove</button> }
                                    <LikeStatus dbLocation={'uploadedImages'} parentId={status.id} likesAmount={status.likes} />
                                    <Comment parentId={status.id}  author={status.author.id}/>
                                </div>
                            )
                        }
                    }

                })}
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteStatus: statusItem => dispatch(startDeleteStatus(statusItem)),
        startRemoveHashtag: id => dispatch(startRemoveHashtag(id)),
        startRemoveComment: comment => dispatch(startRemoveComment(comment)),
        startDeleteImage: (id, name) => dispatch(startDeleteImage(id, name))
    };

};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        statusItem: sortByNewest(showHashtags(state.statusItem, state.hashtagFilter)),
        commentItem: state.commentItem,
        hashtags: state.hashtags,
        queryHashtags: showHashtags(state.statusItem, state.hashtagFilter),
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostStatusList);
