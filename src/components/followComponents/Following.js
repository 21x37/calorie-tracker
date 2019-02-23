import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import followers from '../../selectors/followers';
import database from '../../firebase/firebase';


class Following extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            following: []
        }
    }
    componentDidMount() {
        if (this.props.user.following) {
            database.ref(`users/${this.props.user.id}/following`).once('value').then((snapshot) => {
                const follows = Object.values(snapshot.val());
                const following = [];
                follows.forEach(follow => {
                    database.ref(`users/${follow.userId}`).once('value').then((profileSnapshot) => {
                        following.push(profileSnapshot.val());
                        this.setState({ following });
                        console.log(this.state.following);
                    })
                })
            }) 
        }

    }
    render() {
        return (
            <div>
            Following Page 
            <Link to={`/profile/${this.props.user.id}`}>Go back</Link>
            {this.state.following.map((follow) => {
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
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    following: followers(state.user.id)
});

export default connect(mapStateToProps)(Following);