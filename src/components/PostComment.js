import React from 'react';
import { connect } from 'react-redux';

const CommentList = (props) => {
    return (
        <div>
            {props.commentItem.map(comment => {
                return (
                    <div>
                        <h4>{comment.description}</h4>
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => ({
    commentItem: state.commentItem
})

export default connect(mapStateToProps)(CommentList);