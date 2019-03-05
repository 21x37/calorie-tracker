import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import followers from '../../selectors/followers';
import database from '../../firebase/firebase';


class Following extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            following: [],
            currentId: window.location.href.split('/')[4]

        }
    }
    componentDidMount() {
        if (this.props.user.following) {
            database.ref(`users/${this.props.user.id}/following`).once('value').then((snapshot) => {
                const follows = Object.values(snapshot.val());
                const following = [];
                follows.forEach(follow => {
                    database.ref(`users/${follow.userId}`).once('value').then((profileSnapshot) => {
                        console.log(profileSnapshot.key);
                        following.push({...profileSnapshot.val(), ref: profileSnapshot.key});
                        this.setState({ 
                            following 
                        });
                        console.log(this.state.following);
                    })
                })
            }) 
        }

    }
    render() {
        return (
            <div>
                <div className='followers-back-button-wrapper'>
                    <div className='followers-back-button'>
                        <Link style={{textDecoration: 'none', color: '#303A52'}} to={`/profile/${this.state.currentId}`}>Go Back</Link>
                    </div>
                </div>
                <div className='followers-wrapper'>
                    <div className='followers-container'>
                    <div className='followers-back-button-wrapper'>

                    </div>
                    <h1 className='followers-title'>Following</h1>
                    { this.state.following[0] && this.state.following.map((follow) => {
                        return (
                            <Link style={{textDecoration: 'none', color: '#303A52'}} to={`/profile/${follow.ref}`}>
                                <div className='individual-follow-wrapper'>
                                    <div className='individual-follow-container' key={follow.id}>
                                        <div className='individual-follower-info'>
                                                <img className='individual-follow-picture' src={follow.picture} style={{width: '60px', height: '60px'}}/>
                                                <h2 className='individual-follow-name'>{follow.name}</h2>  
                                        </div>
                                        <div className='individual-follow-bio-wrapper'>
                                            <div className='individual-follow-bio'>
                                                <p>{follow.bio}</p>
                                            </div>
                                        </div>
                                        <div className='individual-follow-follow-container'>
                                            <p className='individual-follow-followers'>Followers: {follow.followers ? Object.keys(follow.followers).length : 0}</p>
                                            <p className='individual-follow-following'>Following: {follow.following ? Object.keys(follow.following).length : 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            
                        )
                    })}
                    { !this.state.following[0] && <h3>No Following</h3>}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(Following);