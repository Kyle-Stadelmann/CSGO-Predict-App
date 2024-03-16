import { Team } from "csgo-predict-api";
import React, { useState } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import TopEightTeam from "./TopEightTeam";

// TODO: css needs to be wildly improved
const TopEightPicksBucket = ({ x, y, team, moveTeam }: TopEightPicksBucketProps) => {
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

	// Render empty PicksBucket if no team or dummy team
	if (!team || team.props.teamInfo.id === -1) {
		return (
			<div className="top-eight-bucket" ref={drop}>
				TEAM BUCKET
				{` no team lool`}
			</div>
		);
	}

	// Render PicksBucket with team
	return (
		<div className="top-eight-bucket picks" ref={drop}>
			{team}
		</div>
	);
};

type TopEightPicksBucketProps = {
	x?: number;
	y?: number;
	team?: JSX.Element | undefined;
	moveTeam: Function;
};

export default TopEightPicksBucket;
