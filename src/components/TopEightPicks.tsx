// this is the user's actual picks for top 8
// selected teams from TopEightList will come here

import React from 'react';
import { League } from 'csgo-predict-api';
import { useDrop } from 'react-dnd';
import TopEightTeamBucket from './TopEightTeamBucket';

const TopEightPicks = ({ teams }: TopEightPicksProps) => {
    return (
        <div className="top-eight-picks-wrapper">
            Top Eight Picks Wrapper
            <div className="top-eight-picks">
                Top Eight Picks
                {teams}
            </div>
        </div>
    );
};

type TopEightPicksProps = {
    teams: JSX.Element[],
}

export default TopEightPicks;