// Idk where this file should go

import { User } from "csgo-predict-api";

export function getStoredUser(): User | undefined {
	const jsonStrUser = sessionStorage.getItem("CSGO_Predict_User");
	if (!jsonStrUser) {
		// No authed user do nothing for now
		return;
	}
	return JSON.parse(jsonStrUser) as User;
}

export function isLoggedIn(): boolean {
	const user = getStoredUser();
	return !!user;
}
