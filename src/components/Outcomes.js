import React from 'react';

const Outcomes = props => {
    const { marketId, outcomes, showDecimalOdds } = props;

    if (!outcomes[marketId]) return <div></div>;

    return outcomes[marketId].map((outcome, i) => {
        return (
            <span key={i}>
                <div className="outcomeTitle">
                    { outcome.name }
                </div>
                <div className="outcomeOdds">
                    { getPrices(outcome, showDecimalOdds) }
                </div>
            </span>
        );
    });

    function getPrices (outcome, flag) {
        if (flag) {
            return outcome.price.decimal;
        }
        
        return `${outcome.price.num}/${outcome.price.den}`;
    }
};

export default Outcomes;
