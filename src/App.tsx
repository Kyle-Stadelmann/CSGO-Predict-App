import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Background from "./img/Background.png";

import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const google = window.google;

type userObject = {
	aud: string,
	azp: string,
	email: string,
	email_verified: boolean,
	exp: number,
	family_name: string,
	given_name: string,
	iat: number,
	iss: string,
	jti: string,
	name: string,
	nbf: number,
	picture: string,
	sub: string,
}

function App() {
	const [ user, setUser ] = useState({} as userObject);
	function handleCallbackResponse(response: google.accounts.id.CredentialResponse) {
		let userObject: userObject = jwt_decode(response.credential);
		console.log(`User logged in with email: ${userObject.email}`);
		setUser(userObject);
		// can't use user for check because useState is async but awaiting doesn't work
		if (userObject.email && userObject.email_verified === true) {
			document.getElementById("signInDiv")!.style.display = "none";
			// go to dashboard
		}
	}

	// Sign in with Google Button
	useEffect(() => {
		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
			callback: handleCallbackResponse!
		});

		google.accounts.id.renderButton(
			document.getElementById("signInDiv")!,
			{
				theme: "outline", size: "large",
				type: "standard"
			}
		);
	}, []);

	// go to dashboard route 
	// on login --> /dashboard
	return (
		<>
			<Header title="CSGO Predictions" backgroundColor="blue" />
			{user.email && 
			`Hello, ${user.given_name}!`}

			<Router>
				<Routes>
					<Route path="/" element={
						<div className="App" style={{
							backgroundColor: "red"
						}}>
							<div id="signInDiv"></div>
						</div>} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
			<img src={Background} alt=""></img>
		</>
	)
}

export default App;
