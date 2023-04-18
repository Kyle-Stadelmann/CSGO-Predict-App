import { getCurrentDayMatches, Match as ApiMatch } from "csgo-predict-api";
import { useEffect } from "react";
import { DEFAULT_LEAGUE_ID } from "../constant";
import Match from "./Match";
import { USER_SESSION_STORAGE_KEY } from "../lib/user-util";
import { MatchPicks } from "./Pages/Voting";

const Matches = ({ matches, setMatches, picks, setPicks }: MatchesProps) => {
	useEffect(() => {
		async function fetchMatches() {
			try {
				//setMatches(await getCurrentDayMatches(DEFAULT_LEAGUE_ID));
			} catch (e) {
				// To have loaded this component, the user must have already authenticated with the backend.
				// This error typically occurs when the authed session is lost in the backend for whatever reason.
				// To account for this mismatch, restart the auth process
				sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
				window.location.href = "/";
			}
		}

		fetchMatches();
	}, [setMatches]);

	function createMatchesElement(): JSX.Element {
		return (
			<div className="match-window">
				{/* seems like this line throws a warning, duplicate keys? */}
				{matches.map((m) => createMatchElement(m))}
			</div>
		);
	}

	function createMatchElement(match: ApiMatch): JSX.Element {
		return <Match match={match} picks={picks} setPicks={setPicks} />;
	}

	return createMatchesElement();
};

type MatchesProps = {
	matches: ApiMatch[];
	setMatches: Function;
	picks: MatchPicks;
	setPicks: Function;
};

export default Matches;
