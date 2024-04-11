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
import { Theme, ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";

function App() {
	// initialize this as the user's preferred bg image once that's in the db
	const [bgImageIndex, setBgImageIndex] = useState(0);

	// This line is literally magical. Remove it and the world ends
	useNavigate();

	// https://mui.com/material-ui/customization/default-theme/
	const theme: Theme = createTheme({
		palette: {
			mode: "dark",
			background: {
				paper: "#1d1d1d", // the ui rabbit hole goes deep..
				default: "#1a1a1a",
			},
			text: {
				primary: "#fff",
				secondary: "rgba(255, 255, 255, 0.7)",
				disabled: "rgba(255, 255, 255, 0.5)",
			},
			divider: "rgba(255, 255, 255, 0.12)",
		},
		typography: {
			fontSize: 15,
			fontFamily: ["Verdana", "Arial"].join(","),
		},
	});

	return (
		<div className="app">
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{/* This stuff will appear on top of every page */}

				{/* This stuff will only appear on its path */}
				<Routes>
					<Route path="/" element={isLoggedIn() ? <Navigate to="/management" /> : <LoginPage />} />
					<Route path="/dashboard" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" />} />
					<Route path="/management" element={isLoggedIn() ? <Management /> : <Navigate to="/" />} />
				</Routes>

				{/* This stuff will appear on every page below the above content */}
				<ThemeButton bgImageIndex={bgImageIndex} setBgImageIndex={setBgImageIndex}></ThemeButton>
			</ThemeProvider>
		</div>
	);
}

export default App;
