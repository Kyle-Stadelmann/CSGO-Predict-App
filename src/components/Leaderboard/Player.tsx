import { League } from "csgo-predict-api";
import { useEffect, useState } from "react";
import Score from "../Score";
import getDayScore from "./Players";

type PlayerProps = {
	player: string;
	day: number;
	score: number;
	league: League;
};

// can copy implementation of match if you want to link player pics to player profiles
// (assuming we add profiles)
// TODO: make player the google User object (or w/e contains the relevant info)
//       rather than string of userId
const Player = ({ player, day, score, league }: PlayerProps) => {
	const [userDay, setUserDay] = useState(league.daysMap.get(day)?.userScores.get(player));

	useEffect(() => {
		setUserDay(league.daysMap.get(day)?.userScores.get(player));
	}, [day, league.daysMap, player]);

	return (
		<div className="player">
			<img src={"this should be link to player pic"} alt="NO_PICTURE" />
			&nbsp;
			{`Player: ${player}`}
			&nbsp;
			<Score
				day={day}
				userScore={score}
				totalScore={NaN}
				userDayScore={userDay?.dayScore ?? NaN}
				totalDayScore={NaN}
			/>
		</div>
	);
};

export default Player;
