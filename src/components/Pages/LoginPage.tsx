import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInButton from '../SignInButton';
import jwt_decode from "jwt-decode";
import { authPredictionUser } from 'csgo-predict-api';

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

const LoginPage = () => {
    const navigate = useNavigate();

	// Sign in with Google Button
	useEffect(() => {
		async function handleCallbackResponse(response: google.accounts.id.CredentialResponse) {
			const user = await authPredictionUser(response.credential);

			let userObject: userObject = jwt_decode(response.credential);
			console.log(`User logged in with email: ${userObject.email}`);
			// setUser(userObject);
	
			// can't use user for check because useState is async but awaiting doesn't work
			if (userObject.email && userObject.email_verified === true) {
				document.getElementById("sign-in-div")!.style.display = "none";
				sessionStorage.setItem("CSGO_Predict_User", JSON.stringify(userObject));
				navigate("/dashboard", {replace: true});
			}
		}

		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
			callback: handleCallbackResponse!
		});

		google.accounts.id.renderButton(
			document.getElementById("sign-in-div")!,
			{
				theme: "outline", size: "large",
				type: "standard"
			}
		);
	}, [navigate]);
    
    return (
        <div className="login-page">
			<h1>Login Page</h1>
            <SignInButton />
        </div>
    )
}

export default LoginPage