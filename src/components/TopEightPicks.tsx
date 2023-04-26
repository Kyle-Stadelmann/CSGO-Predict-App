// this is the user's actual picks for top 8
// selected teams from TopEightList will come here

import React from 'react';
import { League } from 'csgo-predict-api';
import { useDrop } from 'react-dnd';
import TopEightTeamBucket from './TopEightTeamBucket';

// you drag TopEightTeam components from TopEightList to here
const TopEightPicks = ({league}: TopEightPicksProps) => {
    return (
        <div className="top-eight-picks-wrapper">
            Top Eight Picks Wrapper
            <div className="top-eight-picks">
                Top Eight Picks
                <TopEightTeamBucket />
                <TopEightTeamBucket />
                <TopEightTeamBucket />
                <TopEightTeamBucket />
                <TopEightTeamBucket />
                <TopEightTeamBucket />
                <TopEightTeamBucket />
                <TopEightTeamBucket />
            </div>
        </div>
    );
};

type TopEightPicksProps = {
    league: League;
}

export default TopEightPicks;