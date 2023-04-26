import Players from "../Players";
import { League } from "csgo-predict-api";
import { useState } from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const Leaderboard = ({league}: LeaderboardProps) => {  
    const [leaderboardDay, setLeaderboardDay] = useState(Math.max(...league.daysMap.keys()));
    const [leaderboardDays, setLeaderboardDays] = useState([...league?.daysMap.keys()]);

    // ChatGPT gave me this but I feel like it's kinda a cheaty way to make it work lol
    const handleChange = (event: SelectChangeEvent<number>) => {
        const currentDay = event.target.value as number;
        setLeaderboardDay(currentDay);
    }

    // not really sure how to change the border of the Select
	return (
		<div className="leaderboard-window">
			<br />
			<h2>Leaderboard</h2>
            <FormControl fullWidth>
                <Select
                    id="leaderboard-day-select"
                    className="leaderboard-day-select"
                    value={leaderboardDay}
                    onChange={handleChange}
                >
                    {leaderboardDays.reverse().map((day) => (
                        <MenuItem key={day} value={day}>
                            Day {day}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
			<Players league={league} day={leaderboardDay} />
		</div>
	);
};

type LeaderboardProps = {
    league: League;
}

export default Leaderboard;
