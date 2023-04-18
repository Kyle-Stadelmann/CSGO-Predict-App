// this will be the main content of the Management page
// it will contain the leaderboard (left side, user scores in that tournament)
// and the voting window (right side, voting (it exists already))
import { League } from "csgo-predict-api";
import Leaderboard from "./Leaderboard";
import Voting from "./Voting";

const Tournament = ({league}: TournamentProps) => {
	return (
		<div className="tournament">
			<Leaderboard league={league} />
			<Voting />
		</div>
	);
};

type TournamentProps = {
    league: League;
}

export default Tournament;
