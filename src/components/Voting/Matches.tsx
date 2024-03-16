import { Match as ApiMatch } from "csgo-predict-api";
import Match from "./Match";
import { MatchPicks } from "../Pages/Voting";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";

export default function Matches({ matches, picks, setPicks }: MatchesProps) {
	function createMatchesElement(): JSX.Element {
		return (
			<List className="match-list" disablePadding>
				{matches.map((m) => createMatchElement(m))}
			</List>
		);
	}

	function createMatchElement(match: ApiMatch): JSX.Element {
		return (
			<ListItem key={match.id} disablePadding>
				<Match match={match} picks={picks} setPicks={setPicks} />
			</ListItem>
		);
	}

	return createMatchesElement();
}

type MatchesProps = {
	matches: ApiMatch[];
	picks: MatchPicks;
	setPicks: React.Dispatch<React.SetStateAction<MatchPicks>>;
};
