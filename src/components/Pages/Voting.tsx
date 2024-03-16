import { useEffect, useState } from "react";
import { USER_SESSION_STORAGE_KEY, getStoredUser } from "../../lib/user-util";
import Matches from "../Voting/Matches";
import {
	DayPredictions,
	Prediction,
	submitDayPredictions,
	Match as ApiMatch,
	Id,
	getDayPredictions,
	League,
	getCurrentDayMatches,
	Match,
} from "csgo-predict-api";
import { DEFAULT_LEAGUE_ID } from "../../constant";
import DaySelect from "../DaySelect";

// Match id -> Picked team Id
export interface MatchPicks {
	[match_id: Id]: Id;
}

export default function Voting({ league }: VotingProps) {
	const [matches, setMatches] = useState([] as ApiMatch[]);
	const [picks, setPicks] = useState({} as MatchPicks);
	const [predsSubmittedStr, setPredsSubmittedStr] = useState("");

	const days = getDaysList(matches);
	const maxDay = Math.max(...days);
	const [votingDay, setVotingDay] = useState(maxDay);

	function getDaysList(matches: Match[]): number[] {
		const days = new Set(league.daysMap.keys());
		if (matches.length > 0) days.add(matches[0].day);
		return [...days].reverse();
	}

	async function submitPredictions() {
		const user = getStoredUser();
		if (!user) {
			// No authed user do nothing for now
			return;
		}

		const dayPreds: DayPredictions = {
			userId: user.id,
			date: new Date(),
			leagueId: DEFAULT_LEAGUE_ID,
			predictions: getPredictionsList(),
		};

		try {
			await submitDayPredictions(dayPreds);
			setPredsSubmittedStr("Successfully submitted predictions!");
		} catch (e) {
			setPredsSubmittedStr("Error submitting predictions. Perhaps a selected match has already started.");
		}
	}

	function getPredictionsList(): Prediction[] {
		const predictions = matches.flatMap((match) => {
			if (!picks[match.id]) {
				// No team picked, so we don't submit a prediction
				return [];
			}
			const prediction: Prediction = {
				matchId: match.id,
				choiceTeamId: picks[match.id],
			};
			return prediction;
		});

		return predictions;
	}

	async function fetchMatchesAndVotingDay() {
		try {
			const matches = await getCurrentDayMatches(DEFAULT_LEAGUE_ID);
			setMatches(matches);

			// Voting day needs to be udpated after upcoming matches are fetched
			// in order to default to the upcoming matches page
			setVotingDay(Math.max(...getDaysList(matches)));
		} catch (e) {
			// To have loaded this component, the user must have already authenticated with the backend.
			// This error typically occurs when the authed session is lost in the backend for whatever reason.
			// To account for this mismatch, restart the auth process
			sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
			window.location.href = "/";
		}
	}

	async function initPicks() {
		const userId = getStoredUser()?.id;
		if (!userId) return;

		let dayPreds: DayPredictions | undefined;
		try {
			dayPreds = await getDayPredictions(userId, DEFAULT_LEAGUE_ID);
		} catch (e) {
			console.error(e);
		}

		if (dayPreds) {
			const initPicks: MatchPicks = {};
			dayPreds.predictions.forEach((p) => {
				initPicks[p.matchId] = p.choiceTeamId;
			});
			setPicks(initPicks);
		}
	}

	useEffect(() => {
		fetchMatchesAndVotingDay();

		initPicks();
	}, []);

	return (
		<div className="voting-window">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h1>Voting</h1>
				<DaySelect day={votingDay} setDay={setVotingDay} days={days} maxDay={maxDay} />
			</div>
			<Matches matches={matches} picks={picks} setPicks={setPicks} />
			<button type="button" className="submit-predictions-btn" onClick={submitPredictions}>
				Submit Predictions!
			</button>
			<h2>{predsSubmittedStr}</h2>
		</div>
	);
}

type VotingProps = {
	league: League;
};
