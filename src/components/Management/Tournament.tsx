import { League } from "csgo-predict-api";
import Leaderboard from "./Leaderboard";
import Prediction from "./Prediction";
import TopEight from "./TopEight";

export default function Tournament({ league, topEightBool }: TournamentProps) {
	if (!topEightBool) {
		return (
			<div className="tournament">
				<div style={{flex: 1}}>
					<Leaderboard league={league} />
				</div>
				<div style={{flex: 2}}>
					<Prediction league={league} />
				</div>
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
