import React from "react";

// Demonstration of creating+using props with TS (necessary for repeat use)
// if typescript complains about possible any type just append ": any"
type HeaderProps = {
	title?: string;
	textColor?: string;
	backgroundColor?: string;
};

// { title }: HeaderProps basically replaces the js "props"
const Header = ({ title, textColor, backgroundColor = "transparent" }: HeaderProps) => {
	return (
		<header style={{ color: textColor, backgroundColor }}>
			<h1>{title}</h1>
		</header>
	);
};

Header.defaultProps = {
	title: "Header",
	textColor: "black",
};

export default Header;
