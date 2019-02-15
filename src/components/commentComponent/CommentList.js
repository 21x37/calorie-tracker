import React from 'react';
import { connect } from 'react-redux';
import { startRemoveComment } from '../../actions/comment';
import LikeStatus from '../likeComponent/LikeStatus';

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
                        {comment.description}
                        <LikeStatus  dbLocation={'comments'} parentId={comment.id} likes={comment.likes}/>
                        <button onClick={() => {
                            this.props.startRemoveComment(comment)
                        }}>Remove Comment</button>
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
    commentItem: state.commentItem
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);