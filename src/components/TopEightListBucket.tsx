import { Team } from 'csgo-predict-api';
import React, { useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import TopEightTeam from './TopEightTeam';

const TopEightListBucket = ({ x, y, team, teamInfo, moveTeam }: TopEightListBucketProps) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TEAM',
        drop: (item, monitor: DropTargetMonitor<Team>) => {
            moveTeam(x, y, monitor.getItem().id)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [x, y]);

    // Dummy team, so display faded team info
    if (team.props.teamInfo.id !== -1) {
        return (
            <div
                className="top-eight-bucket"
                ref={drop}
            >
                <TopEightTeam teamInfo={teamInfo} />
            </div>
        );
    };

    // Actual team, so display unfaded team info with dragability
    return (
        <div
            className="top-eight-bucket dummy"
            ref={drop}
        >
            {team}
        </div>
    );
}

type TopEightListBucketProps = {
    x?: number,
    y?: number,
    team: JSX.Element;
    teamInfo: Team;
    moveTeam: Function;
}

export default TopEightListBucket;