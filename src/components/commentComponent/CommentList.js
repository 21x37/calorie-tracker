import React from 'react';
import { connect } from 'react-redux';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentNodeId: this.props.parentId
        };
    };
    render() {
        return (
            <div>
                {this.props.commentItem.filter(comment => comment.parentId === this.state.parentNodeId).map(comment => {
                    return (
                        <div key={comment.id}>
                        {comment.description}<button>Remove Comment</button>
                       </div>
                    );
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    commentItem: state.commentItem
})

export default connect(mapStateToProps)(CommentList);