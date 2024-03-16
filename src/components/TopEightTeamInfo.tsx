import { Team } from "csgo-predict-api";

const TopEightTeamInfo = ({ teamInfo }: TopEightTeamInfoProps) => {
	return (
		<div className="top-eight-team-info">
			{`#${teamInfo.rank}`}
			<img className="top-eight-team-logo" src={teamInfo.logo_url} alt={"LOGO"} />
			{`${teamInfo.name}`}
		</div>
	);
};

type TopEightTeamInfoProps = {
	teamInfo: Team;
};

export default TopEightTeamInfo;
