import React from 'react';
import '../app/App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className='nav'>
            <div className="nav-head">
                <Link to="/"><h1>T-Mercado</h1></Link>
                <div className="signin-container">
                    <button><Link to='/login'>Login</Link></button>
                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
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