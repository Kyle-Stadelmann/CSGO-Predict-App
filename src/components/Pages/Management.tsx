// this page is just gonna hold a Tournament
// the only special stuff it's gonna have is a dropdown for selecting tournaments
// and then like the title of the tournament off to the right
// it'll have a header containing the above information then the tournament below the header
import { getLeagueById, League } from "csgo-predict-api";
import { useEffect, useState } from "react";
import Tournament from "./Tournament";
import { DEFAULT_LEAGUE_ID } from "../../constant";
import { USER_SESSION_STORAGE_KEY } from "../../lib/user-util";
import { ToggleButton } from "@mui/material";

const Management = () => {
    const [ league, setLeague ] = useState({} as League);
	const [ topEightBool, setTopEightBool ] = useState(false);
	
	const handlePress = () => {
		setTopEightBool(toggleTopEight(topEightBool));
	}

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

	if (!league.daysMap) {
		return <div>Loading...</div>;
	}

	// styling this ToggleButton is a whole adventure on its own, leaving for now
	return (
		<div className="management">
			<h1>Management Page</h1>
			{/* tournament selector goes here */}
			<ToggleButton
				className="top-eight-toggle-button"
				sx={{
					"& .MuiTouchRipple-root": {
						backgroundColor: "#f5f5f5",
						opacity: 0.6,
					},
					color: "#FFFFFF",
				}}
				value="Top Eight"
				selected={topEightBool}
				onChange={handlePress}
			>
				Toggle Top Eight
			</ToggleButton>
			<Tournament league={league} topEightBool={topEightBool} />
		</div>
	);
};

function toggleTopEight(topEightBool: boolean) {
	return !topEightBool;
}

export default Management;
