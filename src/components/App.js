import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import LiveEvents from './LiveEvents.js';
import './../css/App.css';

class App extends Component { 
    // constructor
    constructor (props) {
        super(props);
        // set states
        this.state = {
            wallet : 20.00,
            events: [],
            primaryMarkets: [],
            primaryOutcomes: [],
            toggleOdds: 'decimal',
            currentI : '',
            oldI : [], 
            eventDetails: [],
            outcomeDetails: []
        };
        this.handleMarketClick = this.handleMarketClick.bind(this);
        this.handleShowPrimaryMarkets = this.handleShowPrimaryMarkets.bind(this);
        this.toggleOddsDisplay = this.toggleOddsDisplay.bind(this);
    }

    // methods
    componentDidMount () {
        axios
            .get('http://localhost:8888/football/live?primaryMarkets=true')
            .then(res => {
                let eventsArr = [];
                res.data.events.forEach(function (events) {
                    let primaryMarketsArr = events.markets[0];
                    eventsArr.push(primaryMarketsArr);
                });
                this.setState({
                    events: res.data.events,
                    primaryMarkets: eventsArr     
                });
                let primaryArr = [];
                let primaryOutputArr = [];
                this.state.primaryMarkets.map((primaryMarkets) => {
                    axios
                        .get(`http://localhost:8888/sportsbook/market/${primaryMarkets}`)
                        .then(res => {
                            let eventMarket = res.data.market.name;
                            let outcomes = res.data.market.outcomes;
                            primaryArr.push(eventMarket);
                            primaryOutputArr.push(outcomes);
                            this.setState({
                                primaryMarkets: primaryArr,
                                primaryOutcomes : primaryOutputArr
                            });
                         })
                        .catch(err => {
                            return console.log(`Error in axios market request: ${err}`);
                        });
                });
            })
            .catch(err => {
                return console.log(`Error getting live market data: ${err}`);
            });

        const socket = new WebSocket('ws://localhost:8889');
        
        socket.onmessage = event => {
            // set up sockets for incomming events
            const update = JSON.parse(event.data);
            
            if (!update.data) return;
            console.log('Update');
        };

        socket.onopen = () => {
            // subscribe to all events on homepage
            this.state.events.forEach(event => {
                socket.send(JSON.stringify({
                    type: 'subscribe', 
                    keys: [`e.${event.eventId}`], 
                    clearSubscription: false}
                ));
            });
            // Subscribe to all market updates (irrespective of event)
            socket.send(JSON.stringify({type: 'subscribe', keys: ['m.*']}));
            console.log('WebSocket Open');
        };
        socket.onclose = () => {
            console.log('WebSocket Closed');
        };
    }

    handleMarketClick (eventId) {
        let detailsPage = document.createElement('div');
        detailsPage.id = 'detailsPage';
        detailsPage.className = 'detailsPage';
        document.getElementById('liveEvents').appendChild(detailsPage);
        let closePage = document.createElement('div');
        closePage.id = 'closePage';
        closePage.className = 'closePage';
        closePage.innerHTML = 'X';
        closePage.addEventListener('click', function () {
            document.getElementById('detailsPage').parentNode.removeChild(detailsPage);
        });
        document.getElementById('detailsPage').appendChild(closePage);
        axios
            .get(`http://localhost:8888/sportsbook/event/${eventId}`)
            .then(res => {
                this.setState({
                    eventDetails: res.data.event
                });
                let detailsName = document.createElement('div');
                detailsName.id = 'detailsName';
                detailsName.className = 'detailsName';
                detailsName.innerHTML = res.data.event.name;
                document.getElementById('detailsPage').appendChild(detailsName);
                let outcomesArr = [];
                res.data.event.markets.map((marketId) => {
                    axios
                        .get(`http://localhost:8888/sportsbook/market/${marketId}`)
                        .then(res => {
                            let marketOutcome = [res.data.market.marketId, res.data.market.name, res.data.market.outcomes];
                            outcomesArr.push(marketOutcome);
                            this.setState({
                                outcomeDetails: outcomesArr
                            });
                            let detailsMarket = document.createElement('div');
                            detailsMarket.id = 'detailsMarket';
                            detailsMarket.className = 'detailsMarket';
                            detailsMarket.innerHTML = res.data.market.name;
                            document.getElementById('detailsPage').appendChild(detailsMarket);
                            let detailsOutcomes = document.createElement('div');
                            detailsOutcomes.id = 'detailsOutcomes';
                            detailsOutcomes.className = 'detailsOutcomes';
                            detailsOutcomes.innerHTML = res.data.market.outcomes;
                            document.getElementById('detailsPage').appendChild(detailsOutcomes);
                        })
                        .catch(err => {
                            return console.log(`Error in axios market request: ${err}`);
                        });
                });
            })
            .catch(err => {
                return console.log(`Error in axios event request:: ${err}`);
            });
            // ToDO make calls to the outcomes for each market.
    }
    handleShowPrimaryMarkets (primarOutcomes, key) {
        if (this.state.oldI.includes(key)) return;
        primarOutcomes.map((outcomeID) => {
            axios
                .get(`http://localhost:8888/sportsbook/outcome/${outcomeID}`)
                .then(res => {
                    let cONames = res.data.outcome.name;
                    let cOPrice = res.data.outcome.price;
                    if (this.state.toggleOdds == 'decimal') {
                        cOPrice = cOPrice.decimal;
                    } else {
                        cOPrice = cOPrice.den;
                    }
                    let outcomeName = document.createElement('div');
                    outcomeName.id = 'outcomeName';
                    outcomeName.className = 'outcomeName';
                    outcomeName.innerHTML = cONames + ' ' + cOPrice;
                    primaryMarketDivs.appendChild(outcomeName);
                })
                .catch(err => {
                    return console.log(`Error in axios market request: ${err}`);
                });
        });
        const primaryMarketDivs = document.getElementById(key);
        primaryMarketDivs.style.display = 'block';
        let old = this.state.oldI;
        old.push(key);
        this.setState({ 
            currentI : key,
            oldI : old
        });
    }
    toggleOddsDisplay () {
        if (this.state.toggleOdds == 'decimal') {
             this.setState({ toggleOdds : 'den' });
        } else {
            this.setState({ toggleOdds : 'decimal' });
        }
    }

    // render
    render () {
        return (
            <div>
                <Header 
                    wallet = { this.state.wallet }
                    toggleOddsDisplay = { this.toggleOddsDisplay } 
                />
                <div 
                    className = 'liveEvents'
                    id = 'liveEvents' >
                    <LiveEvents
                        handleMarketClick = { this.handleMarketClick } 
                        handleShowPrimaryMarkets = { this.handleShowPrimaryMarkets } 
                        events = { this.state.events }
                        primaryMarket = { this.state.primaryMarkets }
                        primaryOutcomes = { this.state.primaryOutcomes }
                    />
                </div>
            </div>
        );
    }
}

export default App;


// ToDo fix datailsPage to shoe prices rather than the outcomeIDs currently being shown.
    // to do this i would have to mimic the logic in the primary markets axios calls