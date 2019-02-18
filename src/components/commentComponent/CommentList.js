import React from 'react';
import { connect } from 'react-redux';
import { startRemoveComment } from '../../actions/comment';
import LikeStatus from '../likeComponent/LikeStatus';
import { Link } from 'react-router-dom';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentNodeId: this.props.parentId,
        };
    };
    render() {
        return (
            <div>
                {this.props.commentItem.filter(comment => comment.parentId === this.state.parentNodeId).map(comment => {
                    return (
                        <div key={comment.id}>
                            <Link to={`/profiles/${comment.createdBy}`}>
                                <img src={comment.author.picture} style={{width: '30px', height: '30px'}} />
                                <h5>{comment.author.name}</h5>
                            </Link>
                            <h3>{comment.description}</h3>
                            <LikeStatus  dbLocation={'comments'} parentId={comment.id} likes={comment.likes}/>
                            {comment.createdBy === this.props.currentUser.id && <button onClick={() => {
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

const mapStateToProps = (state) => ({
    commentItem: state.commentItem,
    currentUser: state.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);