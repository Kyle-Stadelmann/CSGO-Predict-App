import { useEffect, useState } from "react";
import { USER_SESSION_STORAGE_KEY, getStoredUser } from "../../lib/user-util";
import PredictionMatches from "./Prediction/PredictionMatches";
import {
	DayPredictions,
	Prediction as ApiPrediction,
	submitDayPredictions,
	Match,
	Id,
	getDayPredictions,
	League,
	getCurrentDayMatches,
	MatchResult,
	getResultsFromDay,
	UserLeagueDayResults,
} from "csgo-predict-api";
import { DEFAULT_LEAGUE_ID } from "../../constant";
import DaySelect from "./Common/DaySelect";
import HistoryMatches from "./PredictionHistory/HistoryMatches";

// Match id -> Picked team Id
export interface MatchPicks {
	[match_id: Id]: Id;
}

export default function Prediction({ league }: PredictionProps) {
	const [upcomingMatches, setUpcomingMatches] = useState([] as Match[]);
	const [picks, setPicks] = useState({} as MatchPicks);
	const [predSubmissionHeader, setPredSubmissionHeader] = useState(<></>);

	// TODO: why are days strings and not numbers ....
	const days = [...league.daysMap.keys()].sort((a, b) => +a - +b).reverse();
	const maxDay = Math.max(...days);
	const [predDay, setPredDay] = useState(maxDay);

	const [results, setResults] = useState([] as MatchResult[]);

	const isActivePredicting =
		upcomingMatches.length > 0 &&
		predDay === upcomingMatches[0].day &&
		upcomingMatches.some((m) => m.date > new Date());

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

		if (dayPreds.predictions.length === 0) {
			setPredSubmissionHeader(createSubmittedHeader("No predictions selected!", false));
		} else {
			try {
				await submitDayPredictions(dayPreds);
				setPredSubmissionHeader(createSubmittedHeader("Successfully submitted predictions!", true));
			} catch (e) {
				setPredSubmissionHeader(
					createSubmittedHeader(
						"Couldn't submit predictions. Perhaps a selected match has already started?",
						false
					)
				);
			}
		}
	}

	function getPredictionsList(): ApiPrediction[] {
		const predictions = upcomingMatches.flatMap((match) => {
			if (!picks[match.id]) {
				// No team picked, so we don't submit a prediction
				return [];
			}
			const prediction: ApiPrediction = {
				matchId: match.id,
				choiceTeamId: picks[match.id],
			};
			return prediction;
		});

		return predictions;
	}

	async function fetchMatches() {
		try {
			setUpcomingMatches(await getCurrentDayMatches(DEFAULT_LEAGUE_ID));
		} catch (e) {
			// To have loaded this component, the user must have already authenticated with the backend.
			// This error typically occurs when the authed session is lost in the backend for whatever reason.
			// To account for this mismatch, restart the auth process
			sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
			window.location.href = "/";
		}
	}

	async function fetchResults(day: number) {
		try {
			setResults(await getResultsFromDay(DEFAULT_LEAGUE_ID, day));
		} catch (e) {
			console.error(e);
			setResults([]);
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

	function createSubmittedHeader(str: string, success: boolean): JSX.Element {
		return (
			<h2 className="submit-predictions-str" style={{ color: success ? "green" : "red" }}>
				{str}
			</h2>
		);
	}

	function getUserResults(): UserLeagueDayResults[] {
		const ld = league.daysMap.get(predDay);
		if (!ld || ld.userScores.size === 0) {
			return [];
		}
		return [...ld.userScores.values()];
	}

	useEffect(() => {
		fetchMatches();
		initPicks();
	}, []);

	// TODO: Reduce the number of times we fetchResults
	useEffect(() => {
		if (!isActivePredicting || maxDay !== predDay) fetchResults(predDay);
	}, [isActivePredicting, maxDay, predDay]);

	return (
		<div className="prediction-window">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h1>Prediction {isActivePredicting ? "" : "History"}</h1>
				<DaySelect day={predDay} setDay={setPredDay} days={days} maxDay={maxDay} />
			</div>
			{isActivePredicting ? (
				<div>
					<PredictionMatches matches={upcomingMatches} picks={picks} setPicks={setPicks} />
					<button type="button" className="submit-predictions-btn" onClick={submitPredictions}>
						Submit Predictions!
					</button>
					{predSubmissionHeader}
				</div>
			) : (
				<HistoryMatches matches={results} userResults={getUserResults()} />
			)}
		</div>
	);
}

type PredictionProps = {
	league: League;
};
