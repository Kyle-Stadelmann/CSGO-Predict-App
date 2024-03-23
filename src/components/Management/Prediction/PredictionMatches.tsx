import { Match } from "csgo-predict-api";
import PredictionMatch from "./PredictionMatch";
import { MatchPicks } from "../Prediction";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";

export default function PredictionMatches({ matches, picks, setPicks }: PredictionMatchesProps) {
	function createMatchesElement(): JSX.Element {
		return (
			<List className="match-list" disablePadding>
				{matches.map((m) => createMatchElement(m))}
			</List>
		);
	}

	function createMatchElement(match: Match): JSX.Element {
		return (
			<ListItem key={match.id} disablePadding>
				<PredictionMatch match={match} picks={picks} setPicks={setPicks} />
			</ListItem>
		);
	}

	return createMatchesElement();
}

type PredictionMatchesProps = {
	matches: Match[];
	picks: MatchPicks;
	setPicks: React.Dispatch<React.SetStateAction<MatchPicks>>;
};
