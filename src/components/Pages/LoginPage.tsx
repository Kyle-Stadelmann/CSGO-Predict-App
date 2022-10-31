// possible issue with using sessionstorage
// https://stackoverflow.com/questions/40399873/initializing-and-using-sessionstorage-in-react
// we can probably create a userObject with useRef that persists in every component?

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInButton from "../SignInButton";
import { authPredictionUser, User } from "csgo-predict-api";

const google = window.google;

const LoginPage = () => {
	const navigate = useNavigate();

	// Sign in with Google Button
	useEffect(() => {
		async function handleCallbackResponse(response: google.accounts.id.CredentialResponse) {
			let user: User;
			try {
				user = await authPredictionUser(response.credential);
			} catch (e) {
				// TODO: Auth didn't work lets do something?
				// Maybe just refresh page and start over? Not sure when this would happen.
				// Since we're in this callback it should succesfully auth
				return;
			}

			// TODO: How do we log to server console in react
			console.log(`User logged in with email: ${user.email}`);

			document.getElementById("signin-btn")!.style.display = "none";
			sessionStorage.setItem("CSGO_Predict_User", JSON.stringify(user));
			navigate("/dashboard", { replace: true });
		}

		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById("signin-btn")!, {
			type: "standard",
			size: "large",
		});
	}, [navigate]);

	return (
		<div className="login-page">
			<h1>Login Page</h1>
			<SignInButton />
		</div>
	);
};

export default LoginPage;
