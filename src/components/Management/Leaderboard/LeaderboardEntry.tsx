import { User } from "csgo-predict-api";
import UserAvatar from "../../UserAvatar";

// can copy implementation of match if you want to link player pics to player profiles
// (assuming we add profiles)
// TODO: make player the google User object (or w/e contains the relevant info)
//       rather than string of userId
export default function LeaderboardEntry({
	user,
	placing,
	dayScore,
	maxDayScore,
	runningScore,
	maxRunningScore,
}: LeaderboardEntryProps) {
	return (
		<div className="leaderboard-entry">
			<h2 style={{ minWidth: "45px", paddingRight: "10px" }}>{`#${placing}`}</h2>
			<div style={{ display: "flex", alignItems: "center", minWidth: "100px", flexGrow: 1 }}>
				<UserAvatar user={user} style={{ paddingRight: 5 }} />
				<h2>{user.name}</h2>
			</div>
			<h2 style={{ minWidth: "125px" }}>{`+ ${dayScore}/${maxDayScore}`}</h2>
			<h2>{`+ ${runningScore}/${maxRunningScore}`}</h2>
		</div>
	);
}

type LeaderboardEntryProps = {
	user: User;
	placing: number;
	dayScore: string;
	maxDayScore: number;
	runningScore: number;
	maxRunningScore: number;
};
