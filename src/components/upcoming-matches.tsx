"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Mock upcoming matches data
const upcomingMatches = [
	{
		id: "1",
		team1: { id: "t1", name: "Natus Vincere", logo: "/placeholder.svg?height=40&width=40" },
		team2: { id: "t2", name: "FaZe Clan", logo: "/placeholder.svg?height=40&width=40" },
		date: "2023-07-15T14:00:00Z",
		bo: 3,
		tournament: "IEM Cologne 2023",
	},
	{
		id: "2",
		team1: { id: "t3", name: "Team Liquid", logo: "/placeholder.svg?height=40&width=40" },
		team2: { id: "t4", name: "Vitality", logo: "/placeholder.svg?height=40&width=40" },
		date: "2023-07-15T17:30:00Z",
		bo: 3,
		tournament: "IEM Cologne 2023",
	},
	{
		id: "3",
		team1: { id: "t5", name: "G2 Esports", logo: "/placeholder.svg?height=40&width=40" },
		team2: { id: "t6", name: "Astralis", logo: "/placeholder.svg?height=40&width=40" },
		date: "2023-07-16T12:00:00Z",
		bo: 3,
		tournament: "IEM Cologne 2023",
	},
];

export function UpcomingMatches() {
	const [open, setOpen] = useState(false);
	const [selectedMatch, setSelectedMatch] = useState(null);
	const [prediction, setPrediction] = useState("");

	const handlePredictClick = (match) => {
		setSelectedMatch(match);
		setOpen(true);
		setPrediction("");
	};

	const handleSubmitPrediction = () => {
		// Here you would submit the prediction to your backend
		console.log(`Predicted ${prediction} for match ${selectedMatch.id}`);
		setOpen(false);
	};

	const formatMatchTime = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="space-y-4">
			{upcomingMatches.map((match) => (
				<Card key={match.id} className="overflow-hidden">
					<CardContent className="p-0">
						<div className="flex flex-col sm:flex-row items-center justify-between p-4">
							<div className="flex items-center gap-4 mb-4 sm:mb-0">
								<div className="flex flex-col items-center gap-1 w-24">
									<Image
										src={match.team1.logo || "/placeholder.svg"}
										alt={match.team1.name}
										width={40}
										height={40}
										className="rounded-full"
									/>
									<span className="text-sm font-medium text-center">{match.team1.name}</span>
								</div>

								<div className="text-center">
									<div className="text-xl font-bold">VS</div>
									<div className="text-xs text-muted-foreground">BO{match.bo}</div>
								</div>

								<div className="flex flex-col items-center gap-1 w-24">
									<Image
										src={match.team2.logo || "/placeholder.svg"}
										alt={match.team2.name}
										width={40}
										height={40}
										className="rounded-full"
									/>
									<span className="text-sm font-medium text-center">{match.team2.name}</span>
								</div>
							</div>

							<div className="flex flex-col sm:flex-row items-center gap-4">
								<div className="flex items-center text-muted-foreground text-sm">
									<CalendarClock className="h-4 w-4 mr-1" />
									{formatMatchTime(match.date)}
								</div>
								<Button onClick={() => handlePredictClick(match)}>Predict</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			))}

			<Dialog open={open} onOpenChange={setOpen}>
				{selectedMatch && (
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Predict Match Outcome</DialogTitle>
							<DialogDescription>
								{selectedMatch.team1.name} vs {selectedMatch.team2.name} - BO{selectedMatch.bo}
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<RadioGroup value={prediction} onValueChange={setPrediction}>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value={selectedMatch.team1.id} id="team1" />
									<Label htmlFor="team1" className="flex items-center gap-2">
										<Image
											src={selectedMatch.team1.logo || "/placeholder.svg"}
											alt={selectedMatch.team1.name}
											width={24}
											height={24}
											className="rounded-full"
										/>
										{selectedMatch.team1.name} Win
									</Label>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem value={selectedMatch.team2.id} id="team2" />
									<Label htmlFor="team2" className="flex items-center gap-2">
										<Image
											src={selectedMatch.team2.logo || "/placeholder.svg"}
											alt={selectedMatch.team2.name}
											width={24}
											height={24}
											className="rounded-full"
										/>
										{selectedMatch.team2.name} Win
									</Label>
								</div>
							</RadioGroup>
						</div>

						<DialogFooter>
							<Button onClick={handleSubmitPrediction} disabled={!prediction} className="w-full">
								Submit Prediction
							</Button>
						</DialogFooter>
					</DialogContent>
				)}
			</Dialog>
		</div>
	);
}
