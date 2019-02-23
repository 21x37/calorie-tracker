import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Following = (props) => {
    return (
        <div>
        Following Page
        <Link to={`/profile/${props.user.id}`}>Go back</Link>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(Following);