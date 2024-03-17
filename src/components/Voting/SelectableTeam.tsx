import { Team } from "csgo-predict-api";
import { MouseEventHandler } from "react";

export default function SelectableTeam({ team, onClick, pickedTeam, isRightSide }: SelectableTeamProps) {
	const opacity = pickedTeam && pickedTeam.id !== team.id ? 0.2 : undefined;
	const justifyContent = isRightSide ? "right" : undefined;
	const imgStyle = isRightSide ? { paddingLeft: "10px" } : { paddingRight: "10px" };

	return (
		<div
			className="team-container"
			style={{ cursor: "pointer", opacity: opacity, justifyContent: justifyContent }}
			onClick={onClick}
		>
			{isRightSide ? <h3>{team.name}</h3> : <></>}
			<img src={team.logo_url} alt="Missing Logo" style={{ ...imgStyle, width: "25%" }} />
			{isRightSide ? <></> : <h3>{team.name}</h3>}
		</div>
	);
}

type SelectableTeamProps = {
	team: Team;
	onClick: MouseEventHandler<HTMLImageElement>;
	pickedTeam?: Team;
	isRightSide: boolean;
};
