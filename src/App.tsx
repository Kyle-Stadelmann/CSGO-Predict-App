import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Pages/Dashboard";
import LoginPage from "./components/Pages/LoginPage";
import "./App.css";
import { isLoggedIn } from "./lib/user-util";
import ThemeButton from "./components/ThemeButton";
import { THEME_IMGS } from "./constant";
import Management from "./components/Pages/Management";

function App() {
    // initialize this as the user's preferred bg image once that's in the db
	const [bgImageIndex, setBgImageIndex] = useState(0);

	// This line is literally magical. Remove it and the world ends
	useNavigate();

	return (
		<div className="app" style={{ backgroundImage: `url(${THEME_IMGS[bgImageIndex]})` }}>
			{/* This stuff will appear on top of every page */}
			<Header title="CSGO Predictions" backgroundColor="blue" />

			{/* This stuff will only appear on its path */}
			<Routes>
				<Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <LoginPage />} />
				<Route path="/dashboard" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" />} />
				<Route path="/management" element={isLoggedIn() ? <Management /> : <Navigate to="/" />} />
			</Routes>

			{/* This stuff will appear on every page below the above content */}
			<ThemeButton bgImageIndex={bgImageIndex} setBgImageIndex={setBgImageIndex}></ThemeButton>
		</div>
	);
}

export default App;
