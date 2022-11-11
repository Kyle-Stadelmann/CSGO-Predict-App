import { League, User } from 'csgo-predict-api';
import React from 'react'
import Score from './Score';

type PlayerProps = {
	player: string;
    score: number;
    league: League;
};

// can copy implementation of match if you want to link player pics to player profiles
// (assuming we add profiles)
// TODO: make player the google User object (or w/e contains the relevant info)
//       rather than string of userId
const Player = ({player, score, league}: PlayerProps) => {
    const userDayScore = league.daysMap.get(8)?.userScores.get(player)?.dayScore;

    return (
        <div className="player">
            <img src={"this should be link to player pic"} alt="NO_PICTURE" />
            &nbsp;
            {`Player: ${player}`}
            &nbsp;
            <Score userScore={score} totalScore={NaN}
            userDayScore={userDayScore ?? NaN} totalDayScore={NaN} />
        </div>
    )
}

export default Player