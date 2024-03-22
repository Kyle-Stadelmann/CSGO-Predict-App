import { Match, Team } from "csgo-predict-api";
import { MatchPicks } from "../Prediction";
import PredictionTeamCard from "./PredictionTeamCard";

export default function PredictionMatch({ match, picks, setPicks }: PredictionMatchProps) {
	const team1 = match.team1;
	const team2 = match.team2;
	const pickedTeam = getPickedTeam();

	function getPickedTeam(): Team | undefined {
		const pickedTeamId = picks[match.id];
		switch (pickedTeamId) {
			case team1.id:
				return team1;
			case team2.id:
				return team2;
			default:
				return;
		}
	}

	function handleTeam1Picked() {
		const tempPicks = { ...picks };

		if (pickedTeam && pickedTeam.id === team1.id) {
			delete tempPicks[match.id];
		} else {
			tempPicks[match.id] = team1.id;
		}

		setPicks(tempPicks);
	}

	function handleTeam2Picked() {
		const tempPicks = { ...picks };

		if (pickedTeam && pickedTeam.id === team2.id) {
			delete tempPicks[match.id];
		} else {
			tempPicks[match.id] = team2.id;
		}

		setPicks(tempPicks);
	}

	return (
		<div className="match">
			<PredictionTeamCard team={team1} onClick={handleTeam1Picked} pickedTeam={pickedTeam} isRightSide={false} />
			<span className="versus">
				<h2>vs</h2>
			</span>
			<PredictionTeamCard team={team2} onClick={handleTeam2Picked} pickedTeam={pickedTeam} isRightSide={true} />
		</div>
	);
}

type PredictionMatchProps = {
	match: Match;
	picks: MatchPicks;
	setPicks: React.Dispatch<React.SetStateAction<MatchPicks>>;
};
