// Idk where this file should go

import { User } from "csgo-predict-api";

export const USER_SESSION_STORAGE_KEY = "user";

export function getStoredUser(): User | undefined {
	const jsonStrUser = sessionStorage.getItem(USER_SESSION_STORAGE_KEY);
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
