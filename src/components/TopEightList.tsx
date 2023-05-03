// this is a list of all the teams that will be in the major
// to be used for picking your top 8 predictions in TopEight page

import React from 'react';
import TopEightTeam from './TopEightTeam';
import TopEightTeamBucket from './TopEightTeamBucket';
import { Team } from 'csgo-predict-api';

const TopEightList = ({ teams }: TopEightListProps) => {
    return (
        <div className="top-eight-list-wrapper">
            Top Eight List Wrapper
            <div className="top-eight-list">
                Top Eight List
                {teams}
            </div>
        </div>
    );
};

type TopEightListProps = {
    teams: JSX.Element[],
}

export default TopEightList;