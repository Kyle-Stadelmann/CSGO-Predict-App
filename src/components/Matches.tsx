import { getCurrentDayMatches, Match as ApiMatch } from "csgo-predict-api";
import { useEffect } from "react";
import { DEFAULT_LEAGUE_ID } from "../constant";
import Match from "./Match";
import { MatchPicks } from "./Pages/Voting";

const Matches = ({ matches, setMatches, picks, setPicks }: MatchesProps) => {
	useEffect(() => {
		fetchMatches();
	}, []);

	async function fetchMatches() {
		try {
			setMatches(await getCurrentDayMatches(DEFAULT_LEAGUE_ID));
		} catch (e) {
			console.log(e);
		}
	}

	function createMatchesElement(): JSX.Element {
		return (
			<div className="matches">
				{/* seems like this line throws a warning, duplicate keys? */}
				{matches.map((m) => createMatchElement(m))}
			</div>
		);
	}

	function createMatchElement(match: ApiMatch): JSX.Element {
		return (
			<>
				<Match match={match} picks={picks} setPicks={setPicks} />
				<br></br>
			</>
		);
	}

	return <div className="match-window">{createMatchesElement()}</div>;
};

type MatchesProps = {
	matches: ApiMatch[];
	setMatches: Function;
	picks: MatchPicks;
	setPicks: Function;
};

export default Matches;
