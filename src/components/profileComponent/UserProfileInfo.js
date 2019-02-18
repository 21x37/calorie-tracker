import React from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../../actions/user';

const UserProfileInfo = (props) => {
    const id = window.location.href.split('/')[4];
    props.startSetUser(id, props.user);

    if (props.user) {
        return (
            <div>
                <img src={props.user.picture} style={{width: '20%', height: '20%', marginTop: '15px'}}/>
                <h2>{props.user.given_name} {props.user.family_name}</h2>
                <p></p>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetUser: (id, user) => dispatch(startSetUser(id, user))
    }

};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileInfo);