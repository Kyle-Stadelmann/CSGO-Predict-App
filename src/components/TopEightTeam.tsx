import { Team } from 'csgo-predict-api';
import React from 'react';
import { useDrag } from 'react-dnd';

const TopEightTeam = ({ teamInfo, setTeamInBucket }: TopEightTeamProps) => {
    const [ { isDragging }, drag, dragPreview ] = useDrag(() => ({
        type: 'TEAM',
        item: { teamInfo },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end: () => setTeamInBucket(undefined)
    }));
    
    return (
        <div
            className="top-eight-team"
            ref={dragPreview}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div role="Handle" ref={drag}>
                {`#${teamInfo.rank}`}
                <img
                    className="top-eight-team-logo"
                    src={teamInfo.logo_url}
                />
                {`${teamInfo.name}`}
            </div>
        </div>
    );
}

type TopEightTeamProps = {
    teamInfo: Team;
    setTeamInBucket: React.Dispatch<React.SetStateAction<Team | undefined>>;
}

export default TopEightTeam;