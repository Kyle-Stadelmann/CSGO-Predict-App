"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayoffPredictions } from "@/components/playoff-predictions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarClock, LockIcon } from "lucide-react";
import { MatchPredictions } from "@/components/match-predictions";

export default function PredictPage() {
	const [activeTab, setActiveTab] = useState("matches");

	// Mock data for playoff deadline
	const playoffDeadline = new Date("2023-07-25T12:00:00Z");
	const now = new Date();
	const isPlayoffLocked = now > playoffDeadline;

	// Calculate time remaining until deadline
	const timeRemaining = playoffDeadline.getTime() - now.getTime();
	const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
	const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

	return (
		<div className="container py-8 space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Predictions</h1>
					<p className="text-muted-foreground">Predict match outcomes and playoff teams</p>
				</div>
			</div>

			<Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="matches">Match Predictions</TabsTrigger>
					<TabsTrigger value="playoffs">Playoff Predictions</TabsTrigger>
				</TabsList>

				<TabsContent value="matches" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>IEM Cologne 2023</CardTitle>
							<CardDescription>Predict the outcomes of upcoming matches</CardDescription>
						</CardHeader>
						<CardContent>
							<MatchPredictions />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="playoffs" className="mt-6">
					<Card>
						<CardHeader>
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<div>
									<CardTitle>Playoff Team Predictions</CardTitle>
									<CardDescription>
										Select the 8 teams that will make it to the playoffs
									</CardDescription>
								</div>

								{isPlayoffLocked ? (
									<Alert variant="destructive" className="sm:w-auto max-w-md">
										<LockIcon className="h-4 w-4" />
										<AlertTitle>Predictions Locked</AlertTitle>
										<AlertDescription>
											The deadline for playoff predictions has passed
										</AlertDescription>
									</Alert>
								) : (
									<Alert className="sm:w-auto max-w-md">
										<CalendarClock className="h-4 w-4" />
										<AlertTitle>Deadline Approaching</AlertTitle>
										<AlertDescription>
											{daysRemaining > 0 ? (
												<>
													{daysRemaining} day{daysRemaining !== 1 ? "s" : ""} and{" "}
													{hoursRemaining} hour
													{hoursRemaining !== 1 ? "s" : ""} remaining
												</>
											) : (
												<>
													{hoursRemaining} hour{hoursRemaining !== 1 ? "s" : ""} remaining
												</>
											)}
										</AlertDescription>
									</Alert>
								)}
							</div>
						</CardHeader>
						<CardContent>
							<PlayoffPredictions isLocked={isPlayoffLocked} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
