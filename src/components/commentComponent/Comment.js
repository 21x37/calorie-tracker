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
            createdBy: this.props.currentUser.id,
            author: this.props.currentUser,
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
                <CommentList parentId={this.props.parentId} authorId={this.props.author} statusId={this.props.statusId} />
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

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment);