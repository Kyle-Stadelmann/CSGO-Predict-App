import { Divider, List, ListItem } from "@mui/material";
import { MatchResult, Team, UserLeagueDayResults } from "csgo-predict-api";
import UserAvatar from "../../UserAvatar";

export default function HistoryTeamCard({ match, team, isRightSide, userResults }: HistoryTeamCardProps) {
	const justifyContent = isRightSide ? "right" : undefined;
	const imgStyle = isRightSide ? { paddingLeft: "10px" } : { paddingRight: "10px" };

	return (
		<div className="history-team-container" style={{ justifyContent: justifyContent }}>
			{isRightSide ? <h3>{team.name}</h3> : <></>}
			<img src={team.logo_url} alt="Missing Logo" style={{ ...imgStyle, width: "45%" }} />
			{isRightSide ? <></> : <h3>{team.name}</h3>}
			<Divider orientation="vertical" flexItem />
			<List>
				{userResults.flatMap((userResult) => {
					if (userResult.predictions.get(match.id)?.predictionTeamId !== team.id) return [];
					return (
						<ListItem key={userResult.user.id}>
							<UserAvatar user={userResult.user} />
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}

type HistoryTeamCardProps = {
	match: MatchResult;
	team: Team;
	isRightSide: boolean;
	userResults: UserLeagueDayResults[];
};
