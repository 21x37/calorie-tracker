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
        if (this.props.user.followers) {
            database.ref(`users/${this.props.user.id}/followers`).once('value').then((snapshot) => {
                if (snapshot.val()){
                    const follows = Object.values(snapshot.val());
                    const following = [];
                    follows.forEach(follow => {
                        database.ref(`users/${follow.id}`).once('value').then((profileSnapshot) => {
                            console.log(profileSnapshot.key);
                            following.push({...profileSnapshot.val(), ref: profileSnapshot.key});
                            this.setState({ 
                                following 
                            });
                            console.log(this.state.following);
                        })
                    })
                }
            }) 
        }

    }
    render() {
        return (
            <div>
            Followers Page 
            <Link to={`/profile/${this.props.user.id}`}>Go back</Link>
            {this.state.following.map((follow) => {
                return (
                    <div key={follow.id}>
                        <Link to={`/profile/${follow.ref}`}>
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
    user: state.user
});

export default connect(mapStateToProps)(Following);