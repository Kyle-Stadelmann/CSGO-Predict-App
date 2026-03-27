"use server";

import { getDayPredictions, getLeagueById, Prediction, submitDayPredictions } from "csgo-predict-api";
import { getServerAuthSession } from "./auth";
import { getCurrentDayMatches } from "csgo-predict-api";

export async function fetchFullLeague(leagueId: number) {
	const session = await getServerAuthSession();

	if (!session?.backendToken) {
		throw new Error("Failed to fetch full league: Not authenticated");
	}

	return getLeagueById(leagueId, session.backendToken);
}

export async function fetchCurrentMatches(leagueId: number) {
	const session = await getServerAuthSession();

	if (!session?.backendToken) {
		throw new Error("Failed to fetch current day matches: Not authenticated");
	}

	return await getCurrentDayMatches(leagueId, session.backendToken);
}

export async function fetchCurrentPredictions(leagueId: number) {
	const session = await getServerAuthSession();

	if (!session?.backendToken) {
		throw new Error("Failed to fetch day predictions: Not authenticated");
	}

	return await getDayPredictions(leagueId, session.backendToken);
}

export async function submitMatchPredictions(leagueId: number, preds: Prediction[]) {
	const session = await getServerAuthSession();

	if (!session?.backendToken) {
		throw new Error("Failed to fetch day predictions: Not authenticated");
	}

	submitDayPredictions(leagueId, preds, session.backendToken);
}
