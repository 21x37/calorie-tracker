import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import CommentList from './CommentList';
import { addComment } from '../../actions/comment';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        }
        this.onDescriptionChange =  this.onDescriptionChange.bind(this);
        this.onClick = this.onClick.bind(this);
    };
    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState({ description })
    }
    onClick() {
        this.props.addComment({
            id: uuid(),
            parentId: this.props.parentId,
            ...this.state
        });
    }
    onSubmit(e) {
        e.preventDefault();
    }
    render() {
        console.log(this.props.parentId)
        return (
            <div>
                <CommentList parentId={this.props.parentId} />
                <form onSubmit={this.onSubmit}>
                    <input type='text' onChange={this.onDescriptionChange}/>
                    <button onClick={this.onClick}>Comment!</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: comment => dispatch(addComment(comment))
    }
}

export default connect(undefined, mapDispatchToProps)(Comment);