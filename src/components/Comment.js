import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/comment';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            description: '',
            createdAt: ''
        }
    };
    onChangeDescription(e) {
        const description = e.target.value;
        this.setState(() => {
            description
        });
    };
    onClick() {
        props.addComment(props.parentId, {
            description: this.state.description,
            createdAt: this.state.createdAt
        });
    };
    render() {
        return (
            <div>
                <form>
                    <input type='text' onChange={this.onChangeDescription}></input>
                    <button onClick={this.onClick}>Comment</button>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    addComment: commentObj => dispatch(addComment(commentObj))
})

export default connect(undefined, mapDispatchToProps)(Comment);