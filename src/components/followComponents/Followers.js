import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import followers from '../../selectors/followers';
import database from '../../firebase/firebase';

class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: []
        }
    }
    componentDidMount() {
        const followering = [];
        if (this.props.user.followers) {
            database.ref(`users/${this.props.user.id}/followers`).once('value').then((snapshot) => {
    
                const follower = Object.values(snapshot.val())
                const followers = [];
                follower.forEach((follow) => {
                    database.ref(`users/${follow.id}`).once('value').then((profileSnapshot) => {
                        followers.push(profileSnapshot.val());
                        this.setState({ followers })
                    });
                });
            });
        }
    }
    render() {
        return (
            <div>
            Followers Page
            <Link to={`/profile/${this.props.user.id}`}>Go Back</Link>
            {this.state.followers.map(follow => {
                console.log(follow)
                return (
                    <div key={follow.id}>
                        <Link to={`/profile/${follow.id}`}>
                            <h2>{follow.name}</h2>
                            <img src={follow.picture} style={{width: '60px', height: '60px'}}/>
                        </Link>
                    </div>
                )
            })}
            </div>
    
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    followers: followers(state.user.id)

})

export default connect(mapStateToProps)(Followers);