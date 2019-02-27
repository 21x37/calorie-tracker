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
        return (
            <div className='comment-list-container'>
                {this.props.commentItem.filter(comment => comment.parentId === this.state.parentNodeId).map(comment => {
                    return (
                        <div className='status-comment-container' key={comment.id}>
                            <Link to={`/profile/${comment.createdBy}`}>
                                <div className='comment-author-container'>
                                    <img className='comment-author-picture' src={comment.author.picture} style={{width: '30px', height: '30px'}} />
                                    <h5 className='comment-author-name'>{comment.author.name}</h5>
                                </div>
                            </Link>
                            <h3 className='comment-profile-description'>{comment.description}</h3>
                            <div className='comment-profile-like'>
                                <LikeStatus  dbLocation={'comments'} parentId={comment.id} likesAmount={comment.likes} type={'comment'}/>
                                <div className='comment-profile-remove__wrapper'>
                                    <div className='comment-profile-remove'>
                                        {comment.createdBy === this.props.currentUser.id &&<ion-icon style={{cursor: 'pointer'}}  name='trash' onClick={() => {
                                            this.props.startRemoveComment(comment)
                                        }}></ion-icon> }
                                    </div>
                                </div>
                                <div className='comment-profile-remove__wrapper'>
                                    <div className='comment-profile-remove'>
                                        {comment.createdBy !== this.props.currentUser.id && this.props.authorRemoveComment && <ion-icon name='trash' style={{cursor: 'pointer'}} onClick={() => {
                                            console.log
                                            this.props.startRemoveComment(comment)
                                        }}></ion-icon> }
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        );
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