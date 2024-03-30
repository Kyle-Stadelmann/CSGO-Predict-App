import { getLeagueById, League } from "csgo-predict-api";
import { useEffect, useState } from "react";
import Tournament from "../Management/Tournament";
import { DEFAULT_LEAGUE_ID } from "../../constant";
import { USER_SESSION_STORAGE_KEY } from "../../lib/user-util";
import { ToggleButton } from "@mui/material";

const Management = () => {
	const [league, setLeague] = useState({} as League);
	const [topEightBool, setTopEightBool] = useState(false);

	const handlePress = () => {
		setTopEightBool(!topEightBool);
	};

	useEffect(() => {
		async function getLeague() {
			try {
				setLeague(await getLeagueById(DEFAULT_LEAGUE_ID));
			} catch (e) {
				sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
				window.location.href = "/";
			}
		}

		getLeague().catch((e) => console.error(e));
	}, []);

	if (!league.daysMap) {
		return <div>Loading...</div>;
	}

	return (
		<div className="management">
			<h1 style={{padding: 10}}>{league.tournamentName}</h1>
			{
				(league.settings.allowPlayoffPredictions)
					? 				
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
					: <></>
			}
			<Tournament league={league} topEightBool={topEightBool} />
		</div>
	);
};

export default Management;
