import { User } from 'csgo-predict-api';
import React from 'react'
import { getStoredUser } from "./Pages/lib/user-util";

type PlayerProps = {
	player: string;
    score: number;
};

// can copy implementation of match if you want to link player pics to player profiles
// (assuming we add profiles)
const Player = ({player, score}: PlayerProps) => {
    return (
        <div className="player">
            <img src={"this should be link to player pic"} alt="NoPic" />
            &nbsp;
            {`Player: ${player}`}
            &nbsp;
            <div className="score">
                {`Score: ${score}`}
            </div>
        </div>
    )
}

export default Player