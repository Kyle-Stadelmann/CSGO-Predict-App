import { MatchResult, Team, UserLeagueDayResults } from "csgo-predict-api";
import UserAvatar from "../../UserAvatar";
import Grid from "@mui/system/Unstable_Grid";
import CheckIcon from "@mui/icons-material/Check";

export default function HistoryTeamCard({ match, team, isRightSide, userResults }: HistoryTeamCardProps) {
	const paddingStyle = isRightSide ? { paddingLeft: "10px" } : { paddingRight: "10px" };

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				width: "400px",
				flexDirection: isRightSide ? "row-reverse" : undefined,
			}}
		>
			<div className="team-container" style={{ flexDirection: isRightSide ? "row-reverse" : undefined }}>
				<img src={team.logo_url} alt="Missing Logo" style={{ ...paddingStyle, width: "100px" }} />
				<h3 style={{ ...paddingStyle, flexGrow: 1, textAlign: isRightSide ? "right" : "left" }}>{team.name}</h3>
				<Grid
					container
					spacing={0.5}
					sx={{
						maxHeight: "100px",
						maxWidth: "150px",
						overflow: "auto",
						justifyContent: isRightSide ? "left" : "right",
					}}
				>
					{userResults.flatMap((userResult) => {
						if (userResult.predictions.get(match.id)?.predictionTeamId !== team.id) return [];
						return (
							<Grid key={userResult.user.id}>
								<UserAvatar user={userResult.user} />
							</Grid>
						);
					})}
				</Grid>
			</div>
			{match.winner === team.id ? <CheckIcon sx={{ color: "green" }}></CheckIcon> : <></>}
		</div>
	);
}

type HistoryTeamCardProps = {
	match: MatchResult;
	team: Team;
	isRightSide: boolean;
	userResults: UserLeagueDayResults[];
};
