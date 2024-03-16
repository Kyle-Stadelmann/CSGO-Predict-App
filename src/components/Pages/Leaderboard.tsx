import Players from "../Leaderboard/Players";
import { League } from "csgo-predict-api";
import { useState } from "react";
import DaySelect from "../Leaderboard/DaySelect";

export default function Leaderboard({ league }: LeaderboardProps) {
	const days = [...league.daysMap.keys()].reverse();
	const maxDay = Math.max(...days);
	const [leaderboardDay, setLeaderboardDay] = useState(maxDay);

	// not really sure how to change the border of the Select
	return (
		<div className="leaderboard-window">
			<br />
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h1>Leaderboard</h1>
				<DaySelect day={leaderboardDay} setDay={setLeaderboardDay} days={days} maxDay={maxDay} />
			</div>
			<Players league={league} day={leaderboardDay} />
		</div>
	);
}

type LeaderboardProps = {
	league: League;
};
