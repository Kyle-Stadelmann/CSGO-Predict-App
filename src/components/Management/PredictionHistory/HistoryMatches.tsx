import { MatchResult, UserLeagueDayResults } from "csgo-predict-api";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import HistoryMatch from "./HistoryMatch";

export default function HistoryMatches({ matches, userResults }: HistoryMatchesProps) {
	function createMatchesElement(): JSX.Element {
		return (
			<List className="match-list" disablePadding>
				{matches.map((m) => createMatchElement(m))}
			</List>
		);
	}

	function createMatchElement(match: MatchResult): JSX.Element {
		return (
			<ListItem key={match.id} disablePadding>
				<HistoryMatch match={match} userResults={userResults} />
			</ListItem>
		);
	}

	return createMatchesElement();
}

type HistoryMatchesProps = {
	matches: MatchResult[];
	userResults: UserLeagueDayResults[];
};
