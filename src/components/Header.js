import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

 export const Header = ({ startLogout }) => (
    <header className='header'>
        <div className='content-container'>
            <div className='header__content'>
                <Link className='header__title' to="/">
                    <h1>TrainingPals</h1>
                </Link>
                <Link className='header__title' to='/'>Home</Link>
                <Link className='header__title' to='/foodsearch'>Search Foods</Link>
                <Link className='header__title' to='/calories'>Calorie Summary</Link>
                <Link className='header__title' to='/profile/1'>Profile</Link>
                <button className='button--link button'onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);