import React from 'react';
import './../css/LiveEvents.css';

const LiveEvents = (props) => {
    const events = props.events;
    const primaryMarket = props.primaryMarket;
    const primarOutcomes = props.primaryOutcomes;

    return events.map((events,i) =>  (
            <div
            key={i}
            className="liveGame">
                    <span
                    className = "minsPlayed">
                        { minsPlayed(events) }
                    </span>
                    <span
                    className = "eventName"
                    onClick={ () => { props.handleMarketClick(events.eventId);} }>
                        {events.name}
                    </span>
                    <span
                    className = "showPrimaryMarket"
                    onClick={ () => { props.handleShowPrimaryMarkets(primarOutcomes[i], i);} }>
                        V 
                    </span>
                    {/* this div is 'display: none;' until user clicks V */}
                    <div 
                        className="primaryMarket"
                        id={i}>
                        <div id="marketName">
                            {primaryMarket[i]}
                        </div>
                    </div>
            </div>
            
        )
    );
    function minsPlayed (events) {
        return Date.now() - events.startTime;
    }
};

export default LiveEvents;

// ToDo fix current in game time to show mins played rather than NAN