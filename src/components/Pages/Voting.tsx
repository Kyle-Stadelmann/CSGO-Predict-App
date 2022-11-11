// TODO: load all matches where both teams exist? update whenever a stage ends?
import { useEffect, useState } from "react";
import { getStoredUser } from "../../lib/user-util";
import Matches from "../Matches";
import {
	DayPredictions,
	Prediction,
	submitDayPredictions,
	Match as ApiMatch,
	Id,
	getDayPredictions,
} from "csgo-predict-api";
import { DEFAULT_LEAGUE_ID } from "../../constant";

// Match id -> Picked team Id
export interface MatchPicks {
	[match_id: Id]: Id;
}

const Voting = () => {
	// this will be necessary once we have more than one day
	const [currentDay, setDay] = useState(1);
	const [matches, setMatches] = useState([] as ApiMatch[]);
	const [picks, setPicks] = useState({} as MatchPicks);
	const [predsSubmittedStr, setPredsSubmittedStr] = useState("");

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
			setPredsSubmittedStr("Error submitting predictions. Perhaps the match has already started.");
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

	async function initPicks() {
		try {
			const userId = getStoredUser()?.id;
			if (!userId) return;
			const dayPreds = await getDayPredictions(userId, DEFAULT_LEAGUE_ID);
			const initPicks: MatchPicks = {};
			dayPreds.predictions.forEach((p) => {
				initPicks[p.matchId] = p.choiceTeamId;
			});
			setPicks(initPicks);
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		initPicks();
	}, []);

	return (
		<div className="voting-window">
			<br />
			<h2>Voting</h2>
			{/* event=import */}
			<Matches matches={matches} setMatches={setMatches} picks={picks} setPicks={setPicks} />
			<button type="button" className="submit-predictions-btn" onClick={submitPredictions}>
				Submit Predictions!
			</button>
			<h2>{predsSubmittedStr}</h2>
		</div>
	);
};

export default Voting;
