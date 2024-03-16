import { Team } from "csgo-predict-api";
import React, { useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import TopEightTeamInfo from "./TopEightTeamInfo";

// TODO: css needs to be wildly improved
// TODO: append ${teamInfo.rank} to the end of `TEAM` in accept
//       if it's possible for the PicksBuckets to accept any `TEAM${#}`
const TopEightListBucket = ({ x, y, team, teamInfo, moveTeam }: TopEightListBucketProps) => {
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: `TEAM`,
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
			<div className="top-eight-bucket dummy" ref={drop}>
				<TopEightTeamInfo teamInfo={teamInfo} />
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
	teamInfo: Team;
	moveTeam: Function;
};

export default TopEightListBucket;
