import { Team } from "csgo-predict-api";

export default function HistoryTeamCard({ team, pickedTeam, isRightSide }: HistoryTeamCardProps) {
	const opacity = pickedTeam && pickedTeam.id !== team.id ? 0.2 : undefined;
	const justifyContent = isRightSide ? "right" : undefined;
	const imgStyle = isRightSide ? { paddingLeft: "10px" } : { paddingRight: "10px" };

	return (
		<div className="history-team-container" style={{ opacity: opacity, justifyContent: justifyContent }}>
			{isRightSide ? <h3>{team.name}</h3> : <></>}
			<img src={team.logo_url} alt="Missing Logo" style={{ ...imgStyle, width: "45%" }} />
			{isRightSide ? <></> : <h3>{team.name}</h3>}
		</div>
	);
}

type HistoryTeamCardProps = {
	team: Team;
	pickedTeam?: Team;
	isRightSide: boolean;
};
