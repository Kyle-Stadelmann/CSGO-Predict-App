import { User } from "csgo-predict-api";
import { Avatar } from "@mui/material";
import UserAvatar from "../UserAvatar";

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
			<div style={{ display: "flex", alignItems: "center" }}>
				<h2 style={{ paddingRight: 5 }}>{`#${placing}`}</h2>
				<UserAvatar user={user} style={{ paddingRight: 5 }} />
				<h2>{user.name}</h2>
			</div>
			<h2>{`+ ${dayScore}/${maxDayScore}`}</h2>
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
