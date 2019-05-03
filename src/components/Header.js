import React from 'react';
import './../css/Header.css';
import {customAlerts} from './functions.js';

const Header = (props) => {
    const wallet = props.wallet.toFixed(2);
    return (
        <div className="header" id="header">
            <div className="skyLinksBar" id="skyLinksBar">
                <span 
                    className="skyLinks" 
                    id="skyVegas"
                    onClick = { () => { customAlerts('This exciting new features is coming soon');} }
                    >sky VEGAS
                </span>
                <span 
                    className="skyLinks" 
                    id="skyCasino"
                    onClick = { () => { customAlerts('This exciting new features is coming soon');} }
                    >sky CASINO
                </span>
                <span 
                    className="skyLinks" 
                    id="skyLiveCasino"
                    onClick = { () => { customAlerts('This exciting new features is coming soon');} }
                    >sky LIVE CASINO
                </span>
            </div>
                <div 
                    className="toggleOdds" 
                    id="toggleOdds"
                    onClick = { () => { customAlerts('Fix fix props Validation error to enable toggleOdds Button to fire toggleOddsDisplay functions is app.js');} }
                    >
                    <h1>f/d</h1>
                </div>  
                <div className="skyBet" id="skyBet">
                    <h1>SkyBet</h1>
                </div>
                <div className="credit" id="credit">
                    <h1>£{wallet}</h1>
                </div> 
        </div> 
    );    
};

export default Header;

// ToDo fix props Validation error to enable toggleOdds Button to fire toggleOddsDisplay functions is app.js