// TODO: add a submitted status indicator at the right side
import { Match as ApiMatch, Team as ApiTeam } from "csgo-predict-api";
import { MatchPicks } from "../Pages/Voting";
import SelectableTeam from "./SelectableTeam";

export default function Match({ match, picks, setPicks }: MatchProps) {
	const team1 = match.team1;
	const team2 = match.team2;
	const pickedTeam = getPickedTeam();

	function getPickedTeam(): ApiTeam | undefined {
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
		// TODO: make selected team have an outline or some sort of visual indication of choice
		// can possibly just get rid of "current picked team"
		<div className="match">
			<SelectableTeam team={team1} onClick={handleTeam1Picked} pickedTeam={pickedTeam} isRightSide={false} />
			<span className="versus">
				<h2>vs</h2>
			</span>
			<SelectableTeam team={team2} onClick={handleTeam2Picked} pickedTeam={pickedTeam} isRightSide={true} />
		</div>
	);
}

type MatchProps = {
	match: ApiMatch;
	picks: MatchPicks;
	setPicks: React.Dispatch<React.SetStateAction<MatchPicks>>;
};
