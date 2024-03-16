import { Team } from "csgo-predict-api";
import React from "react";
import { useDrag } from "react-dnd";

const TopEightTeam = ({ teamInfo }: TopEightTeamProps) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "TEAM",
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
		item: teamInfo,
	}));

	const dummy = teamInfo.id === -1;

	// the inner classes should maybe be their own components?
	return (
		<div
			className="top-eight-team"
			ref={dummy ? undefined : drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: dummy ? "" : "move",
			}}
		>
			<div className="top-eight-team-info">
				{`#${teamInfo.rank}`}
				<img className="top-eight-team-logo" src={teamInfo.logo_url} />
				{`${teamInfo.name}`}
			</div>
		</div>
	);
};

type TopEightTeamProps = {
	teamInfo: Team;
};

export default TopEightTeam;
