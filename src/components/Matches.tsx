import { getCurrentDayMatches, Match as ApiMatch } from "csgo-predict-api";
import { useEffect } from "react";
import { DEFAULT_LEAGUE_ID } from "../constant";
import Match from "./Match";
import { USER_SESSION_STORAGE_KEY } from "./Pages/lib/user-util";
import { MatchPicks } from "./Pages/Voting";

const Matches = ({ matches, setMatches, picks, setPicks }: MatchesProps) => {
	useEffect(() => {
		fetchMatches();
	}, []);

	async function fetchMatches() {
		try {
			setMatches(await getCurrentDayMatches(DEFAULT_LEAGUE_ID));
		} catch (e) {
			// To have loaded this component, the user must have already authenticated with the backend.
			// This error typically occurs when the authed session is lost in the backend for whatever reason.
			// To account for this mismatch, restart the auth process
			sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
			window.location.href = "/";
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
			<div style={{backgroundColor: "whitesmoke", opacity: "0.6"}}>
				<Match match={match} picks={picks} setPicks={setPicks}/>
			</div>
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
