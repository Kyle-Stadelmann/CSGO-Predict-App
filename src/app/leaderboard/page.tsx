"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, ChevronUp, ChevronDown, Minus } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock historical leaderboard data
const leaderboardHistory = [
	{
		date: "2023-07-10",
		label: "July 10, 2023",
		standings: [
			{
				id: "1",
				name: "JohnDoe",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 120,
				correctPredictions: 12,
				totalPredictions: 15,
				rank: 1,
				change: 0,
			},
			{
				id: "2",
				name: "CS2Pro",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 105,
				correctPredictions: 10,
				totalPredictions: 15,
				rank: 2,
				change: 0,
			},
			{
				id: "3",
				name: "Predictor123",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 90,
				correctPredictions: 9,
				totalPredictions: 15,
				rank: 3,
				change: 1,
			},
			{
				id: "4",
				name: "ESportsFan",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 85,
				correctPredictions: 8,
				totalPredictions: 14,
				rank: 4,
				change: -1,
			},
			{
				id: "5",
				name: "GameMaster",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 70,
				correctPredictions: 7,
				totalPredictions: 14,
				rank: 5,
				change: 0,
			},
			{
				id: "6",
				name: "CSGOLegend",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 65,
				correctPredictions: 6,
				totalPredictions: 13,
				rank: 6,
				change: 0,
			},
			{
				id: "7",
				name: "HeadshotKing",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 60,
				correctPredictions: 6,
				totalPredictions: 12,
				rank: 7,
				change: 2,
			},
			{
				id: "8",
				name: "FragMachine",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 55,
				correctPredictions: 5,
				totalPredictions: 12,
				rank: 8,
				change: 0,
			},
			{
				id: "9",
				name: "AWPMaster",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 50,
				correctPredictions: 5,
				totalPredictions: 10,
				rank: 9,
				change: -1,
			},
			{
				id: "10",
				name: "TacticalGenius",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 45,
				correctPredictions: 4,
				totalPredictions: 10,
				rank: 10,
				change: -1,
			},
		],
	},
	{
		date: "2023-07-09",
		label: "July 9, 2023",
		standings: [
			{
				id: "1",
				name: "JohnDoe",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 110,
				correctPredictions: 11,
				totalPredictions: 14,
				rank: 1,
				change: 0,
			},
			{
				id: "2",
				name: "CS2Pro",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 95,
				correctPredictions: 9,
				totalPredictions: 14,
				rank: 2,
				change: 1,
			},
			{
				id: "4",
				name: "ESportsFan",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 85,
				correctPredictions: 8,
				totalPredictions: 13,
				rank: 3,
				change: 1,
			},
			{
				id: "3",
				name: "Predictor123",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 80,
				correctPredictions: 8,
				totalPredictions: 14,
				rank: 4,
				change: -2,
			},
			{
				id: "5",
				name: "GameMaster",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 60,
				correctPredictions: 6,
				totalPredictions: 13,
				rank: 5,
				change: 0,
			},
			{
				id: "6",
				name: "CSGOLegend",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 55,
				correctPredictions: 5,
				totalPredictions: 12,
				rank: 6,
				change: 1,
			},
			{
				id: "9",
				name: "AWPMaster",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 50,
				correctPredictions: 5,
				totalPredictions: 10,
				rank: 7,
				change: 2,
			},
			{
				id: "10",
				name: "TacticalGenius",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 45,
				correctPredictions: 4,
				totalPredictions: 10,
				rank: 8,
				change: 2,
			},
			{
				id: "7",
				name: "HeadshotKing",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 40,
				correctPredictions: 4,
				totalPredictions: 10,
				rank: 9,
				change: -2,
			},
			{
				id: "8",
				name: "FragMachine",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 35,
				correctPredictions: 3,
				totalPredictions: 10,
				rank: 10,
				change: -1,
			},
		],
	},
	{
		date: "2023-07-08",
		label: "July 8, 2023",
		standings: [
			{
				id: "1",
				name: "JohnDoe",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 100,
				correctPredictions: 10,
				totalPredictions: 12,
				rank: 1,
				change: 0,
			},
			{
				id: "3",
				name: "Predictor123",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 80,
				correctPredictions: 8,
				totalPredictions: 12,
				rank: 2,
				change: 1,
			},
			{
				id: "2",
				name: "CS2Pro",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 75,
				correctPredictions: 7,
				totalPredictions: 12,
				rank: 3,
				change: -1,
			},
			{
				id: "4",
				name: "ESportsFan",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 65,
				correctPredictions: 6,
				totalPredictions: 11,
				rank: 4,
				change: 0,
			},
			{
				id: "5",
				name: "GameMaster",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 50,
				correctPredictions: 5,
				totalPredictions: 11,
				rank: 5,
				change: 0,
			},
			{
				id: "7",
				name: "HeadshotKing",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 40,
				correctPredictions: 4,
				totalPredictions: 10,
				rank: 6,
				change: 1,
			},
			{
				id: "6",
				name: "CSGOLegend",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 35,
				correctPredictions: 3,
				totalPredictions: 10,
				rank: 7,
				change: -1,
			},
			{
				id: "8",
				name: "FragMachine",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 30,
				correctPredictions: 3,
				totalPredictions: 9,
				rank: 8,
				change: 0,
			},
			{
				id: "10",
				name: "TacticalGenius",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 25,
				correctPredictions: 2,
				totalPredictions: 9,
				rank: 9,
				change: 1,
			},
			{
				id: "9",
				name: "AWPMaster",
				avatar: "/placeholder.svg?height=40&width=40",
				points: 20,
				correctPredictions: 2,
				totalPredictions: 8,
				rank: 10,
				change: -1,
			},
		],
	},
];

export default function LeaderboardPage() {
	const [selectedDate, setSelectedDate] = useState(leaderboardHistory[0].date);

	// Find the selected leaderboard data
	const leaderboardData = leaderboardHistory.find((item) => item.date === selectedDate)?.standings || [];

	return (
		<div className="container py-8 space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
					<p className="text-muted-foreground">See who has the most accurate predictions</p>
				</div>
			</div>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
					<div>
						<CardTitle>IEM Cologne 2023 Leaderboard</CardTitle>
						<CardDescription>See who has the most accurate predictions</CardDescription>
					</div>
					<Select value={selectedDate} onValueChange={setSelectedDate}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select date" />
						</SelectTrigger>
						<SelectContent>
							{leaderboardHistory.map((item) => (
								<SelectItem key={item.date} value={item.date}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b bg-muted/20">
									<th className="text-left py-3 px-4">Rank</th>
									<th className="text-left py-3 px-4">User</th>
									<th className="text-center py-3 px-4">Points</th>
									<th className="text-center py-3 px-4">Correct</th>
									<th className="text-center py-3 px-4">Total</th>
									<th className="text-center py-3 px-4">Accuracy</th>
									<th className="text-center py-3 px-4">Trend</th>
								</tr>
							</thead>
							<tbody>
								{leaderboardData.map((user, index) => (
									<tr
										key={user.id}
										className={cn(
											"border-b transition-colors hover:bg-muted/20",
											user.rank === 1
												? "bg-amber-50/30 dark:bg-amber-950/20"
												: user.rank === 2
												? "bg-slate-50/30 dark:bg-slate-950/20"
												: user.rank === 3
												? "bg-orange-50/30 dark:bg-orange-950/20"
												: index % 2 === 0
												? "bg-muted/10"
												: ""
										)}
									>
										<td className="py-3 px-4 text-center">
											<div className="flex justify-center">
												{user.rank === 1 ? (
													<Trophy className="h-5 w-5 text-amber-500" />
												) : user.rank === 2 ? (
													<Trophy className="h-5 w-5 text-slate-400" />
												) : user.rank === 3 ? (
													<Trophy className="h-5 w-5 text-orange-600" />
												) : (
													user.rank
												)}
											</div>
										</td>
										<td className="py-3 px-4">
											<div className="flex items-center gap-3">
												<Image
													src={user.avatar || "/placeholder.svg"}
													alt={user.name}
													width={40}
													height={40}
													className={cn(
														"rounded-full",
														user.rank === 1
															? "ring-2 ring-amber-500 ring-offset-2"
															: user.rank === 2
															? "ring-2 ring-slate-400 ring-offset-2"
															: user.rank === 3
															? "ring-2 ring-orange-600 ring-offset-2"
															: ""
													)}
												/>
												<span className="font-medium">{user.name}</span>
											</div>
										</td>
										<td className="py-3 px-4 text-center">
											<span
												className={cn(
													"font-bold px-3 py-1 rounded-full text-sm",
													user.rank === 1
														? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
														: user.rank === 2
														? "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
														: user.rank === 3
														? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
														: "bg-muted text-muted-foreground"
												)}
											>
												{user.points}
											</span>
										</td>
										<td className="py-3 px-4 text-center">{user.correctPredictions}</td>
										<td className="py-3 px-4 text-center">{user.totalPredictions}</td>
										<td className="py-3 px-4 text-center">
											<span
												className={cn(
													"px-2 py-1 rounded-md text-sm",
													Math.round(
														(user.correctPredictions / user.totalPredictions) * 100
													) >= 70
														? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
														: Math.round(
																(user.correctPredictions / user.totalPredictions) * 100
														  ) >= 50
														? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
														: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
												)}
											>
												{Math.round((user.correctPredictions / user.totalPredictions) * 100)}%
											</span>
										</td>
										<td className="py-3 px-4">
											<div className="flex items-center justify-center">
												{user.change > 0 ? (
													<div className="flex items-center text-emerald-600">
														<ChevronUp className="h-4 w-4" />
														<span>{user.change}</span>
													</div>
												) : user.change < 0 ? (
													<div className="flex items-center text-red-600">
														<ChevronDown className="h-4 w-4" />
														<span>{Math.abs(user.change)}</span>
													</div>
												) : (
													<div className="flex items-center text-muted-foreground">
														<Minus className="h-4 w-4" />
													</div>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
