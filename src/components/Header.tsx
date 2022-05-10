import React from "react";

// Demonstration of creating+using props with TS (necessary for repeat use)
// if typescript complains about possible any type just append ": any"
type HeaderProps = {
	title?: string;
	textColor?: string;
	unusedVar?: "Hello World";
};

// { title }: HeaderProps basically replaces the js "props"
const Header = ({ title, textColor }: HeaderProps) => {
	return (
		<header style={{ color: textColor }}>
			<h1>{title}</h1>
		</header>
	);
};

Header.defaultProps = {
	title: "Header",
	textColor: "black",
};

export default Header;
