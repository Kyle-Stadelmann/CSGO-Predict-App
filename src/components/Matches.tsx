import React from 'react';
import Match from './Match';

const Matches = () => {
    return (
        <div className="match-window">
            Currently Displayed Matches
            <Match />
            <br />
            <Match />
        </div>
    );
}

export default Matches;