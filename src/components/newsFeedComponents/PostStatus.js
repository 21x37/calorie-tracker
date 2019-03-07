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

            uploadedImageName: '',
            error: ''
        
        };
        this.error = '';
        // THIS VARIABLE STORES THE UPLOADED IMAGE
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
                    createdAt: this.state.createdAt.valueOf(),
                    createdBy: this.props.currentUser.id,
                    author: this.props.currentUser
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
                this.setState({error: '', description: ''})
                
            } else {
                this.setState({error: 'You Need to Provide a Status or Photo to Post!'})
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
                createdAt: this.state.createdAt.valueOf(),
                createdBy: this.props.currentUser.id,
                author: this.props.currentUser
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
            this.setState({error: '', description: ''})
            this.setState({uploadedImageName: ''})
            this.uploadedImage = null;
        }
    };
    handleFileUploadChange = (e) => {
        this.uploadedImage = e.target.files[0];
        this.setState({ uploadedImageName: e.target.files[0].name})
        // CHANGE FILEUPLOADED STATE TO TRUE FOR UPLOAD BUTTON
    };
    render() {

        console.log(window.location.href.split('/')[3])
        if (window.location.href.split('/')[3] === 'profile') {
            const id = uuid();
            return (
                <div>
                    <div className='status-container'>
                        <div className='status-title-wrapper'>
                            <h2 className='post-status-title'>Post a Status!</h2>
                         </div>
                        <div className='status-position'>
                            {this.state.error && <p>{this.state.error}</p>}
                            <p className='profile-upload-image-name'>{this.state.uploadedImageName}</p>
                            <form id='postStatusForm' onSubmit={this.onSubmit}>
                                <div className='profile-form-wrapper'>
                                    <input className='status-text-input-profile' type='text' onChange={this.onDescriptionChange}/>
                                    <button className='button post-button'>Post!</button>
                                    <input id={id} type="file" accept="image/*" style={{display: 'none'}} onChange={this.handleFileUploadChange}/>
                                    <label className='profile-upload-photo-icon' htmlFor={id}><ion-icon name="image"></ion-icon></label>
                                </div>
                            </form>
                        </div>
                        <div className='under-status-bar-wrapper'>
                            <div className='under-status-post-bar'>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (window.location.href.split('/')[3] === '') {
            const id = uuid();
            return (
                <div>
                <div>
                    <h2 className='dashboard-post-status-title'>Post a Status!</h2>
                        {this.state.error && <p>{this.state.error}</p>}
                        <p>{this.state.uploadedImageName}</p>
                        <form id='postStatusForm' onSubmit={this.onSubmit}>
                                <input className='dashboard-status-input' type='text' onChange={this.onDescriptionChange}/>
                                <button className='dashboard-status-post-button'>Post!</button>
                                <input id={id} type="file" accept="image/*" style={{display: 'none'}} onChange={this.handleFileUploadChange}/>
                                <label className='dashboard-upload-icon' htmlFor={id}><ion-icon name="image"></ion-icon></label>
                        </form>
                </div>
                <div className='under-dashboard-status-bar'></div>
            </div>
            )

        }
    };
};


const mapDispatchToProps = (dispatch) => ({
    startAddStatus: (statusObj) => dispatch(startAddStatus(statusObj)),
    startAddHashtags: (hashtag) => dispatch(startAddHashtags(hashtag)),
    startUploadImage: (selectedFile, caption) => dispatch(startUploadImage(selectedFile, caption)),
    startDeleteImage: (id) => dispatch(startDeleteImage(id))
});

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(PostStatus);