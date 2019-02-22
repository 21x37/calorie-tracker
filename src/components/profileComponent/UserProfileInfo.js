import React from 'react';
import { connect } from 'react-redux';
import { startSetUser, startSetBio, resetUser } from '../../actions/user';
import PostStatus from '../newsFeedComponents/PostStatus';


class UserProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: this.props.currentUser.bio || '',
            editBioVisibility: true
        }
    };
    onClick = (e) => {
        e.preventDefault();
        this.setState({ editBioVisibility: false })
    };
    onChange = (e) => {
        const bio = e.target.value;
        this.setState({ bio })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.startSetBio(window.location.href.split('/')[4], this.state.bio);
        this.setState({ editBioVisibility: true })
        
    }
    render() {
        const id = window.location.href.split('/')[4];
        this.props.startSetUser(id, this.props.user);
        if (this.props.user) {
            return (
                <div>
                    <img className='profile-cover-photo' src={this.props.user.coverPhoto} />
                    <div className='content-container'>
                        <div className='profile-info-wrapper'>
                        <div className='profile-info-container'>
                                <img className='profile-info-picture' src={this.props.user.picture}/>
                                <h2 className='profile-info-name'>{this.props.user.given_name} {this.props.user.family_name}</h2>
                                <h3 className='profile-info-analytics'> 4 Followers | 3 Posts</h3>
                                <h3 className='profile-info-bio profile-info-bio__info'>{this.props.user.bio}</h3>
                                {this.props.currentUser.id === id && 
                                <form hidden={this.state.editBioVisibility}  className='profile-info-bio' onSubmit={this.onSubmit}>
                                    <input type='text' onChange={this.onChange} defaultValue={this.props.currentUser.bio}></input>
                                    <button>Save Bio</button>
                                </form>
                                }
                                {this.props.currentUser.id === id &&
                                    <button onClick={this.onClick} className='profile-info-bio' hidden={!this.state.editBioVisibility}>Edit Bio</button>
                                }
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
        resetUser: () => dispatch(resetUser())
    }

};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileInfo);