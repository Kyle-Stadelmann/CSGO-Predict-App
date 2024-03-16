import { getCurrentDayMatches, Match as ApiMatch } from "csgo-predict-api";
import { useEffect } from "react";
import { DEFAULT_LEAGUE_ID } from "../../constant";
import Match from "./Match";
import { USER_SESSION_STORAGE_KEY } from "../../lib/user-util";
import { MatchPicks } from "../Pages/Voting";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";

export default function Matches({ matches, setMatches, picks, setPicks }: MatchesProps) {
	useEffect(() => {
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

		fetchMatches();
	}, [setMatches]);

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
	setMatches: Function;
	picks: MatchPicks;
	setPicks: Function;
};
