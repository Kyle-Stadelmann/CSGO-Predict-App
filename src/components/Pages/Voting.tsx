// TODO: load all matches where both teams exist? update whenever a stage ends?
import React, { useState } from 'react';
import { getStoredUser } from './lib/user-util';
import Matches from '../Matches';
import { DayPredictions, Prediction, submitDayPredictions, Match as ApiMatch, Team as ApiTeam } from 'csgo-predict-api';
import { DEFAULT_LEAGUE_ID } from '../../constant';

// I WANT AN OBJECT THAT HOLDS MATCH_ID : TEAM_ID PAIRS
export interface Picks {
    [match_id: string] : number;
}

const Voting = () => {
    // this will be necessary once we have more than one day
    const [ currentDay, setDay ] = useState(1);
    const [ matches, setMatches ] = useState([] as ApiMatch[]);
    const [ picks, setPicks ] = useState({} as Picks);

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

        matches.map(match => {
            const prediction: Prediction = {
                matchId: match.id,
                choiceTeamId: picks[match.id]
            }
            return prediction;
        });

        return predictions;
    }

    return (
        <div>
            <br />
            <h2>Voting</h2>
            {/* event=import */}
            <Matches matches={matches} setMatches={setMatches} picks={picks} setPicks={setPicks} />
            <button type="button" className="submit-predictions-btn" onClick={submitPredictions}>Submit Predictions!</button>
        </div>
    );
}

export default Voting;