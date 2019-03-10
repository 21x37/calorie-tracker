import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import ModalImage from 'react-modal-image';
import { startDeleteStatus, startDeleteImage } from '../../actions/postStatus';
import { startRemoveHashtag } from '../../actions/statusFeatures';
import Comment from '../commentComponent/Comment';
import LikeStatus from '../likeComponent/LikeStatus';
import { startRemoveComment } from '../../actions/comment';
import showHashtags from '../../selectors/showHashtags';
import sortByNewest from '../../selectors/sortByNewest';

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
            <div className='dashboard-status'> 
                <div className='dashboard-status-wrapper'>
                    {this.props.statusItem.map(status => {
                        const removeId = uuid();
                        if(status.type === 'post') {
                            return (
                            <div key={status.id} className='dashboard-status-list-wrapper'>
                                <div className='dashboard-status-list-container'>
                                    <div>
                                    {status.createdBy === this.props.currentUser.id && 
                                        <div className='dashboard-remove-status-wrapper'> 
                                            <button id={removeId} hidden={true} onClick={() => {
                                            //console.log(status)
                                            this.props.startDeleteStatus({id: status.id})
                                            this.removeHashtag(status.description)
                                            this.removeComment(status.id)
                                        }}>Delete</button> 
                                            <label className='dashboard-remove-status' htmlFor={removeId} style={{cursor: 'pointer'}}><img className='dashboard-status-remove-image' src="https://img.icons8.com/material/24/000000/delete/303A52"/></label>
                                        </div>
                                        }
                                        <div className='dashboard-status-list-link-wrapper'>
                                            <Link style={{color: '#303A52', textDecoration: 'none'}} to={`/profile/${status.createdBy}`}>
                                                <img className='dashboard-status-list-author' src={status.author.picture} style={{width: '60px', height: '60px'}}/>
                                                <div className='dashboard-status-list-post-details-wrapper'>
                                                    <div className='dashboard-status-list-post-details-container'>
                                                        <h3 className='dashboard-status-list-author-name'>{status.author.name}</h3>
                                                    </div>
                                                </div>
                                            </Link>
                                            <p className='dashboard-status-list-date'>{ '' || moment(status.createdAt).format('MMMM, Do YYYY')}</p>
                                        </div>
                                        <div className='dashboard-status-list-description-wrapper'>
                                            <h1 className='dashboard-status-list-description'>{status.description}</h1>
                                        </div>
                                    </div>
                                    <div className='dashboard-like-comment-wrapper'>
                                    <div className='dashboard-like-wrapper'>
                                        <LikeStatus dbLocation={'statusItem'} parentId={status.id} likesAmount={status.likes}/>
                                    </div>
                                    </div>
                                    
                                </div>

                                <div className='dashboard-like-comment-wrapper'>

                                <div className='dashboard-comment-wrapper'>
                                    <Comment parentId={status.id} author={status.author.id}/>
                                </div>
                                </div>
                            </div>
                            )
                        } else if (status.type === 'image') {
                            const removeId = uuid();
                            return (
                                <div key={status.id} className='dashboard-image-wrapper'>
                                    <div className='dashboard-image-list-wrapper'>
                                        <div className='dashboard-status-image-container'>
                                            <div>
                                                <div className='dashboard-image-remove-wrapper'>
                                                    <div className='dashboard=image-remove-container'>
                                                        {status.createdBy === this.props.currentUser.id && <div><button hidden={true} id={removeId} onClick={() => {
                                                            this.props.startDeleteImage(status.id, status.name)
                                                            this.removeHashtag(status.description)
                                                            this.removeComment(status.id)
                                                        }}>Remove</button> 
                                                        <label className='dashboard-image-remove' style={{cursor: 'pointer'}} htmlFor={removeId}><img className='dashboard-status-remove-image' src="https://img.icons8.com/material/24/000000/delete/303A52" /></label>
                                                        </div>
                                                    }
                                                        
                                                    </div>
                                                </div>
                                                <div className='dashboard-image-author-wrapper'>
                                                    <Link style={{color: '#303A52', textDecoration: 'none'}} to={`/profile/${status.createdBy}`}>
                                                        <img className='dashboard-image-author-picture' src={status.author.picture} style={{width: '60px', height: '60px'}}/>
                                                        <h3 className='dashboard-image-author-name'>{status.author.name}</h3>
                                                    </Link>
                                                    <p className='dashboard-image-date'>{'' || moment(status.createdAt).format('MMMM, Do YYYY')}</p>
                                                </div>
                                                <div className='dashboard-image-description-wrapper'>
                                                    <div className='dashboard-image-description-container'>
                                                        <h1 className='dashboard-status-description'>{status.description}</h1>
                                                    </div>
                                                </div>
                                                <div className='dashboard-image-description-spacer'></div>
                                                <div className='dashboard-status-list-image'>
                                                    <ModalImage className='profile-status-modal-image' small={status.url} large={status.url} hideDownload={true} hideZoom={true} style={{width: '17%', height: '17%'}}/>
                                                </div> 

                                                <div className='dashboard-image-like-wrapper'>
                                                    <LikeStatus dbLocation={'uploadedImages'} parentId={status.id} likesAmount={status.likes} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='dashboard-image-comment-wrapper'>
                                            <div className='dashboard-image-comment-container'></div>
                                            <Comment parentId={status.id}  author={status.author.id}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
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
        statusItem: sortByNewest(showHashtags(state.statusItem, state.hashtagFilter)),
        commentItem: state.commentItem,
        hashtags: state.hashtags,
        queryHashtags: showHashtags(state.statusItem, state.hashtagFilter),
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostStatusList);

