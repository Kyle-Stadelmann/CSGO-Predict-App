import Players from "../Leaderboard/Players";
import { League } from "csgo-predict-api";
import { useState } from "react";
import DaySelect from "../Leaderboard/DaySelect";

export default function Leaderboard({ league }: LeaderboardProps) {
	const days = [...league.daysMap.keys()].reverse();
	const [leaderboardDay, setLeaderboardDay] = useState(Math.max(...days));

	// not really sure how to change the border of the Select
	return (
		<div className="leaderboard-window">
			<br />
			<h2>Leaderboard</h2>
			<DaySelect day={leaderboardDay} setDay={setLeaderboardDay} days={days} />
			<Players league={league} day={leaderboardDay} />
		</div>
	);
}

type LeaderboardProps = {
	league: League;
};
