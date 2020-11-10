import React from 'react';
import '../app/App.css';

function Nav() {
    return (
        <nav className='nav'>
            <div className="nav-head"><h1>T-Mercado</h1></div>
            <ul className="nav-list">
                <li>Home</li>
                <li>Books</li>
                <li>Electronics</li>
                <li>Apparel & Accessories</li>
                <li>Health & Beauty</li>
                <li>Sports & Outdoor</li>
                <li>Pet Supplies</li>
                <li>More</li>
            </ul>
        </nav>
    );
}

export default Nav;