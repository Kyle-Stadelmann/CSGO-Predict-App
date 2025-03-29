"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { League, LeagueSummary } from "csgo-predict-api";
import { fetchFullLeague } from "@/lib/actions";

interface LeagueContextType {
	selectedLeague: League | undefined;
	selectedLeagueSummary: LeagueSummary | undefined;
	setSelectedLeagueSummary: (league: LeagueSummary) => Promise<void>;
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export function LeagueProvider({
	children,
	initialLeagueSummary,
}: {
	children: ReactNode;
	initialLeagueSummary?: LeagueSummary;
}) {
	const [selectedLeague, setSelectedLeague] = useState<League | undefined>(undefined);
	const [selectedLeagueSummary, setSelectedLeagueSummary] = useState<LeagueSummary | undefined>(initialLeagueSummary);

	const handleLeagueSummarySelect = async (leagueSummary: LeagueSummary) => {
		setSelectedLeagueSummary(leagueSummary);
		try {
			const fullLeague = await fetchFullLeague(leagueSummary.id);
			setSelectedLeague(fullLeague);
		} catch (error) {
			console.error("Failed to fetch full league:", error);
			// TODO: You might want to show a toast notification here
		}
	};

	return (
		<LeagueContext.Provider
			value={{
				selectedLeague,
				selectedLeagueSummary,
				setSelectedLeagueSummary: handleLeagueSummarySelect,
			}}
		>
			{children}
		</LeagueContext.Provider>
	);
}

export function useLeague() {
	const context = useContext(LeagueContext);
	if (context === undefined) {
		throw new Error("useLeague must be used within a LeagueProvider");
	}
	return context;
}
