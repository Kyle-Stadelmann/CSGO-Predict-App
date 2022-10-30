// import a set of dummy matches so you can make the UI
// TODO: load all matches where both teams exist? update whenever a stage ends?
import { useState } from 'react';
import { getStoredUser } from './lib/user-util';
import Matches from '../Matches';
import { DayPredictions, Prediction, submitDayPredictions } from 'csgo-predict-api';
import { DEFAULT_LEAGUE_ID } from '../../constant';

const Voting = () => {
    // this will be necessary once we have more than one day
    const [ currentDay, setDay ] = useState(1);

    function submitPredictions() {
        const user = getStoredUser();
        if (!user) {
            // No authed user do nothing for now
            return;
        }

        const dayPreds: DayPredictions = {
            userId: user.id,
            date: new Date(),
            leagueId: DEFAULT_LEAGUE_ID,
            predictions: getPredictionsList()
        }

        submitDayPredictions(dayPreds);

        console.log(`Submitted predictions for day: ${currentDay}`);
    }

    function getPredictionsList(): Prediction[] {
        const predictions: Prediction[] = [];

        // how to get matches
        /* 
        matches.map(match => {
            const prediction: Prediction = {
                matchId: match.id,
                choiceTeamId: // how do we get this
            }
            return prediction;
        })*/

        return predictions;
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