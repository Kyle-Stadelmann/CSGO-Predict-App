import { Team } from "csgo-predict-api";
import React from "react";
import { useDrag } from "react-dnd";
import TopEightTeamInfo from "./TopEightTeamInfo";

// TODO: generate type as `TEAM${teamInfo.rank}` if bucket solution works
const TopEightTeam = ({ teamInfo }: TopEightTeamProps) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: `TEAM`,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
		item: teamInfo,
	}));

	return (
		<div
			className="top-eight-team"
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: "move",
			}}
		>
			<TopEightTeamInfo teamInfo={teamInfo} />
		</div>
	);
};

type TopEightTeamProps = {
	teamInfo: Team;
};

export default TopEightTeam;
