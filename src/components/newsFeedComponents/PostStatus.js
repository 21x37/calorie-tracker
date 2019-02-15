import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import moment from 'moment'
import { startAddStatus } from '../../actions/postStatus';
import { startAddHashtags } from '../../actions/statusFeatures';

class PostStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            createdAt: '',
            likes: 0
        
        };
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState({ description });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const date = moment();
        // DISPATCH POSTSTATUS STATE TO REDUX STATE
        this.props.startAddStatus({
            description: this.state.description,
            createdAt: date.format(),
            likes: 0
        });
        // SEARCHING FOR STRING FOR HASHTAG
        const description = this.state.description

        if(description.search(/(#[a-z0-9][a-z0-9\-_]*)/ig) > 0) {
            description.match(/(#[a-z0-9][a-z0-9\-_]*)/ig).forEach((hashtag) => {
                this.props.startAddHashtags(hashtag);
            });

        }



        const form = document.getElementById('postStatusForm');
        form.reset();
    };
    onAccept = (e) => {

    }
    render() {
        return (
            <div>
                <h2>Post a Status!</h2>
                <form id='postStatusForm' onSubmit={this.onSubmit}>
                    <input type='text' onChange={this.onDescriptionChange}/>
                    <button>Post!</button>
                </form>
            </div>
        )
    };
};


const mapDispatchToProps = (dispatch) => ({
    startAddStatus: (statusObj) => dispatch(startAddStatus(statusObj)),
    startAddHashtags: (hashtag) => dispatch(startAddHashtags(hashtag))
});

export default connect(undefined, mapDispatchToProps)(PostStatus);