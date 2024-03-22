import { MatchResult, UserLeagueDayResults } from "csgo-predict-api";
import HistoryTeamCard from "./HistoryTeamCard";

export default function HistoryMatch({ match, userResults }: HistoryMatchProps) {
	const team1 = match.team1;
	const team2 = match.team2;

	return (
		<div className="match">
			<HistoryTeamCard match={match} team={team1} isRightSide={false} userResults={userResults} />
			<span className="versus">
				<h2>vs</h2>
			</span>
			<HistoryTeamCard match={match} team={team2} isRightSide={true} userResults={userResults} />
		</div>
	);
}

type HistoryMatchProps = {
	match: MatchResult;
	userResults: UserLeagueDayResults[];
};
