import { Team } from "csgo-predict-api";
import React, { useState } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import TopEightTeam from "./TopEightTeam";

// TODO: css needs to be wildly improved
const TopEightListBucket = ({ x, y, team, teamInfo, moveTeam }: TopEightListBucketProps) => {
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: "TEAM",
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

	// no more dummies, the empty ListBucket itself has to show team info
	// which it has because we added bucketInfo
	if (team.props.teamInfo.id === -1) {
		return (
			<div className="top-eight-bucket dummy" ref={drop}>
				<TopEightTeam teamInfo={team.props.teamInfo} />
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
	team: JSX.Element;
	teamInfo: Team;
	moveTeam: Function;
};

export default TopEightListBucket;
