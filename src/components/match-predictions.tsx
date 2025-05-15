"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarClock, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Id, Match, Prediction } from "csgo-predict-api";
import { useLeague } from "@/contexts/league-context";
import { fetchCurrentMatches, fetchCurrentPredictions, submitMatchPredictions } from "@/lib/actions";

interface TeamCardProps {
	teamName: string;
	logoUrl?: string;
	isSelected: boolean;
	onClick: () => void;
}

function TeamCard({ teamName, logoUrl, isSelected, onClick }: TeamCardProps) {
	return (
		<div
			className={cn(
				"flex-1 flex flex-col items-center justify-center gap-3 p-4 rounded-lg cursor-pointer border-2 transition-all w-full sm:w-auto",
				isSelected
					? "border-primary bg-primary/5 shadow-md"
					: "border-transparent hover:border-muted hover:bg-muted/20"
			)}
			onClick={onClick}
		>
			<div className="h-16 w-16 relative flex items-center justify-center rounded-full overflow-hidden">
				<Image src={logoUrl || ""} alt={teamName} width={48} height={48} className="object-contain" />
			</div>
			<span className="text-lg font-medium text-center w-full">{teamName}</span>
		</div>
	);
}

export interface MatchPicks {
	[match_id: Id]: Id;
}

export function MatchPredictions() {
	const { selectedLeague } = useLeague();

	const [predictions, setPredictions] = useState({} as MatchPicks);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [upcomingMatches, setUpcomingMatches] = useState([] as Match[]);

	useEffect(() => {
		if (selectedLeague) {
			const fetchMatchesAndPredictions = async () => {
				const matches = await fetchCurrentMatches(selectedLeague.id);
				setUpcomingMatches(matches);

				const preds = await fetchCurrentPredictions(selectedLeague.id);
				const matchPicks: MatchPicks = {};
				preds?.predictions.forEach((p) => {
					matchPicks[p.matchId] = p.choiceTeamId;
				});
				setPredictions(matchPicks);
			};
			fetchMatchesAndPredictions().catch(console.error);
		}
	}, [selectedLeague]);

	const handleTeamSelect = (matchId: Id, teamId: Id) => {
		setPredictions((prev) => ({
			...prev,
			[matchId]: teamId,
		}));
	};

	const handleSubmitPredictions = async () => {
		if (selectedLeague) {
			const apiPreds = createApiPredictionList();
			setIsSubmitting(true);
			try {
				submitMatchPredictions(selectedLeague.id, apiPreds);
				setIsSubmitted(true);
				setIsSubmitting(false);
			} catch (e) {
				console.error(e);
			}
		}
	};

	const formatMatchTime = (date: Date) => {
		return date.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	function createApiPredictionList(): Prediction[] {
		const apiPredictions = upcomingMatches.flatMap((match) => {
			if (!predictions[match.id]) {
				return [];
			}
			const prediction: Prediction = {
				matchId: match.id,
				choiceTeamId: predictions[match.id],
			};
			return prediction;
		});

		return apiPredictions;
	}

	return (
		<div className="space-y-6">
			{isSubmitted && (
				<Alert className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 mb-6">
					<CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
					<AlertDescription className="text-emerald-600 dark:text-emerald-400 font-medium">
						Your predictions have been submitted successfully!
					</AlertDescription>
				</Alert>
			)}

			<div className="space-y-4">
				{upcomingMatches.map((match, index) => (
					<Card
						key={match.id}
						className={cn("overflow-hidden border", index % 2 === 0 ? "bg-muted/20" : "bg-background")}
					>
						<CardContent className="p-0">
							<div className="p-4">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center text-muted-foreground text-sm">
										<CalendarClock className="h-4 w-4 mr-1" />
										{formatMatchTime(match.date)}
									</div>
									<Badge
										variant="outline"
										className="font-semibold bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900"
									>
										{"TODO_X"} points
									</Badge>
								</div>

								<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
									<TeamCard
										teamName={match.team1.name}
										logoUrl={match.team1.logo_url}
										isSelected={predictions[match.id] === match.team1.id}
										onClick={() => handleTeamSelect(match.id, match.team1.id)}
									/>

									<div className="text-center flex-shrink-0">
										<div className="text-xl font-bold">VS</div>
										<div className="text-sm text-muted-foreground">
											{match.format.toLocaleUpperCase()}
										</div>
									</div>

									<TeamCard
										teamName={match.team2.name}
										logoUrl={match.team2.logo_url}
										isSelected={predictions[match.id] === match.team2.id}
										onClick={() => handleTeamSelect(match.id, match.team2.id)}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="pt-4">
				<Button
					className={cn(
						"w-full transition-all",
						Object.keys(predictions).length === upcomingMatches.length && !isSubmitted && !isSubmitting
							? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
							: ""
					)}
					size="lg"
					onClick={handleSubmitPredictions}
					disabled={Object.keys(predictions).length < upcomingMatches.length || isSubmitting || isSubmitted}
				>
					{isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Submitting Predictions...
						</>
					) : isSubmitted ? (
						"Predictions Submitted"
					) : (
						`Submit Predictions (${Object.keys(predictions).length}/${upcomingMatches.length})`
					)}
				</Button>
			</div>
		</div>
	);
}
