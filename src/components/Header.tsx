import React, { useEffect, useState } from "react";
import { userObject } from "../types/userObject";

type HeaderProps = {
	title?: string;
	textColor?: string;
	backgroundColor?: string;
};

// { title }: HeaderProps basically replaces the js "props"
const Header = ({ title, textColor, backgroundColor = "transparent" }: HeaderProps) => {
	const [ user, setUser ] = useState({} as userObject);
	const signInButton = document.getElementById("sign-in-div");

	useEffect(() => {
		if (sessionStorage.getItem("CSGO_Predict_User")) {
			setUser(JSON.parse(sessionStorage.getItem("CSGO_Predict_User")!));
		}
	}, [signInButton]);
	
	return (
		<>
			<div className="app-header">
				<header style={{ color: textColor, backgroundColor }}>
					<h1>
					<h2>
						{title}
					</h2>
					</h1>
				</header>
			</div>
			<div className="signin-msg">
				<h2>
					{`${user.given_name ? `Hello, ${user.given_name}` : "Please sign in"}`}
				</h2>
			</div>
		</>
	);
};

Header.defaultProps = {
	title: "Header",
	textColor: "black",
};

export default Header;
