import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <div>
        <h1>Lorem Ipsum</h1>
        <NavLink to='/'>Home</NavLink>
        <NavLink to ='/calories'>Calorie</NavLink>
        <NavLink to='/search'></NavLink>
    </div>
)

export default Header;