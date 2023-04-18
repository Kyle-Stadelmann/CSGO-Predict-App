import Players from "../Players";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { League } from "csgo-predict-api";
import { useState } from "react";
import { Option } from "react-dropdown";

const Leaderboard = ({league}: LeaderboardProps) => {
    // TODO: make sure league is initialized before continuing past this point
    
    const [leaderboardDay, setLeaderboardDay] = useState(Math.max(...league.daysMap.keys()));
    
    // idk if this will be used
    const [leaderboardDays, setLeaderboardDays] = useState([...league?.daysMap.keys()]);

    const buildDropdownOptions = (league: League): Option[] => {
        let returnOptions: Option[] = [];
        [...league.daysMap.keys()].slice().reverse().map(String).forEach((dayString) => {
            let option: Option = {
                value: dayString,
                label: `Day ${dayString}`,
            }
            returnOptions.push(option);
        })

        return returnOptions;
    }

	return (
		<div className="leaderboard-window">
			<br />
			<h2>Leaderboard</h2>
            {/* value is just the default value that shows, the meat is in options and onChange */}
            <Dropdown
                options={buildDropdownOptions(league)}
                onChange={(currentOption: Option) => setLeaderboardDay(Number(currentOption.value))}
                value={leaderboardDay.toString()}
            />
			<Players league={league} day={leaderboardDay} />
		</div>
	);
};

type LeaderboardProps = {
    league: League;
}

export default Leaderboard;
