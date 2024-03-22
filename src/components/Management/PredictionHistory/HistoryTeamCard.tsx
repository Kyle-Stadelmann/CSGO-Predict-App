import { Divider } from "@mui/material";
import { MatchResult, Team, UserLeagueDayResults } from "csgo-predict-api";
import UserAvatar from "../../UserAvatar";
import Grid from "@mui/system/Unstable_Grid";

export default function HistoryTeamCard({ match, team, isRightSide, userResults }: HistoryTeamCardProps) {
	const imgStyle = isRightSide ? { paddingLeft: "10px" } : { paddingRight: "10px" };

	return (
		<div className="history-team-container" style={{ flexDirection: isRightSide ? "row-reverse" : undefined }}>
			<img src={team.logo_url} alt="Missing Logo" style={{ ...imgStyle, width: "100px" }} />
			<h3>{team.name}</h3>
			<Divider orientation="vertical" flexItem />
			<div className="history-users-preds">
				<Grid container spacing={1} sx={{ maxHeight: "100px", maxWidth: "200px", overflow: "auto" }}>
					{userResults.flatMap((userResult) => {
						if (userResult.predictions.get(match.id)?.predictionTeamId !== team.id) return [];
						return (
							<Grid>
								<UserAvatar user={userResult.user} />
							</Grid>
						);
					})}
				</Grid>
			</div>
		</div>
	);
}

type HistoryTeamCardProps = {
	match: MatchResult;
	team: Team;
	isRightSide: boolean;
	userResults: UserLeagueDayResults[];
};
