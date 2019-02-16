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
            sortBy: 'newest',
            description: '',
            createdAt: '',
            likes: 0
        
        };
        this.uploadedImage;
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
            sortBy: 'newest',
            description: this.state.description,
            createdAt: date.format(),
            likes: 0
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
    };
    handleFileUploadChange = (e) => {
        this.uploadedImage = e.target.files[0];

    };
    uploadImage = (e) => {
        e.preventDefault();
        console.log(this.uploadedImage);
        const date = moment();
        const image = {
            sortBy: 'date',
            caption: this.state.description,
            createdAt: date.format(),
            likes: 0
        }
        this.props.startUploadImage(this.uploadedImage, this.state.description);


        const form = document.getElementById('uploadImageForm');
        form.reset(); 
    };
    testDelete = () => {
        console.log(this.uploadedImage);
        this.props.startDeleteImage(this.uploadedImage.name);
        console.log('deleted');
    };
    render() {
        return (
            <div>
                <h2>Post a Status!</h2>
                <form id='postStatusForm' onSubmit={this.onSubmit}>
                    <input type='text' onChange={this.onDescriptionChange}/>
                    <button>Post!</button>
                </form>
                <div id="filesubmit">
                    <form onSubmit={this.uploadImage} id='uploadImageForm'>
                        <input type="file" accept="image/*" onChange={this.handleFileUploadChange}/>
                        <button>Upload Image</button>
                    </form>
                </div>
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