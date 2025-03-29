"use client";

import { Check, ChevronDown, Trophy, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LeagueSummary } from "csgo-predict-api";
import { useLeague } from "@/contexts/league-context";
import { useEffect } from "react";

interface LeagueSelectorProps {
	leagueSummaries: LeagueSummary[];
}

export function LeagueSelector({ leagueSummaries }: LeagueSelectorProps) {
	useEffect(() => {
		const latestLeague = leagueSummaries.sort((a, b) => b.startDate.getTime() - a.startDate.getTime())[0];
		setSelectedLeagueSummary(latestLeague);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { selectedLeagueSummary, setSelectedLeagueSummary } = useLeague();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
					<Trophy className="h-4 w-4" />
					<span className="truncate">
						{selectedLeagueSummary ? (
							<>
								{selectedLeagueSummary.name}{" "}
								<span className="text-muted-foreground">({selectedLeagueSummary.tournamentName})</span>
							</>
						) : (
							"Select League"
						)}
					</span>
					<ChevronDown className="h-4 w-4 ml-auto" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Active Leagues</DropdownMenuLabel>
				<DropdownMenuGroup>
					{leagueSummaries
						.filter((league) => !league.finished)
						.map((league) => (
							<DropdownMenuItem
								key={league.id}
								onClick={() => setSelectedLeagueSummary(league)}
								className="cursor-pointer"
							>
								<span
									className={cn(
										"mr-2",
										league.id === selectedLeagueSummary?.id ? "opacity-100" : "opacity-0"
									)}
								>
									<Check className="h-4 w-4" />
								</span>
								<div className="flex flex-col">
									<span>{league.name}</span>
									<span className="text-xs text-muted-foreground">{league.tournamentName}</span>
								</div>
							</DropdownMenuItem>
						))}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuLabel>Past Leagues</DropdownMenuLabel>
				<DropdownMenuGroup>
					{leagueSummaries
						.filter((league) => league.finished)
						.map((league) => (
							<DropdownMenuItem
								key={league.id}
								onClick={() => setSelectedLeagueSummary(league)}
								className="cursor-pointer"
							>
								<span
									className={cn(
										"mr-2",
										league.id === selectedLeagueSummary?.id ? "opacity-100" : "opacity-0"
									)}
								>
									<Check className="h-4 w-4" />
								</span>
								<div className="flex flex-col">
									<span>{league.name}</span>
									<span className="text-xs text-muted-foreground">{league.tournamentName}</span>
								</div>
							</DropdownMenuItem>
						))}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild className="cursor-pointer">
					<Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
						<a href="/leagues">
							<Plus className="h-4 w-4 mr-2" />
							Create or Join League
						</a>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
