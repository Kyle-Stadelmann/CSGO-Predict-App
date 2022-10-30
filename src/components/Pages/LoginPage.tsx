// possible issue with using sessionstorage
// https://stackoverflow.com/questions/40399873/initializing-and-using-sessionstorage-in-react
// we can probably create a userObject with useRef that persists in every component?

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInButton from '../SignInButton';
import jwt_decode from "jwt-decode";
import { userObject } from '../../types/userObject';

const google = window.google;

const LoginPage = () => {
    const navigate = useNavigate();

	// Sign in with Google Button
	useEffect(() => {
		function handleCallbackResponse(response: google.accounts.id.CredentialResponse) {
			let userObject: userObject = jwt_decode(response.credential);
			console.log(`User logged in with email: ${userObject.email}`);
			// setUser(userObject);
	
			// can't use user for check because useState is async but awaiting doesn't work
			if (userObject.email && userObject.email_verified === true) {
				document.getElementById("signin-btn")!.style.display = "none";
				sessionStorage.setItem("CSGO_Predict_User", JSON.stringify(userObject));
				navigate("/dashboard", {replace: true});
			}
		}

		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
			callback: handleCallbackResponse!
		});

		google.accounts.id.renderButton(
			document.getElementById("signin-btn")!,
			{
                type: "standard", size: "large",
            }
		);
	}, [navigate]);
    
    return (
        <div className="login-page">
			<h1>Login Page</h1>
            <SignInButton />
        </div>
    );
}

export default LoginPage;