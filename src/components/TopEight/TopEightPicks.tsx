// this is the user's actual picks for top 8
// selected teams from TopEightList will come here

const TopEightPicks = ({ teams }: TopEightPicksProps) => {
	return (
		<div className="top-eight-picks-wrapper">
			<div className="top-eight-picks">{teams}</div>
		</div>
	);
};

type TopEightPicksProps = {
	teams: JSX.Element[];
};

export default TopEightPicks;
