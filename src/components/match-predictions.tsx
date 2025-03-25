"use client"

import { useState } from "react"
import Image from "next/image"
import { CalendarClock, CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

// Mock upcoming matches data
const upcomingMatches = [
  {
    id: "1",
    team1: { id: "t1", name: "Natus Vincere", logo: "/placeholder.svg?height=60&width=60" },
    team2: { id: "t2", name: "FaZe Clan", logo: "/placeholder.svg?height=60&width=60" },
    date: "2023-07-15T14:00:00Z",
    bo: 3,
    tournament: "IEM Cologne 2023",
    points: 10,
  },
  {
    id: "2",
    team1: { id: "t3", name: "Team Liquid", logo: "/placeholder.svg?height=60&width=60" },
    team2: { id: "t4", name: "Vitality", logo: "/placeholder.svg?height=60&width=60" },
    date: "2023-07-15T17:30:00Z",
    bo: 3,
    tournament: "IEM Cologne 2023",
    points: 10,
  },
  {
    id: "3",
    team1: { id: "t5", name: "G2 Esports", logo: "/placeholder.svg?height=60&width=60" },
    team2: { id: "t6", name: "Astralis", logo: "/placeholder.svg?height=60&width=60" },
    date: "2023-07-16T12:00:00Z",
    bo: 3,
    tournament: "IEM Cologne 2023",
    points: 15,
  },
]

export function MatchPredictions() {
  const [predictions, setPredictions] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleTeamSelect = (matchId, teamId) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: teamId,
    }))
  }

  const handleSubmitPredictions = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would submit the predictions to your backend
    console.log("Submitting predictions:", predictions)

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const formatMatchTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
                    {match.points} points
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div
                    className={cn(
                      "flex-1 flex flex-col items-center gap-3 p-4 rounded-lg cursor-pointer border-2 transition-all",
                      predictions[match.id] === match.team1.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-transparent hover:border-muted hover:bg-muted/20",
                    )}
                    onClick={() => handleTeamSelect(match.id, match.team1.id)}
                  >
                    <Image
                      src={match.team1.logo || "/placeholder.svg"}
                      alt={match.team1.name}
                      width={60}
                      height={60}
                      className={cn(
                        "rounded-full transition-all",
                        predictions[match.id] === match.team1.id
                          ? "ring-2 ring-primary ring-offset-2 scale-110"
                          : "hover:scale-105",
                      )}
                    />
                    <span className="text-lg font-medium text-center">{match.team1.name}</span>
                  </div>

                  <div className="text-center">
                    <div className="text-xl font-bold">VS</div>
                    <div className="text-sm text-muted-foreground">BO{match.bo}</div>
                  </div>

                  <div
                    className={cn(
                      "flex-1 flex flex-col items-center gap-3 p-4 rounded-lg cursor-pointer border-2 transition-all",
                      predictions[match.id] === match.team2.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-transparent hover:border-muted hover:bg-muted/20",
                    )}
                    onClick={() => handleTeamSelect(match.id, match.team2.id)}
                  >
                    <Image
                      src={match.team2.logo || "/placeholder.svg"}
                      alt={match.team2.name}
                      width={60}
                      height={60}
                      className={cn(
                        "rounded-full transition-all",
                        predictions[match.id] === match.team2.id
                          ? "ring-2 ring-primary ring-offset-2 scale-110"
                          : "hover:scale-105",
                      )}
                    />
                    <span className="text-lg font-medium text-center">{match.team2.name}</span>
                  </div>
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
              : "",
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
  )
}

