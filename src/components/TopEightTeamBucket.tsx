import { Team } from 'csgo-predict-api';
import React, { useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import TopEightTeam from './TopEightTeam';

const TopEightTeamBucket = ({ team }: TopEightTeamBucketProps) => {
    const [ teamInBucket, setTeamInBucket ] = useState(team);

    // we want to make the team prop of the new bucket = team and the old bucket = null
    const moveTeam = (dropResult: Team) => {
        setTeamInBucket(dropResult);
    }

    const [ { canDrop, isOver }, drop ] = useDrop(() => ({
        accept: 'TEAM',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: (item: { type: string, teamInfo: Team }) => {
            moveTeam(item.teamInfo);
        }
    }));
    
    return (
        <div 
            className="top-eight-team-bucket"
            ref={drop}
            role={'Dustbin'}
            style={{ backgroundColor: isOver ? 'red' : 'white' }}
        >
            TEAM BUCKET
            {` team is ${teamInBucket}`}
            {teamInBucket ? <TopEightTeam teamInfo={teamInBucket} setTeamInBucket={setTeamInBucket} /> : null}
        </div>
    );
}

type TopEightTeamBucketProps = {
    team?: Team;
}

export default TopEightTeamBucket;