import { Team } from 'csgo-predict-api';
import React, { useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import TopEightTeam from './TopEightTeam';

// if you make the buckets and teams the same size then you can just show one or the other
const TopEightTeamBucket = ({ x, y, team, moveTeam }: TopEightTeamBucketProps) => {
    let testTeams: Team[] = [{
        id: 1,
        name: "Heroic",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Heroic_2023_logo.png",
        country: {
            name: "Denmark",
            code: "DN"
        },
        rank: 1,
    },
    {
        id: 2,
        name: "G2",
        logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Esports_organization_G2_Esports_logo.svg/1200px-Esports_organization_G2_Esports_logo.svg.png",
        country: {
            name: "International",
            code: "INT"
        },
        rank: 2
    }]

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

    return (x === 1 ? 
        <div
            className="top-eight-team-bucket list"
            ref={drop}
        >
            <TopEightTeam teamInfo={testTeams[0]} />
        </div>
        :
        <div
            className="top-eight-team-bucket"
            ref={drop}
        >
            TEAM BUCKET
            {` no team lool`}
        </div>
    );
}

type TopEightTeamBucketProps = {
    x?: number,
    y?: number,
    team: JSX.Element;
    moveTeam: Function;
}

export default TopEightTeamBucket;