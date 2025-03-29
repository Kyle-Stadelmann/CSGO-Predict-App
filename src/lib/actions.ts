"use server";

import { getLeagueById } from "csgo-predict-api";
import { getServerAuthSession } from "./auth";

export async function fetchFullLeague(leagueId: number) {
	const session = await getServerAuthSession();

	if (!session?.user?.id || !session?.backendToken) {
		throw new Error("Failed to fetch full league: Not authenticated");
	}

	return getLeagueById(leagueId, session.backendToken);
}
