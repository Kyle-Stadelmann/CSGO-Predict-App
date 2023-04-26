// this is a list of all the teams that will be in the major
// to be used for picking your top 8 predictions in TopEight page

import React from 'react';
import TopEightTeam from './TopEightTeam';
import TopEightTeamBucket from './TopEightTeamBucket';
import { Team } from 'csgo-predict-api';

// populate with all teams
// list of TopEightTeam components, one for each team attending the major

// the list should actually be:
//
//  top layer - top-eight-list-wrapper
//      has - top-eight-list
//          has - top-eight-bucket
//              has - top-eight-team
//
// so basically it's the wrapper, the wrapper contains the list component,
// the list component is a list (just visually, not a list object) of team buckets,
// and each team bucket has a draggable team component in it 

// not sure how the translucency of selected teams is gonna be done on the right side,
// but for now im going with same bucket, list, wrapper, etc on both sides (why? idk)
// ig i dont have to commit to that now

// start with a single team
const TopEightList = () => {
    let testTeam: Team = {
        id: 1,
        name: "Heroic",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Heroic_2023_logo.png",
        country: {
            name: "Denmark",
            code: "idk what this is"
        },
        rank: 1,
    };
    
    return (
        <div className="top-eight-list-wrapper">
            Top Eight List Wrapper
            <div className="top-eight-list">
                Top Eight List
                <TopEightTeamBucket team={testTeam}/>
            </div>
        </div>
    );
};

type TopEightListProps = {
}

export default TopEightList;