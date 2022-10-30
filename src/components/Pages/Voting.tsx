// import a set of dummy matches so you can make the UI
// TODO: load all matches where both teams exist? update whenever a stage ends?
import React, { useState } from 'react';
import Matches from '../Matches';

const Voting = () => {
    // this will be necessary once we have more than one day
    const [ currentDay, setDay ] = useState("default day");

    function submitPredictions() {
        console.log(`submitted predictions for day: ${currentDay}`);
        // submit DayPredictions object to db
        // not really sure how we're gonna have that floating around yet
        // maybe in sessionStorage 
    }

    return (
        <div>
            <br />
            <h2>Voting</h2>
            {/* event=import */}
            <Matches />
            <button type="button" className="submit-predictions-btn" onClick={submitPredictions}>Submit Predictions!</button>
        </div>
    );
}

export default Voting;