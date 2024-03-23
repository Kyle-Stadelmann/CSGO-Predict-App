// this is a list of all the teams that will be in the major
// to be used for picking your top 8 predictions in TopEight page

const TopEightList = ({ teams }: TopEightListProps) => {
	return (
		<div className="top-eight-list-wrapper">
			<div className="top-eight-list">{teams}</div>
		</div>
	);
};

type TopEightListProps = {
	teams: JSX.Element[];
};

export default TopEightList;
