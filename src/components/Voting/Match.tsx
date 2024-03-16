// TODO: add a submitted status indicator at the right side
import { Match as ApiMatch, Team as ApiTeam } from "csgo-predict-api";
import { MatchPicks } from "../Pages/Voting";
import Team from "./Team";

type MatchProps = {
	match: ApiMatch;
	picks: MatchPicks;
	setPicks: Function;
};

const Match = ({ match, picks, setPicks }: MatchProps) => {
	const team1 = match.team1;
	const team2 = match.team2;
	const pickedTeam = getPickedTeam();

	function getPickedTeam(): ApiTeam | undefined {
		const pickedTeamId = picks[match.id];
		switch (pickedTeamId) {
			case team1.id:
				return team1;
			case team2.id:
				return team2;
			default:
				return;
		}
	}

	function handleTeam1Picked() {
		const tempPicks = { ...picks };
		tempPicks[match.id] = team1.id;
		setPicks(tempPicks);
	}

	function handleTeam2Picked() {
		const tempPicks = { ...picks };
		tempPicks[match.id] = team2.id;
		setPicks(tempPicks);
	}

	return (
		// TODO: make selected team have an outline or some sort of visual indication of choice
		// can possibly just get rid of "current picked team"
		<div className="match">
			{`${team1.name} vs. ${team2.name}`}
			&nbsp;
			<div className="team-container">
				{/* if you put a space the css can recognize just the first slice, p cool */}
				<div className="team left">
					<Team
						id={team1.id}
						name={team1.name}
						logoUrl={team1.logo_url}
						country={team1.country}
						rank={team1.rank}
						onClick={handleTeam1Picked}
					/>
				</div>
				<div className="team right">
					<Team
						id={team2.id}
						name={team2.name}
						logoUrl={team2.logo_url}
						country={team2.country}
						rank={team2.rank}
						onClick={handleTeam2Picked}
					/>
				</div>
			</div>
			&nbsp;
			{`Currently picked team: ${pickedTeam?.name ?? "N/A"}`}
		</div>
	);
};

export default Match;
