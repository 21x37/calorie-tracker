import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import CommentList from './CommentList';
import { startAddComment } from '../../actions/comment';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            likes: 0
        }
        this.form;
        this.onDescriptionChange =  this.onDescriptionChange.bind(this);
        this.onClick = this.onClick.bind(this);
    };
    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState({ description })
    }
    onClick() {
        this.props.startAddComment({
            parentId: this.props.parentId,
            ...this.state
        });
        const form = document.getElementById(`comment-form-${this.props.parentId}`);
        form.reset();
    }
    onSubmit(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div>
                <CommentList parentId={this.props.parentId} />
                <form onSubmit={this.onSubmit} id={`comment-form-${this.props.parentId}`}>
                    <input type='text' onChange={this.onDescriptionChange}/>
                    <button onClick={this.onClick}>Comment!</button>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddComment: comment => dispatch(startAddComment(comment))
    };
};

export default connect(undefined, mapDispatchToProps)(Comment);