import { getCurrentDayMatches, Match as ApiMatch } from "csgo-predict-api";
import { useEffect } from "react";
import { DEFAULT_LEAGUE_ID } from "../constant";
import Match from "./Match";
import { USER_SESSION_STORAGE_KEY } from "./Pages/lib/user-util";
import { MatchPicks } from "./Pages/Voting";

const Matches = ({ matches, setMatches, picks, setPicks }: MatchesProps) => {
	useEffect(() => {
		fetchMatches();
        // it doesn't like something about the fetchMatches not being a dependency
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
			<div className="match-window">
				{/* seems like this line throws a warning, duplicate keys? */}
				{matches.map((m) => createMatchElement(m))}
			</div>
		);
	}

	function createMatchElement(match: ApiMatch): JSX.Element {
		return (
            // i moved the style (background color, opacity) to the match css
            // This message will self-destruct in 5 seconds.
            // (delete these comments when you read this)
			<Match match={match} picks={picks} setPicks={setPicks} />
		);
	}

    // this was returning a div with createMatchesElement inside, but seemed unnecessary
    // if that level of control is needed feel free to add it back
	return createMatchesElement();
};

type MatchesProps = {
	matches: ApiMatch[];
	setMatches: Function;
	picks: MatchPicks;
	setPicks: Function;
};

export default Matches;
