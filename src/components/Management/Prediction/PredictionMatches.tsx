import { Match as ApiMatch, MatchResult as ApiMatchResult } from "csgo-predict-api";
import PredictionMatch from "./PredictionMatch";
import { MatchPicks } from "../Prediction";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";

export default function Matches({ matches, picks, setPicks, isActiveVoting }: MatchesProps) {
	function createMatchesElement(): JSX.Element {
		return (
			<List className="match-list" disablePadding>
				{matches.map((m) => createMatchElement(m))}
			</List>
		);
	}

	function createMatchElement(match: ApiMatch | ApiMatchResult): JSX.Element {
		return (
			<ListItem key={match.id} disablePadding>
				<PredictionMatch match={match} picks={picks} setPicks={setPicks} />
			</ListItem>
		);
	}

	return createMatchesElement();
}

type MatchesProps = {
	matches: ApiMatch[] | ApiMatchResult[];
	picks: MatchPicks;
	setPicks: React.Dispatch<React.SetStateAction<MatchPicks>>;
	isActiveVoting: boolean;
};
