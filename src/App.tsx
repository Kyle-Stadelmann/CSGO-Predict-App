import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PickemsIcon from "./img/CSGOPickemsIcon.png";

import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Pages/Dashboard";
import LoginPage from "./components/Pages/LoginPage";

function App() {
	const navigate = useNavigate();
	const storedUser = JSON.parse(sessionStorage.getItem("CSGO_Predict_User")!);

	// https://stackoverflow.com/a/71037538/17208152
	// dont show login page if user is verifiedly logged in this session
	// (sessionStorage is cleared when the tab is closed)
	useEffect(() => {
		function handleLoggedIn() {
			if (storedUser?.email_verified) navigate("/dashboard");
		}
		
		handleLoggedIn();
	}, [navigate, storedUser?.email_verified]);

	return (
		<>
			{/* This stuff will appear on top of every page */}
			<Header title="CSGO Predictions" backgroundColor="blue" />

			{/* This stuff will only appear on its path */}
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>

			{/* This stuff will appear on every page below the above content */}
			<img src={PickemsIcon} alt="this pic dotn exist BRUH" className="center"></img>
		</>
	)
}

export default App;
