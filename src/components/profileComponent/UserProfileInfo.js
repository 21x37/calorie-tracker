import React from 'react';
import { connect } from 'react-redux';
import { startSetUser, startSetBio } from '../../actions/user';
import PostStatus from '../newsFeedComponents/PostStatus';


class UserProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
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
                    <img src={this.props.user.picture} style={{width: '20%', height: '20%', marginTop: '15px'}}/>
                    <h2>{this.props.user.given_name} {this.props.user.family_name}</h2>
                    <h3>{this.props.user.bio}</h3>
                    {this.props.currentUser.id === id && 
                    <form hidden={this.state.editBioVisibility} onSubmit={this.onSubmit}>
                        <input type='text' onChange={this.onChange} defaultValue={this.props.user.bio}></input>
                        <button>Save Bio</button>
                    </form>
                    }
                    {this.props.currentUser.id === id &&
                        <button onClick={this.onClick} hidden={!this.state.editBioVisibility}>Edit Bio</button>
                    }
                    {this.props.currentUser.id === id && <PostStatus />}
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
        startSetBio: (id, bio) => dispatch(startSetBio(id, bio))
    }

};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileInfo);