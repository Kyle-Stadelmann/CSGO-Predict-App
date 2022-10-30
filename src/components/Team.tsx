import { Country, Id } from 'csgo-predict-api';
import { MouseEventHandler } from 'react';

function defaultTeamOnClick() {
    console.log("onClick unimplemented");
}

const Team = ({ id, name, logoUrl, country, rank, onClick }: TeamProps) => {
    return (
        <div>
            <img src={logoUrl} alt="img dne" className="match-pic" onClick={onClick} />
            <br />
            {name}
        </div>
    );
}

type TeamProps = {
    id: Id;
	name: string;
    logoUrl?: string;
    country: Country;
    rank?: number;
    // xd
	onClick?: MouseEventHandler<HTMLImageElement>;
}

const defaultProps: TeamProps = {
    id: -1,
	name: "N/A",
    logoUrl: "https://i.imgur.com/0SlPRxT.png",
    country: {name: "No Country", code: "No code"},
    rank: -1,
    onClick: defaultTeamOnClick,
}
Team.defaultProps = defaultProps; 

export default Team;