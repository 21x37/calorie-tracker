import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import { startSetUser, startSetBio, resetUser } from '../../actions/user';
import PostStatus from '../newsFeedComponents/PostStatus';
import { startSetCoverPhoto, startUploadProfilePicture } from '../../actions/coverPhoto';
import { startFollow, startUnfollow } from '../../actions/follow';
import alreadyFollowing from '../../selectors/alreadyFollowing';
import UserPhotoList from './UserPhotoList';
import PostStatusList from './ProfilePageStatusList';
import ProfilePageStatusList from './ProfilePageStatusList';


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
            disabled: false,
            isMouseInsideProfilePicture: true,
            onWall: true,
            onPhotos: false
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
        this.setState({ uploadedCoverPhoto: e.target.files[0] }, () => {
            this.props.startSetCoverPhoto(this.state.uploadedCoverPhoto, this.props.currentUser.id, this.props.user.coverPhoto.name).then(() => {
                const form = document.getElementById('coverPhotoForm');
                form.reset();
                this.setState({ uploadedCoverPhoto: null })
            });
        })

    };
    onMouseEnterCoverPhoto = () => {
        if (this.props.currentUser.id === this.props.user.id) {
            this.setState({ isMouseInside: false })
        }
    };
    onMouseLeaveCoverPhoto = () => {
        this.setState({ isMouseInside: true })
    };
    onMouseEnterProfilePicture = () => {
        if (this.props.currentUser.id === this.props.user.id) {
            this.setState({ isMouseInsideProfilePicture: false })
        };
    };
    onMouseLeaveProfilePicture = () => {
        this.setState({ isMouseInsideProfilePicture: true })
    }
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
                this.setState({ alreadyFollowing: alreadyFollowing(this.props.currentUser.following, this.props.user.id) }, this.setState({ disabled: false }));

            });

        } else {
            this.setState({ disabled: true })
            this.props.currentUser.following.forEach((follow) => {
                if (follow.userId.userId === this.props.user.id) {
                    this.props.startUnfollow(this.props.currentUser.id, follow.followingId, followId, this.props.user.id).then(() => {
                        this.setState({ alreadyFollowing: alreadyFollowing(this.props.currentUser.following, this.props.user.id) }, this.setState({ disabled: false }));

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
        const coverPhotoId = uuid();
        const id = window.location.href.split('/')[4];
        this.props.startSetUser(id, this.props.user);
        if (this.props.user) {
            // SETTING UP THE USERS FOLLOWERS AND FOLLOWING
            const following = [];
            if (this.props.user.followers) {
                this.followers = Object.keys(this.props.user.followers).map((key) => ({ id: key, userId: this.props.user.followers[key] }));

            }
            if (this.props.user.following) {
                this.following = Object.keys(this.props.user.following).map((key) => ({ id: key, userId: this.props.user.following[key] }))
            }

            return (
                <div style={{postion: 'relative'}} className='profile-info-wrapper'>

                    {/* COVER PHOTO */}
                    <div className={`${this.props.currentUser.id === id ? 'profile-cover-photo__container' : ''}`} onMouseEnter={this.onMouseEnterCoverPhoto} onMouseLeave={this.onMouseLeaveCoverPhoto}>
                        <div className='black-background-cover-photo'>
                            <img className='cover-photo' src={this.props.user.coverPhoto ? this.props.user.coverPhoto.picture : 'https://firebasestorage.googleapis.com/v0/b/trainingpals-d320c.appspot.com/o/images%2Fcoverphotodefault.jpg?alt=media&token=de484d31-95f8-4c81-8946-e959ff58ad6d'} />
                        </div>
                    </div>

                    <div className='profile-cover-photo-button'>
                        <p id='cover-photo-button' hidden={this.state.isMouseInside}>Upload a Cover Photo!</p>
                        <form id='coverPhotoForm' hidden={this.state.isMouseInside}>
                            <input hidden={true} id={coverPhotoId} type='file' accept='image/*' onChange={this.onFileUpload} />
                            <div className='upload-cover-photo-icon'>
                                <label htmlFor={coverPhotoId}><ion-icon style={{cursor: 'pointer'}} name="arrow-up"></ion-icon></label>
                            </div>
                        </form>
                    </div>

                    <div className='under-cover-photo-bar'>
                    </div>

                    


                    <div className='profile-info-container'>
                        <div className='profile-dashboard'>
                            <h4 onClick={() => {
                                this.setState(() => {
                                    return {
                                        onWall: true,
                                        onPhotos: false
                                    }
                                })
                            }} className={`profile-dashboard__item ${this.state.onWall ? 'profile-dashboard__item-active' : ''}`}>Wall</h4>
                            <h4 onClick={() => {
                                this.setState(() => {
                                    return {
                                        onWall: false,
                                        onPhotos: true
                                    }
                                })
                            }} className={`profile-dashboard__item ${this.state.onPhotos ? 'profile-dashboard__item-active' : ''}`}>Photos</h4>
                        </div>

                        {/* PROFILE PICTURE */}
                        <div className='profile-picture__flex'>
                            <img className={`profile-picture ' ${!this.state.isMouseInsideProfilePicture ? 'profile-picture-opacity' : ''}`} onMouseEnter={this.onMouseEnterProfilePicture} onMouseLeave={this.onMouseLeaveProfilePicture} src={this.props.user.picture} />
                            <form onSubmit={this.onSubmitProfilePicture} id='profilePictureForm'>
                                <input id='profile-picture-input' type='file' accept='image/*' style={{ display: 'none' }} onChange={this.onUploadProfilePicture} />
                                <label className='profile-picture-upload' htmlFor='profile-picture-input' hidden={this.state.isMouseInsideProfilePicture}><ion-icon name="images"></ion-icon></label>
                            </form>
                        </div>



                        {/* PROFILE NAME */}
                        
                        <div className='left-panel-profile'>

                            <div className='left-panel-padding'>
                                <div className='left-panel-wrapper'>
                                    <h2 className='user-name'>{this.props.user.given_name} {this.props.user.family_name}</h2>


                                    {/* PROFILE FOLLOWERS */}

                                    <Link to={`${id}/followers`} className='profile-follow'><h3 className='profile-follow' >{this.followers.length} Followers</h3></Link>
                                    <Link to={`${id}/following`} className='profile-follow'><h3 className='profile-follow'>{this.following.length} Following</h3></Link>





                                    {this.props.currentUser.id !== id &&
                                        <button className='button' onClick={this.onFollow} disabled={this.state.disabled}>{!!this.props.alreadyFollowing ? 'Follow' : 'Unfollow'}</button>
                                    }
                                    {/* PROFILE BIO */}

                                    <h3 className='profile-info-bio profile-info-bio__info'>{this.props.user.bio}</h3>


                                    {this.props.currentUser.id === id &&
                                        <form hidden={this.state.editBioVisibility} className='profile-info-bio' onSubmit={this.onSubmitBio}>
                                            <input type='text' onChange={this.onChange} defaultValue={this.props.currentUser.bio}></input>
                                            <button className='button'>Save Bio</button>
                                        </form>
                                    }


                                    {this.props.currentUser.id === id &&
                                        <button onClick={this.onClick} className='profile-info-bio button' style={{ display: this.state.editBioVisibility ? 'inline-block' : 'none' }}>Edit Bio</button>
                                    }
                                </div>
                            </div>
                        </div>



                                <div className='fishing-for-divs'></div>

                        {/* PHOTO LIST */}

                        {this.state.onPhotos && <UserPhotoList />}


                        {/* POST STATUS */}
                        <div className='profile-status-list-wrapper'>    {/* status-list-wrapper */}
                            <div className='profile-status-list-container'> {/* status-list-container */}
                                {this.state.onWall && this.props.currentUser.id === id &&
                                    <div>
                                        <PostStatus />
                                    </div>
                                }
                                {this.state.onWall && <ProfilePageStatusList />}
                            </div>
                        </div>  
                    </div>
                    <div className='right-profile-panel'><p></p></div>
                    <div className='right-profile-panel__color'><p></p></div>
                    <div className='under-profile-photo'><p></p></div>
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
        startSetCoverPhoto: (photo, id, prevName) => dispatch(startSetCoverPhoto(photo, id, prevName)),
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