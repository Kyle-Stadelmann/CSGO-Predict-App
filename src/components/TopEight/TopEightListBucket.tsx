import { Team } from "csgo-predict-api";
import { DropTargetMonitor, useDrop } from "react-dnd";
import TopEightTeamInfo from "./TopEightTeamInfo";

// TODO: css needs to be wildly improved
const TopEightListBucket = ({ x, y, team, bucketInfo, moveTeam }: TopEightListBucketProps) => {
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: bucketInfo.id.toString(),
			drop: (item, monitor: DropTargetMonitor<Team>) => {
				moveTeam(x, y, monitor.getItem().id);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[x, y]
	);

	// No team so show bucketInfo
	if (!team) {
		return (
			<div className="top-eight-bucket empty" ref={drop}>
				<TopEightTeamInfo teamInfo={bucketInfo} />
			</div>
		);
	}

	// Actual team, so display unfaded team info with dragability
	return (
		<div className="top-eight-bucket" ref={drop}>
			{team}
		</div>
	);
};

type TopEightListBucketProps = {
	x?: number;
	y?: number;
	team?: JSX.Element | undefined;
	bucketInfo: Team;
	moveTeam: Function;
};

export default TopEightListBucket;
