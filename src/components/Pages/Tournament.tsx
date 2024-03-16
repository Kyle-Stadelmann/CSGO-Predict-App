// this will be the main content of the Management page
// it will contain the leaderboard (left side, user scores in that tournament)
// and the voting window (right side, voting (it exists already))
import { League } from "csgo-predict-api";
import Leaderboard from "./Leaderboard";
import Voting from "./Voting";
import { useState } from "react";
import TopEight from "./TopEight";

const Tournament = ({ league, topEightBool }: TournamentProps) => {
	if (!topEightBool) {
		return (
			<div className="tournament">
				<Leaderboard league={league} />
				<Voting />
			</div>
		);
	} else {
		return (
			<div className="tournament">
				<TopEight league={league} />
			</div>
		);
	}
};

type TournamentProps = {
	league: League;
	topEightBool: boolean;
};

export default Tournament;
