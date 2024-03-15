import { Team } from 'csgo-predict-api';
import React, { useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import TopEightTeam from './TopEightTeam';

// if you make the buckets and teams the same size then you can just show one or the other
const TopEightPicksBucket = ({ x, y, team, teamInfo, moveTeam }: TopEightPicksBucketProps) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TEAM',
        drop: (item, monitor: DropTargetMonitor<Team>) => {
            moveTeam(x, y, monitor.getItem().id)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [x, y])

    // if team, return team
    // if no team
    //   if listBucket, render team with less opacity
    //   if !listBucket, render empty picks bucket
    if (team.props.teamInfo.id !== -1) return team;

    // These buckets should be (empty yet full size) when no teamInfo
    return (x === 1 ? 
        <div
            className="top-eight-bucket picks"
            ref={drop}
        >
            <TopEightTeam teamInfo={teamInfo} />
        </div>
        :
        <div
            className="top-eight-bucket"
            ref={drop}
        >
            TEAM BUCKET
            {` no team lool`}
        </div>
    );
}

type TopEightPicksBucketProps = {
    x?: number,
    y?: number,
    team: JSX.Element;
    teamInfo: Team;
    moveTeam: Function;
}

export default TopEightPicksBucket;