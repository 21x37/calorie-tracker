import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { clearCalorieLookUp } from '../actions/calorieLookUp';
import SearchUsers from '../components/searchUsers/SearchUsers';

 export const Header = (props) => (
    <header className='header'>
        <div className='content-container'>
            <div className='header__content'>
                <Link className='header__title' to="/">
                    <h1>TrainingPals</h1>
                </Link>
                <SearchUsers className='header__search'/>
                <Link className='header__title nav nav__text' to='/foodsearch' >Search Foods</Link>
                <Link className='header__title nav nav__text' to='/calories' onClick={props.clearCalorieLookUp}>Calorie Summary</Link>
                <Link className='header__title nav nav__text nav__profile' to={`/profile/${props.currentUser.id}`} onClick={props.clearCalorieLookUp}>Profile</Link>
                <button className='header__title nav__text header__logout button button--link nav'onClick={props.startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    clearCalorieLookUp: () => dispatch(clearCalorieLookUp())
});

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// <Link className='header__title' to='/' onClick={props.clearCalorieLookUp}>Home</Link>