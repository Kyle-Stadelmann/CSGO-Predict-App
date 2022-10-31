// this page will host all available tournaments instead of a single <Voting />
// each <Voting /> will be housed in a <Tournament /> page rather than in here
import React from "react";
import Voting from "./Voting";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			<Voting />
		</div>
	);
};

export default Dashboard;
