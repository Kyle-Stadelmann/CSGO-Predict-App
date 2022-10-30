import React, { MouseEventHandler } from 'react';

function defaultTeamOnClick() {
    console.log("onClick unimplemented");
}

const Team = ({ teamName, teamId, logoUrl, onClick }: TeamProps) => {
    return (
        <div>
            <img src={logoUrl} alt="img dne" className="match-pic" onClick={onClick} />
            <br />
            {teamName}
        </div>
    );
}

type TeamProps = {
	teamName?: string;
    teamId?: string;
    logoUrl?: string;
    // xd
	onClick?: MouseEventHandler<HTMLImageElement>;
}

Team.defaultProps = {
    teamName: "No Team Name",
    teamId: "No Team ID",
    logoUrl: "https://i.imgur.com/0SlPRxT.png",
    onClick: defaultTeamOnClick,
}

export default Team;