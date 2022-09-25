import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
const Header = () => {
    return (
        <nav className='Header'>
            <img src={logo} alt="" />
            <div>
                <a href="/Shop">Shop</a>
                <a href="./Orders">Orders</a>
                <a href="/inventory">Inventory</a>
                <a href="/About">About</a>
            </div>
        </nav>
    );
};

export default Header;