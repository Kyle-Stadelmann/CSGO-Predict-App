"use client"

import Image from "next/image"
import { Trophy } from "lucide-react"

import { cn } from "@/lib/utils"

// Mock top predictors data
const topPredictors = [
  { id: "1", name: "JohnDoe", avatar: "/placeholder.svg?height=32&width=32", points: 120, rank: 1 },
  { id: "2", name: "CS2Pro", avatar: "/placeholder.svg?height=32&width=32", points: 105, rank: 2 },
  { id: "3", name: "Predictor123", avatar: "/placeholder.svg?height=32&width=32", points: 90, rank: 3 },
  { id: "4", name: "ESportsFan", avatar: "/placeholder.svg?height=32&width=32", points: 85, rank: 4 },
  { id: "5", name: "GameMaster", avatar: "/placeholder.svg?height=32&width=32", points: 70, rank: 5 },
]

export function TopPredictors() {
  return (
    <div className="space-y-4">
      {topPredictors.map((predictor) => (
        <div
          key={predictor.id}
          className={cn(
            "flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted/20",
            predictor.rank === 1
              ? "bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10"
              : predictor.rank === 2
                ? "bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-950/20 dark:to-slate-900/10"
                : predictor.rank === 3
                  ? "bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10"
                  : "",
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 text-center font-bold">
              {predictor.rank === 1 ? (
                <Trophy className="h-5 w-5 text-amber-500" />
              ) : predictor.rank === 2 ? (
                <Trophy className="h-5 w-5 text-slate-400" />
              ) : predictor.rank === 3 ? (
                <Trophy className="h-5 w-5 text-orange-600" />
              ) : (
                predictor.rank
              )}
            </div>
            <Image
              src={predictor.avatar || "/placeholder.svg"}
              alt={predictor.name}
              width={32}
              height={32}
              className={cn(
                "rounded-full",
                predictor.rank === 1
                  ? "ring-2 ring-amber-500 ring-offset-2"
                  : predictor.rank === 2
                    ? "ring-2 ring-slate-400 ring-offset-2"
                    : predictor.rank === 3
                      ? "ring-2 ring-orange-600 ring-offset-2"
                      : "",
              )}
            />
            <span className="font-medium">{predictor.name}</span>
          </div>
          <div
            className={cn(
              "font-bold px-3 py-1 rounded-full text-sm",
              predictor.rank === 1
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                : predictor.rank === 2
                  ? "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
                  : predictor.rank === 3
                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                    : "bg-muted text-muted-foreground",
            )}
          >
            {predictor.points} pts
          </div>
        </div>
      ))}
    </div>
  )
}

