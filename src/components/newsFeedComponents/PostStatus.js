import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import moment from 'moment'
import { startAddStatus } from '../../actions/postStatus';
import { startUploadImage, startDeleteImage } from '../../actions/postStatus';
import { startAddHashtags } from '../../actions/statusFeatures';

class PostStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            sortBy: 'date',
            likes: 0,
            createdAt: moment(),

            error: ''
        
        };
        this.error = '';
        // CLASS DECLARED VARIABLE FOR USE IN handleFileUpload AND uploadImage
        this.uploadedImage;
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState({ description });
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.uploadedImage) {
            if (this.state.description) {
                // DISPATCH POSTSTATUS TO DB AND REDUX STATE
                this.props.startAddStatus({
                    type: 'post',
                    description: this.state.description,
                    sortBy: this.state.sortBy,
                    likes: this.state.likes,
                    createdAt: this.state.createdAt.valueOf()
                });
                // SEARCHING FOR STRING FOR HASHTAG
                const description = this.state.description
                // ADDING ANY HASHTAGGED WORD TO HASHTAG DB
                if(description.search(/(#[a-z0-9][a-z0-9\-_]*)/ig) > 0) {
                    description.match(/(#[a-z0-9][a-z0-9\-_]*)/ig).forEach((hashtag) => {
                        this.props.startAddHashtags(hashtag);
                    });

                }
                const form = document.getElementById('postStatusForm');
                form.reset();
                this.setState({error: ''})
            } else {
                this.setState({error: 'You need to provide a status or photo to post!'})
            }

        } else if (this.uploadedImage) {
            e.preventDefault();
            const date = moment();
            // UPLOAD IMAGE TO STORAGE, DB, AND REDUX STATE WITH CAPTION
            this.props.startUploadImage({
                type: 'image',
                uploadedImage: this.uploadedImage,
                description: this.state.description,
                sortBy: this.state.sortBy,
                likes: this.state.likes,
                createdAt: this.state.createdAt.valueOf()
            });
            // SEARCHING FOR STRING FOR HASHTAG
            const description = this.state.description
            // ADDING ANY HASHTAGGED WORD TO HASHTAG DB
            if(description.search(/(#[a-z0-9][a-z0-9\-_]*)/ig) > 0) {
                description.match(/(#[a-z0-9][a-z0-9\-_]*)/ig).forEach((hashtag) => {
                    this.props.startAddHashtags(hashtag);
                });
    
            };
            const statusForm = document.getElementById('postStatusForm');
            statusForm.reset();
            this.setState({error: ''})
            this.uploadedImage = null;
        }
    };
    handleFileUploadChange = (e) => {
        this.uploadedImage = e.target.files[0];
        // CHANGE FILEUPLOADED STATE TO TRUE FOR UPLOAD BUTTON
    };
    render() {
        return (
            <div>
                <h2>Post a Status!</h2>
                {this.state.error && <p>{this.state.error}</p>}
                <form id='postStatusForm' onSubmit={this.onSubmit}>
                    <input type='text' onChange={this.onDescriptionChange}/>
                    <button>Post!</button>
                    <input type="file" accept="image/*" onChange={this.handleFileUploadChange}/>
                </form>
            </div>
        )
    };
};


const mapDispatchToProps = (dispatch) => ({
    startAddStatus: (statusObj) => dispatch(startAddStatus(statusObj)),
    startAddHashtags: (hashtag) => dispatch(startAddHashtags(hashtag)),
    startUploadImage: (selectedFile, caption) => dispatch(startUploadImage(selectedFile, caption)),
    startDeleteImage: (id) => dispatch(startDeleteImage(id))
});

export default connect(undefined, mapDispatchToProps)(PostStatus);