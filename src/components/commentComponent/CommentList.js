import React from 'react';
import { connect } from 'react-redux';
import { startRemoveComment } from '../../actions/comment';
import LikeStatus from '../likeComponent/LikeStatus';
import { Link } from 'react-router-dom';
import authorRemoveComment from '../../selectors/authorRemoveComment';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentNodeId: this.props.parentId,
        };
    };
    render() {
        if (window.location.href.split('/')[3] === 'profile') {
            return (
                <div className='profile-status-comment-wrapper'>
                    <div>
                    {this.props.commentItem.filter(comment => comment.parentId === this.props.parentId).map(comment => {
                        return (
                            <div className='profile-status-comment-container' key={comment.id}>
                            <div className='profile-comment-remove-wrapper'>
                                <div className='profile-comment-remove-button'>
                                    {comment.createdBy === this.props.currentUser.id &&<img className='profile-comment-remove-image' src="https://img.icons8.com/material/24/000000/delete/303A52" name='trash' style={{cursor: 'pointer'}} onClick={() => {
                                        console.log
                                        this.props.startRemoveComment(comment)
                                    }}></img> }
                            </div>
                        </div>
                        <div className='profile-comment-remove-wrapper'>
                            <div className='profile-comment-remove-button'>
                                {comment.createdBy !== this.props.currentUser.id && this.props.authorRemoveComment &&
                                    <img className='profile-comment-remove-image' src="https://img.icons8.com/material/24/000000/delete/303A52" name='trash' style={{cursor: 'pointer'}} onClick={() => {
                                    console.log
                                    this.props.startRemoveComment(comment)
                                }}></img> }
                            </div>
                        </div>
                                <Link style={{color: '#303A52', textDecoration: 'none'}} to={`/profile/${comment.createdBy}`}>
                                    <div className='status-profile-comment'>
                                        <img className='status-comment-author-picture' src={comment.author.picture} style={{width: '34px', height: '34px'}} />
                                        <h5 className='status-profile-comment-name'>{comment.author.name}</h5>
                                    </div>
                                </Link>
                                <div>
                                    <h3 className='profile-status-comment-description'>{comment.description}</h3>
                                </div>
                                <div>
                                    <div className='profile-comment-like-wrapper'>
                                        <LikeStatus  dbLocation={'comments'} parentId={comment.id} likesAmount={comment.likes} type={'comment'}/>
                                    </div>

                                </div>
    
                            </div>
                        );
                    })}
                    </div>
                </div>
            );
        } else if (window.location.href.split('/')[3] === '') {
            return (
                <div className='dashboard-comment-list-wrapper'>
                    <div className='dashboard-comment-list-container'>
                    {this.props.commentItem.filter(comment => comment.parentId === this.props.parentId).map(comment => {
                        return (
                            <div className='dashboard-comment-container' key={comment.id}>
                            <div className='dashboard-comment-remove-wrapper'>
                            <div className='dashboard-comment-remove-container'>
                                {comment.createdBy === this.props.currentUser.id &&<img className='profile-comment-remove-image' src="https://img.icons8.com/material/24/000000/delete/303A52" style={{cursor: 'pointer'}} onClick={() => {
                                    this.props.startRemoveComment(comment)
                                }}></img> }
                            </div>
                        </div>
                        <div className='dashboard-comment-remove-wrapper'>
                            <div className='dashboard-comment-remove-container'>
                                {comment.createdBy !== this.props.currentUser.id && this.props.authorRemoveComment && <img className='profile-comment-remove-image' src="https://img.icons8.com/material/24/000000/delete/303A52" style={{cursor: 'pointer'}} onClick={() => {
                                    console.log
                                    this.props.startRemoveComment(comment)
                                }}></img> }
                            </div>
                        </div>
                                <Link style={{color: '#303A52', textDecoration: 'none'}} to={`/profile/${comment.createdBy}`}>
                                    <div className='dashboard-comment-author-container'>
                                        <img className='dashboard-comment-author-picture' src={comment.author.picture} style={{width: '34px', height: '34px'}} />
                                        <h5 className='dashboard-comment-author-name'>{comment.author.name}</h5>
                                    </div>
                                </Link>
                                <div className='dashboard-comment-description-wrapper'>
                                    <h3 className='dashboard-comment-description'>{comment.description}</h3>
                                </div>
                                <div>
                                    <div className='dashboard-comment-likes-container'>
                                        <LikeStatus  dbLocation={'comments'} parentId={comment.id} likesAmount={comment.likes} type={'comment'}/>
                                    </div>

                                </div>
    
                            </div>
                        );
                    })}
                    </div>
                </div>
            );
        }
    };
};

const mapDispatchToProps = (dispatch) => ({
    startRemoveComment: comment => dispatch(startRemoveComment(comment))
});

const mapStateToProps = (state, ownProps) => ({
    commentItem: state.commentItem,
    currentUser: state.currentUser,
    authorRemoveComment: authorRemoveComment(ownProps.parentId, state.currentUser.id, ownProps.authorId)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);

// <div className='comment-profile-remove__wrapper'>
// <div className='comment-profile-remove'>
// {comment.createdBy !== this.props.currentUser.id && this.props.authorRemoveComment && <ion-icon name='trash' onClick={() => {
//     this.props.startRemoveComment(comment)
// }}></ion-icon> }
// </div>
// </div>