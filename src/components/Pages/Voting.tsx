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
	MatchResult,
	getResultsFromDay,
} from "csgo-predict-api";
import { DEFAULT_LEAGUE_ID } from "../../constant";
import DaySelect from "../DaySelect";

// Match id -> Picked team Id
export interface MatchPicks {
	[match_id: Id]: Id;
}

export default function Voting({ league }: VotingProps) {
	const [upcomingMatches, setUpcomingMatches] = useState([] as ApiMatch[]);
	const [picks, setPicks] = useState({} as MatchPicks);
	const [predSubmissionHeader, setPredSubmissionHeader] = useState(<></>);

	const days = getDaysList(upcomingMatches);
	const maxDay = Math.max(...days);
	const [votingDay, setVotingDay] = useState(maxDay);

	const [results, setResults] = useState([] as MatchResult[]);

	const date = new Date();
	const isActiveVoting =
		upcomingMatches.length > 0 &&
		votingDay === upcomingMatches[0].day &&
		upcomingMatches.some((m) => m.date > date);

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

	function getPredictionsList(): Prediction[] {
		const predictions = upcomingMatches.flatMap((match) => {
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

	function tryCreateSubmitBtn(): JSX.Element {
		if (isActiveVoting) {
			return (
				<div>
					<button type="button" className="submit-predictions-btn" onClick={submitPredictions}>
						Submit Predictions!
					</button>
					{predSubmissionHeader}
				</div>
			);
		} else {
			return <div></div>;
		}
	}

	function createSubmittedHeader(str: string, success: boolean): JSX.Element {
		return (
			<h2 className="submit-predictions-str" style={{ color: success ? "green" : "red" }}>
				{str}
			</h2>
		);
	}

	useEffect(() => {
		fetchMatches();
		initPicks();
	}, []);

	useEffect(() => {
		// Voting day needs to be udpated after upcoming matches are fetched
		// in order to default to the upcoming matches page
		setVotingDay(maxDay);
	}, [maxDay]);

	// TODO: Reduce the number of times we fetchResults
	useEffect(() => {
		if (!isActiveVoting || maxDay !== votingDay) fetchResults(votingDay);
	}, [isActiveVoting, maxDay, votingDay]);

	return (
		<div className="voting-window">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h1>Voting {isActiveVoting ? "" : "History"}</h1>
				<DaySelect day={votingDay} setDay={setVotingDay} days={days} maxDay={maxDay} />
			</div>
			<Matches
				matches={isActiveVoting ? upcomingMatches : results}
				picks={picks}
				setPicks={setPicks}
				isActiveVoting={isActiveVoting}
			/>
			{tryCreateSubmitBtn()}
		</div>
	);
}

type VotingProps = {
	league: League;
};
