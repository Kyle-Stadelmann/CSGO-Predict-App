// this gonna be a page that holds top 8 predictions + tourney mvp prediction
// left side has 8 slots, right side is a list of all teams at the tourney
// user picks the 8 teams they think are gonna be in top 8 (champion stage)
// user may not (re)submit this once the first match of the tournament has started

import { League } from "csgo-predict-api";
import { Link } from "react-router-dom";
import TopEightPicks from "../TopEightPicks";
import TopEightList from "../TopEightList";

const TopEight = ({league}: TopEightProps) => {
	return (
		<div className="top-eight-page">
			this is the top eight page for the league with Tournament ID {`${league.tournamentId}`}
            <TopEightPicks league={league} />
            <TopEightList />
		</div>
	);
};

type TopEightProps = {
    league: League;
}

export default TopEight;