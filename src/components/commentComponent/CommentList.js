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
        console.log(this.props.authorRemoveComment)
        return (
            <div>
                {this.props.commentItem.filter(comment => comment.parentId === this.state.parentNodeId).map(comment => {
                    return (
                        <div key={comment.id}>
                            <Link to={`/profile/${comment.createdBy}`}>
                                <img src={comment.author.picture} style={{width: '30px', height: '30px'}} />
                                <h5>{comment.author.name}</h5>
                            </Link>
                            <h3>{comment.description}</h3>
                            <LikeStatus  dbLocation={'comments'} parentId={comment.id} likesAmount={comment.likes} type={'comment'}/>
                            {comment.createdBy === this.props.currentUser.id && <button onClick={() => {
                                this.props.startRemoveComment(comment)
                            }}>Remove Comment</button> }
                            {comment.createdBy !== this.props.currentUser.id && this.props.authorRemoveComment && <button onClick={() => {
                                this.props.startRemoveComment(comment)
                            }}>Remove Comment</button> }
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