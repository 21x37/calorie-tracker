import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Followers = (props) => {
    return (
        <div>
        Followers Page
        <Link to={`/profile/${props.user.id}`}>Go Back</Link>
        </div>

    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Followers);