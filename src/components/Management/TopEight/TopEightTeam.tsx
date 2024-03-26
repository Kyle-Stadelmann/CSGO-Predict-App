import { Team } from "csgo-predict-api";
import { useDrag } from "react-dnd";
import TopEightTeamInfo from "./TopEightTeamInfo";

const TopEightTeam = ({ teamInfo }: TopEightTeamProps) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: teamInfo.id.toString(),
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
