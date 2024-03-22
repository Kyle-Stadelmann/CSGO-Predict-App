import { League } from "csgo-predict-api";
import Leaderboard from "./Leaderboard";
import Prediction from "./Prediction";
import TopEight from "./TopEight";

export default function Tournament({ league, topEightBool }: TournamentProps) {
	if (!topEightBool) {
		return (
			<div className="tournament">
				<Leaderboard league={league} />
				<Prediction league={league} />
			</div>
		);
	} else {
		return (
			<div className="tournament">
				<TopEight league={league} />
			</div>
		);
	}
}

type TournamentProps = {
	league: League;
	topEightBool: boolean;
};
