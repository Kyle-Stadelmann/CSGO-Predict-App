import { getStoredUser } from "../lib/user-util";

const Header = ({ title, textColor, backgroundColor }: HeaderProps) => {
	return (
		<>
			<div className="app-header">
				<header style={{ color: textColor, backgroundColor }}>
					<h1>{title}</h1>
				</header>
			</div>
			<div className="signin-msg">
				<h2 id="signin-msg-header">{`${
					getStoredUser()?.name ? `Hello, ${getStoredUser()!.name}` : "Please sign in"
				}`}</h2>
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
