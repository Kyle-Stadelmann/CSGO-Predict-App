import { User } from "csgo-predict-api";
import { useEffect, useState } from "react";

const Header = ({ title, textColor, backgroundColor }: HeaderProps) => {
	const [user, setUser] = useState({} as User);
	const signInButton = document.getElementById("signin-btn");

	// this may (but shouldn't?) run every time Header is refreshed/re-rendered
	// not a huge issue but yknow
	useEffect(() => {
		if (sessionStorage.getItem("CSGO_Predict_User")) {
			setUser(JSON.parse(sessionStorage.getItem("CSGO_Predict_User")!));
		}
	}, [signInButton]);

	return (
		<>
			<div className="app-header">
				<header style={{ color: textColor, backgroundColor }}>
					<h1>{title}</h1>
				</header>
			</div>
			<div className="signin-msg">
				<h2 id="signin-msg-header">{`${user.name ? `Hello, ${user.name}` : "Please sign in"}`}</h2>
			</div>
		</>
	);
};

type HeaderProps = {
	title?: string;
	textColor?: string;
	backgroundColor?: string;
};

Header.defaultProps = {
	title: "Header",
	textColor: "black",
	backgroundColor: "transparent",
};

export default Header;
