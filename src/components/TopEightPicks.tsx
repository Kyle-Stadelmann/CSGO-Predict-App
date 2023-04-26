// this is the user's actual picks for top 8
// selected teams from TopEightList will come here

import React from 'react';
import { League, Team } from 'csgo-predict-api';

// you drag TopEightTeam components from TopEightList to here
const TopEightPicks = ({league}: TopEightPicksProps) => {
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
        <div>
            {/* make this a list of Team components */}
        </div>
    );
};

type TopEightPicksProps = {
    league: League;
}

export default TopEightPicks;