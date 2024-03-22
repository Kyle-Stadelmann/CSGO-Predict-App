// this page will host all available tournaments
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			<Link to="/management">
				<button>
					Click here to go to the Management tab! This button will eventually be replaced with a beautiful
					menu full of all the tournaments you're currently participating in, but for now it is an ugly button
					(it's worth trust)
				</button>
			</Link>
			{/* put a button here that links to management */}
			{/* eventually there'll be multiple buttons for each tournament but for now just a single hardcoded management */}
		</div>
	);
};

export default Dashboard;
