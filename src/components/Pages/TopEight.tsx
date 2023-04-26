// this gonna be a page that holds top 8 predictions + tourney mvp prediction
// left side has 8 slots, right side is a list of all teams at the tourney
// user picks the 8 teams they think are gonna be in top 8 (champion stage)
// user may not (re)submit this once the first match of the tournament has started

import { League } from "csgo-predict-api";
import { Link } from "react-router-dom";
import TopEightPicks from "../TopEightPicks";
import TopEightList from "../TopEightList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TopEight = ({league}: TopEightProps) => {
	return (
		<div className="top-eight-page">
			this is the top eight page for the league with Tournament ID {`${league.tournamentId}`}
            <br />
            <div className="top-eight">
                <DndProvider backend={HTML5Backend}>
                    <TopEightPicks league={league} />
                    <TopEightList />
                </DndProvider>
            </div>
		</div>
	);
};

type TopEightProps = {
    league: League;
}

export default TopEight;