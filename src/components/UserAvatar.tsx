import { Avatar } from "@mui/material";
import { User } from "csgo-predict-api";

export default function UserAvatar({ user, style }: UserAvatarProps) {
	function getInitials(name: string): string {
		let initials = "";
		const nameList = name.split(" ");

		if (nameList.length === 1) {
			initials += name.charAt(0);
		} else {
			initials += nameList[0].charAt(0) + nameList[nameList.length - 1].charAt(0);
		}

		return initials.toUpperCase();
	}

	return (
		<div style={style}>
			<Avatar alt={user.name} src={user.picture}>
				{getInitials(user.name)}
			</Avatar>
		</div>
	);
}

type UserAvatarProps = {
	user: User;
	style?: React.CSSProperties;
};
