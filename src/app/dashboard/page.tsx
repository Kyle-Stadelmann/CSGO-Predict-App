import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentResults } from "@/components/recent-results";
import { TopPredictors } from "@/components/top-predictors";
import { LeagueSelector } from "@/components/league-selector";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MatchPredictions } from "@/components/match-predictions";
import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await getServerAuthSession();
	const isAuthenticated = !!session?.user;

	if (!isAuthenticated) {
		redirect("/");
	}

	// Mock data - whether user has joined any leagues
	const hasJoinedLeagues = true;

	return (
		<div className="container py-8 space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
					<p className="text-muted-foreground">Welcome back! Here's what's happening in your leagues</p>
				</div>
				<LeagueSelector />
			</div>

			{!hasJoinedLeagues && (
				<Alert>
					<Users className="h-4 w-4" />
					<AlertTitle>No leagues joined</AlertTitle>
					<AlertDescription>
						You haven't joined any prediction leagues yet.
						<Link href="/leagues" className="font-medium underline underline-offset-4 ml-1">
							Join or create a league
						</Link>{" "}
						to start predicting match outcomes.
					</AlertDescription>
				</Alert>
			)}

			{hasJoinedLeagues && (
				<>
					{/* Dashboard content */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Upcoming Matches</CardTitle>
								<CardDescription>Predict the outcomes before matches begin</CardDescription>
							</CardHeader>
							<CardContent>
								<MatchPredictions />
							</CardContent>
							<CardFooter>
								<Button asChild className="w-full">
									<Link href="/predict">
										View All Matches
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</CardFooter>
						</Card>

						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Top Predictors</CardTitle>
									<CardDescription>Current league standings</CardDescription>
								</CardHeader>
								<CardContent>
									<TopPredictors />
								</CardContent>
								<CardFooter>
									<Button variant="outline" asChild className="w-full">
										<Link href="/leaderboard">View Full Leaderboard</Link>
									</Button>
								</CardFooter>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Playoff Predictions</CardTitle>
									<CardDescription>Select the 8 teams that will make playoffs</CardDescription>
								</CardHeader>
								<CardContent className="text-center">
									{/* Mock playoff prediction status */}
									<p className="text-muted-foreground mb-4">
										IEM Cologne 2023 playoffs begin in 3 days
									</p>
								</CardContent>
								<CardFooter>
									<Button asChild className="w-full">
										<Link href="/predict?tab=playoffs">Make Predictions</Link>
									</Button>
								</CardFooter>
							</Card>
						</div>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Recent Results</CardTitle>
							<CardDescription>Your recent prediction outcomes</CardDescription>
						</CardHeader>
						<CardContent>
							<RecentResults />
						</CardContent>
						<CardFooter className="flex justify-end">
							<Button variant="outline" asChild>
								<Link href="/results">View All Results</Link>
							</Button>
						</CardFooter>
					</Card>
				</>
			)}
		</div>
	);
}
