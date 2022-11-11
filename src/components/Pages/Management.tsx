// this page is just gonna hold a Tournament
// the only special stuff it's gonna have is a dropdown for selecting tournaments
// and then like the title of the tournament off to the right
// it'll have a header containing the above information then the tournament below the header
import Tournament from "./Tournament";

const Management = () => {
	return (
		<div className="management">
			<h1>Management Page</h1>
			<Tournament />
		</div>
	);
};

export default Management;
