type ButtonProps = {
	color?: string
	text?: string
	onClick?: Function
	teamNum?: 1
};

const Button = ({ text, color }: ButtonProps) => {
	const onClick = () => {
		// when clicked runs whatever's in here
		// there's other events you can do as well
	}

	return (
		<div>
			<button onClick = {onClick} style={{ backgroundColor: color }} className="btn">
				{text}
			</button>
		</div>
	);
};

Button.defaultProps = {
	text: "Button",
	color: "#111111",
};

export default Button;
