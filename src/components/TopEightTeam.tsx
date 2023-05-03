import { Team } from 'csgo-predict-api';
import React from 'react';
import { useDrag } from 'react-dnd';

const TopEightTeam = ({ teamInfo }: TopEightTeamProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TEAM',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        item: teamInfo
    }))

    return (
        <div 
            className="top-eight-team"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <div className="top-eight-team-info">
                {`#${teamInfo.rank}`}
                <img
                    className="top-eight-team-logo"
                    src={teamInfo.logo_url}
                />
                {`${teamInfo.name}`}
            </div>
        </div>
    )
}

type TopEightTeamProps = {
    teamInfo: Team;
}

export default TopEightTeam;