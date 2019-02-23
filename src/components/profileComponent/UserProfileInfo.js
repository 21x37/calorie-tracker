import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startSetUser, startSetBio, resetUser } from '../../actions/user';
import PostStatus from '../newsFeedComponents/PostStatus';
import { startSetCoverPhoto, startUploadProfilePicture } from '../../actions/coverPhoto';
import { startFollow, startUnfollow } from '../../actions/follow';
import alreadyFollowing from '../../selectors/alreadyFollowing';


class UserProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: this.props.currentUser.bio || '',
            uploadedCoverPhoto: null,
            uploadedProfilePicture: null,
            editBioVisibility: true,
            isMouseInside: true,
            alreadyFollowing: alreadyFollowing(this.props.currentUser.following, this.props.user.id),
            disabled: false
        }
        this.followers = [];
        this.following = [];
    };
    componentDidUpdate() {
        this.followers = [];
        this.following = [];
    };
    onClick = (e) => {
        e.preventDefault();
        this.setState({ editBioVisibility: false })
    };
    onChange = (e) => {
        const bio = e.target.value;
        this.setState({ bio })
    };
    onSubmitBio = (e) => {
        e.preventDefault();
        this.props.startSetBio(window.location.href.split('/')[4], this.state.bio);
        this.setState({ editBioVisibility: true }) 
    };
    onFileUpload = (e) => {
        this.setState({ uploadedCoverPhoto: e.target.files[0] })
    };
    onSubmitCoverPhoto = (e) => {
        e.preventDefault();
        if (this.state.uploadedCoverPhoto) {
            this.props.startSetCoverPhoto(this.state.uploadedCoverPhoto, this.props.currentUser.id).then(() => {
                const form = document.getElementById('coverPhotoForm');
                form.reset();
            });
        }
    };
    onMouseEnterCoverPhoto = () => {
        if (this.props.currentUser.id === this.props.user.id) {
            this.setState({ isMouseInside: false })
        }
    };
    onMouseLeaveCoverPhoto = () => {
        this.setState({ isMouseInside: true })
    };
    onFollow = () => {

        let followId;
        this.props.user.followers.forEach((follow) => {
            if (follow.userId.id === this.props.currentUser.id) {
                followId = follow.id;
            }
        })
        if (this.props.alreadyFollowing) {
            this.setState({ disabled: true });
            this.props.startFollow(this.props.currentUser.id, this.props.user.id).then(() => {
                this.setState({ alreadyFollowing: alreadyFollowing(this.props.currentUser.following, this.props.user.id)}, this.setState({ disabled: false }));
                
            });
            
        } else {
            this.setState({ disabled: true })
            this.props.currentUser.following.forEach((follow) => {
                if (follow.userId.userId === this.props.user.id) {
                    this.props.startUnfollow(this.props.currentUser.id, follow.followingId, followId, this.props.user.id).then(() => {
                        this.setState({ alreadyFollowing: alreadyFollowing(this.props.currentUser.following, this.props.user.id)}, this.setState({ disabled: false }));
                        
                    });
                    
                };
            });
        };
    };
    onUploadProfilePicture = (e) => {
        this.setState({ uploadedProfilePicture: e.target.files[0] }, () => {
            this.props.startUploadProfilePicture(this.state.uploadedProfilePicture, this.props.currentUser.id).then(() => {
                const form = document.getElementById('profilePictureForm');
                form.reset();
            });
        }) 
    };
    onSubmitProfilePicture = (e) => {
        // e.preventDefault();
        // if (this.state.uploadedProfilePicture) {
        //     this.props.startUploadProfilePicture(this.state.uploadedProfilePicture, this.props.currentUser.id).then(() => {

        //     });
        // };
    }
    render() {
        const id = window.location.href.split('/')[4];
        this.props.startSetUser(id, this.props.user);
        if (this.props.user) {
            // SETTING UP THE USERS FOLLOWERS AND FOLLOWING
            const following = [];
            if (this.props.user.followers) {
                this.followers = Object.keys(this.props.user.followers).map((key) => ({id: key, userId: this.props.user.followers[key]}));
                
            }
            if (this.props.user.following) {
                this.following = Object.keys(this.props.user.following).map((key) => ({id: key, userId: this.props.user.following[key]}))
            }

            return (
                <div>

                        {/* COVER PHOTO */}
                    <div className={`${this.props.currentUser.id === id ? 'profile-cover-photo__container': '' }`} onMouseEnter={this.onMouseEnterCoverPhoto} onMouseLeave={this.onMouseLeaveCoverPhoto}>
                        <img className='profile-cover-photo' src={this.props.user.coverPhoto || 'https://firebasestorage.googleapis.com/v0/b/trainingpals-d320c.appspot.com/o/images%2Fcoverphotodefault.jpg?alt=media&token=de484d31-95f8-4c81-8946-e959ff58ad6d'} />
                    </div>
                        
                    <div className='profile-cover-photo-button'>
                        <p hidden={this.state.isMouseInside}>Upload a Cover Photo!</p>
                        <form onSubmit={this.onSubmitCoverPhoto} id='coverPhotoForm' hidden={this.state.isMouseInside}>
                            <input id='cover-photo-button' type='file' accept='image/*' onChange={this.onFileUpload}/>
                            <button id='cover-photo-button' hidden={!this.state.uploadedCoverPhoto}>Upload Cover Photo</button>
                        </form>
                    </div>



                    <div className='content-container'>
                        <div className='profile-info-wrapper'>
                        <div className='profile-info-container'>
                                    {/* PROFILE PICTURE */}
                                <div className='profile-picture-wrapper'>
                                    <img className='profile-info-picture' src={this.props.user.picture}/>
                                    <form onSubmit={this.onSubmitProfilePicture} id='profilePictureForm'>
                                        <input className='profile-picture-upload' type='file' accept='image/*' onChange={this.onUploadProfilePicture}/>
                                    </form>
                                </div>

                                {/* PROFILE NAME */}
                                <h2 className='profile-info-name'>{this.props.user.given_name} {this.props.user.family_name}</h2>


                                {/* PROFILE FOLLOWERS */}
                                <Link to={`${id}/followers`}><h3 className='profile-info-analytics' >{this.followers.length} Followers</h3></Link>
                                <Link to={`${id}/following`}><h3 className='profile-info-analytics'>{this.following.length} Following</h3></Link>



                                <h3 className='profile-info-bio profile-info-bio__info'>{this.props.user.bio}</h3>

                                {this.props.currentUser.id !== id && 
                                    <button onClick={this.onFollow} disabled={this.state.disabled}>{!!this.props.alreadyFollowing ? 'Follow' : 'Unfollow'}</button>
                                }
                                {/* PROFILE BIO */}
                                {this.props.currentUser.id === id && 
                                <form hidden={this.state.editBioVisibility}  className='profile-info-bio' onSubmit={this.onSubmitBio}>
                                    <input type='text' onChange={this.onChange} defaultValue={this.props.currentUser.bio}></input>
                                    <button>Save Bio</button>
                                </form>
                                }

                                
                                {this.props.currentUser.id === id &&
                                    <button onClick={this.onClick} className='profile-info-bio' hidden={!this.state.editBioVisibility}>Edit Bio</button>
                                }

                                {/* POST STATUS */}
                                {this.props.currentUser.id === id && <PostStatus />}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        startSetUser: (id, user) => dispatch(startSetUser(id, user)),
        startSetBio: (id, bio) => dispatch(startSetBio(id, bio)),
        resetUser: () => dispatch(resetUser()),
        startSetCoverPhoto: (photo, id) => dispatch(startSetCoverPhoto(photo, id)),
        startFollow: (currentUsedId, userId) => dispatch(startFollow(currentUsedId, userId)),
        startUnfollow: (id, followingId, followerId, userId) => dispatch(startUnfollow(id, followingId, followerId, userId)),
        startUploadProfilePicture: (photo, id) => dispatch(startUploadProfilePicture(photo, id))
    }

};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        currentUser: state.currentUser,
        followers: state.followers,
        following: state.following,
        alreadyFollowing: alreadyFollowing(state.currentUser.following, state.user.id)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileInfo);