"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLeague } from "@/contexts/league-context";

export function TopPredictors() {
	const { selectedLeague } = useLeague();

	if (!selectedLeague) return null;

	const topPredictors = Array.from(selectedLeague.userScores.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5);

	return (
		<div className="space-y-4">
			{topPredictors.map(([user, points], i) => (
				<div
					key={user.id}
					className={cn(
						"flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted/20",
						i === 0
							? "bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10"
							: i === 1
							? "bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-950/20 dark:to-slate-900/10"
							: i === 2
							? "bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10"
							: ""
					)}
				>
					<div className="flex items-center gap-3">
						<div className="w-8 text-center font-bold">
							{i === 0 ? (
								<Trophy className="h-5 w-5 text-amber-500" />
							) : i === 1 ? (
								<Trophy className="h-5 w-5 text-slate-400" />
							) : i === 2 ? (
								<Trophy className="h-5 w-5 text-orange-600" />
							) : (
								i + 1
							)}
						</div>
						<Image
							src={user.picture || "/placeholder.svg"}
							alt={user.name}
							width={32}
							height={32}
							className="rounded-full"
						/>
						<span className="font-medium">{user.name}</span>
					</div>
					<div
						className={cn(
							"font-bold px-3 py-1 rounded-full text-sm",
							i === 0
								? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
								: i === 1
								? "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
								: i === 2
								? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
								: "bg-muted text-muted-foreground"
						)}
					>
						{points} pts
					</div>
				</div>
			))}
		</div>
	);
}
