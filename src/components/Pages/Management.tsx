// this page is just gonna hold a Tournament
// the only special stuff it's gonna have is a dropdown for selecting tournaments
// and then like the title of the tournament off to the right
// it'll have a header containing the above information then the tournament below the header
import { getLeagueById, League } from "csgo-predict-api";
import { useEffect, useState } from "react";
import Tournament from "./Tournament";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { DEFAULT_LEAGUE_ID } from "../../constant";
import { USER_SESSION_STORAGE_KEY } from "../../lib/user-util";

const Management = () => {
    const [league, setLeague] = useState({} as League);

    useEffect(() => {
        async function getLeague() {
			try {
                const initLeague = await getLeagueById(DEFAULT_LEAGUE_ID);
				setLeague(initLeague);
			} catch (e) {
				sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
				window.location.href = "/";
			}
        }

        getLeague();
    }, []);

	return (league.daysMap ?
		<div className="management">
			<h1>Management Page</h1>
            {/* <Dropdown options={["hi", "hi2"]} placeholder={"Tournament selector"} /> */}
			<Tournament league={league} />
		</div>
        : <div>Loading...</div>
	);
};

export default Management;
