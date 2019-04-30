import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Header from './Header.js';

class App extends Component { 
    // constructor
    constructor (props) {
        super(props);
        // set states
        this.state = {
        };
    }

    // methods

    // render
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Header />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;