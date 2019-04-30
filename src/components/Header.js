import React from 'react';
import { Link } from 'react-router-dom';

// A SkyBet Banner across the page. Make it clickable with Link to self.
const Header = () => {
    return (
        <div>
            <Link to="/">
                <div id="header">
                    <h1>SkyBet Banner</h1>
                </div>
            </Link>
        </div> 
    );
};

export default Header;