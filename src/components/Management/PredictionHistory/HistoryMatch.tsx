import { MatchResult } from "csgo-predict-api";
import HistoryTeamCard from "./HistoryTeamCard";

export default function HistoryMatch({ match }: HistoryMatchProps) {
	const team1 = match.team1;
	const team2 = match.team2;

	return (
		<div className="match">
			<HistoryTeamCard team={team1} isRightSide={false} />
			<span className="versus">
				<h2>vs</h2>
			</span>
			<HistoryTeamCard team={team2} isRightSide={true} />
		</div>
	);
}

type HistoryMatchProps = {
	match: MatchResult;
};
