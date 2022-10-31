// TODO: load all matches where both teams exist? update whenever a stage ends?
import { useState } from 'react';
import { getStoredUser } from './lib/user-util';
import Matches from '../Matches';
import { DayPredictions, Prediction, submitDayPredictions, Match as ApiMatch, Team as ApiTeam, Id, Team } from 'csgo-predict-api';
import { DEFAULT_LEAGUE_ID } from '../../constant';

export interface MatchPicks {
    [match_id: Id] : Team;
}

const Voting = () => {
    // this will be necessary once we have more than one day
    const [ currentDay, setDay ] = useState(1);
    const [ matches, setMatches ] = useState([] as ApiMatch[]);
    const [ picks, setPicks ] = useState({} as MatchPicks);

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
        const predictions = matches.flatMap(match => {
            if (!picks[match.id]) {
                // No team picked, so we don't submit a prediction
                return [];
            }
            const prediction: Prediction = {
                matchId: match.id,
                choiceTeamId: picks[match.id].id
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