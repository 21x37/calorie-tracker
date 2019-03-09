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
            likes: 0,
            error: ''
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
        if (this.state.description) {
            this.props.startAddComment({
                parentId: this.props.parentId,
                createdBy: this.props.currentUser.id,
                author: this.props.currentUser,
                description: this.state.description,
                likes: this.state.likes
            });
            this.setState({error: '', description: ''})
            const form = document.getElementById(`comment-form-${this.props.parentId}`);
            form.reset();
        } else {
            this.setState({ error: 'Please provide a comment to post!'})
        }

    }
    onSubmit(e) {
        e.preventDefault();
    }
    render() {
        if (window.location.href.split('/')[3] === 'profile') {
            return (
                <div>
                    <CommentList parentId={this.props.parentId} authorId={this.props.author} statusId={this.props.statusId} />
                    <p></p>
                    <div className='profile-comment-form'>
                        <div className='profile-comment-form'>
                            <form className='aa' onSubmit={this.onSubmit} id={`comment-form-${this.props.parentId}`}>
                                <input className='comment-input-text' type='text' placeholder={this.state.error} onChange={this.onDescriptionChange}/>
                                <button className='comment-button' onClick={this.onClick}>Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else if (window.location.href.split('/')[3] === '') {
            return (
                <div className='comment-wrapper'>
                    <CommentList parentId={this.props.parentId} authorId={this.props.author} statusId={this.props.statusId} />
                    <p></p>
                    <div className='dashboard-comment-form-container'>
                        <div className='comment-form__flex'>
                            <form onSubmit={this.onSubmit} id={`comment-form-${this.props.parentId}`}>
                                <input className='comment-input-text' type='text' placeholder={this.state.error} onChange={this.onDescriptionChange}/>
                                <button className='comment-button' onClick={this.onClick}>Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
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