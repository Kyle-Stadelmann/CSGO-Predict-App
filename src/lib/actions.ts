"use server";

import { getLeagueById } from "csgo-predict-api";
import { getServerAuthSession } from "./auth";
import { getCurrentDayMatches } from "csgo-predict-api";

export async function fetchFullLeague(leagueId: number) {
	const session = await getServerAuthSession();

	if (!session?.user?.id || !session?.backendToken) {
		throw new Error("Failed to fetch full league: Not authenticated");
	}

	return getLeagueById(leagueId, session.backendToken);
}

export async function fetchCurrentMatches(leagueId: number) {
	const session = await getServerAuthSession();

	if (!session?.user?.id || !session?.backendToken) {
		throw new Error("Failed to fetch current day matches: Not authenticated");
	}

	return await getCurrentDayMatches(leagueId, session.backendToken);
}
