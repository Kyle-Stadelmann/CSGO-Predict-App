import LeaderboardList from "../Leaderboard/LeaderboardList";
import { League, LeagueDay } from "csgo-predict-api";
import { useState } from "react";
import DaySelect from "../DaySelect";

export default function Leaderboard({ league }: LeaderboardProps) {
	// TODO: why are days strings and not numbers ....
	const days = [...league.daysMap.keys()].sort((a, b) => +a - +b).reverse();
	const maxDay = Math.max(...days);
	const [leaderboardDay, setLeaderboardDay] = useState(maxDay);

	return (
		<div className="leaderboard-window">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h1>Leaderboard</h1>
				<DaySelect day={leaderboardDay} setDay={setLeaderboardDay} days={days} maxDay={maxDay} />
			</div>
			<LeaderboardList league={league} day={leaderboardDay} />
		</div>
	);
}

type LeaderboardProps = {
	league: League;
};
