import React from 'react';
import { connect } from 'react-redux';

const UserProfileInfo = (props) => {
    return (
        <div>
            <img src={props.currentUser.picture} style={{width: '20%', height: '20%', marginTop: '15px'}}/>
            <h2>{props.currentUser.given_name} {props.currentUser.family_name}</h2>
            <p></p>
        </div>
    );
};

const mapStateToProps = (state) => {
    const id = window.location.href;
};

export default connect(mapStateToProps)(UserProfileInfo);