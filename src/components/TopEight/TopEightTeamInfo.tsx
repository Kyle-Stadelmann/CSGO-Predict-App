import { Team } from "csgo-predict-api";

// TODO: make rank, logo, name fit nicely and uniformly
const TopEightTeamInfo = ({ teamInfo }: TopEightTeamInfoProps) => {
	return (
		<div className="top-eight-team-info">
			{`#${teamInfo.rank}  `}
			<img className="top-eight-team-logo" src={teamInfo.logo_url} alt={"NO_LOGO"} />
			{`  ${teamInfo.name}`}
		</div>
	);
};

type TopEightTeamInfoProps = {
	teamInfo: Team;
};

export default TopEightTeamInfo;
