"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ChevronDown, ChevronUp, X, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Mock recent results data with other users' predictions
const recentResults = [
  {
    date: "2023-07-10T00:00:00Z",
    matches: [
      {
        id: "1",
        team1: { id: "t1", name: "Natus Vincere", logo: "/placeholder.svg?height=32&width=32", score: 2 },
        team2: { id: "t2", name: "FaZe Clan", logo: "/placeholder.svg?height=32&width=32", score: 1 },
        prediction: "t1",
        points: 10,
        otherPredictions: [
          {
            userId: "u1",
            name: "JohnDoe",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t1",
            points: 10,
          },
          { userId: "u2", name: "CS2Pro", avatar: "/placeholder.svg?height=32&width=32", prediction: "t1", points: 10 },
          {
            userId: "u3",
            name: "Predictor123",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t2",
            points: 0,
          },
          {
            userId: "u4",
            name: "ESportsFan",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t1",
            points: 10,
          },
          {
            userId: "u5",
            name: "GameMaster",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t2",
            points: 0,
          },
        ],
      },
      {
        id: "4",
        team1: { id: "t7", name: "Heroic", logo: "/placeholder.svg?height=32&width=32", score: 2 },
        team2: { id: "t8", name: "ENCE", logo: "/placeholder.svg?height=32&width=32", score: 0 },
        prediction: "t7",
        points: 10,
        otherPredictions: [
          {
            userId: "u1",
            name: "JohnDoe",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t7",
            points: 10,
          },
          { userId: "u2", name: "CS2Pro", avatar: "/placeholder.svg?height=32&width=32", prediction: "t7", points: 10 },
          {
            userId: "u3",
            name: "Predictor123",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t7",
            points: 10,
          },
          {
            userId: "u4",
            name: "ESportsFan",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t8",
            points: 0,
          },
          {
            userId: "u5",
            name: "GameMaster",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t7",
            points: 10,
          },
        ],
      },
    ],
  },
  {
    date: "2023-07-09T00:00:00Z",
    matches: [
      {
        id: "2",
        team1: { id: "t3", name: "Team Liquid", logo: "/placeholder.svg?height=32&width=32", score: 0 },
        team2: { id: "t4", name: "Vitality", logo: "/placeholder.svg?height=32&width=32", score: 2 },
        prediction: "t3",
        points: 0,
        otherPredictions: [
          {
            userId: "u1",
            name: "JohnDoe",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t4",
            points: 10,
          },
          { userId: "u2", name: "CS2Pro", avatar: "/placeholder.svg?height=32&width=32", prediction: "t3", points: 0 },
          {
            userId: "u3",
            name: "Predictor123",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t4",
            points: 10,
          },
          {
            userId: "u4",
            name: "ESportsFan",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t3",
            points: 0,
          },
          {
            userId: "u5",
            name: "GameMaster",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t4",
            points: 10,
          },
        ],
      },
      {
        id: "5",
        team1: { id: "t9", name: "Cloud9", logo: "/placeholder.svg?height=32&width=32", score: 1 },
        team2: { id: "t10", name: "Complexity", logo: "/placeholder.svg?height=32&width=32", score: 2 },
        prediction: "t9",
        points: 0,
        otherPredictions: [
          {
            userId: "u1",
            name: "JohnDoe",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t10",
            points: 10,
          },
          { userId: "u2", name: "CS2Pro", avatar: "/placeholder.svg?height=32&width=32", prediction: "t9", points: 0 },
          {
            userId: "u3",
            name: "Predictor123",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t10",
            points: 10,
          },
          {
            userId: "u4",
            name: "ESportsFan",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t9",
            points: 0,
          },
          {
            userId: "u5",
            name: "GameMaster",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t10",
            points: 10,
          },
        ],
      },
    ],
  },
  {
    date: "2023-07-08T00:00:00Z",
    matches: [
      {
        id: "3",
        team1: { id: "t5", name: "G2 Esports", logo: "/placeholder.svg?height=32&width=32", score: 2 },
        team2: { id: "t6", name: "Astralis", logo: "/placeholder.svg?height=32&width=32", score: 0 },
        prediction: "t5",
        points: 10,
        otherPredictions: [
          {
            userId: "u1",
            name: "JohnDoe",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t5",
            points: 10,
          },
          { userId: "u2", name: "CS2Pro", avatar: "/placeholder.svg?height=32&width=32", prediction: "t5", points: 10 },
          {
            userId: "u3",
            name: "Predictor123",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t5",
            points: 10,
          },
          {
            userId: "u4",
            name: "ESportsFan",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t6",
            points: 0,
          },
          {
            userId: "u5",
            name: "GameMaster",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t5",
            points: 10,
          },
        ],
      },
      {
        id: "6",
        team1: { id: "t11", name: "MOUZ", logo: "/placeholder.svg?height=32&width=32", score: 2 },
        team2: { id: "t12", name: "BIG", logo: "/placeholder.svg?height=32&width=32", score: 1 },
        prediction: "t11",
        points: 10,
        otherPredictions: [
          {
            userId: "u1",
            name: "JohnDoe",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t11",
            points: 10,
          },
          {
            userId: "u2",
            name: "CS2Pro",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t11",
            points: 10,
          },
          {
            userId: "u3",
            name: "Predictor123",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t12",
            points: 0,
          },
          {
            userId: "u4",
            name: "ESportsFan",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t11",
            points: 10,
          },
          {
            userId: "u5",
            name: "GameMaster",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t12",
            points: 0,
          },
        ],
      },
      {
        id: "7",
        team1: { id: "t13", name: "Fnatic", logo: "/placeholder.svg?height=32&width=32", score: 0 },
        team2: { id: "t14", name: "OG", logo: "/placeholder.svg?height=32&width=32", score: 2 },
        prediction: "t14",
        points: 10,
        otherPredictions: [
          {
            userId: "u1",
            name: "JohnDoe",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t14",
            points: 10,
          },
          { userId: "u2", name: "CS2Pro", avatar: "/placeholder.svg?height=32&width=32", prediction: "t13", points: 0 },
          {
            userId: "u3",
            name: "Predictor123",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t14",
            points: 10,
          },
          {
            userId: "u4",
            name: "ESportsFan",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t14",
            points: 10,
          },
          {
            userId: "u5",
            name: "GameMaster",
            avatar: "/placeholder.svg?height=32&width=32",
            prediction: "t13",
            points: 0,
          },
        ],
      },
    ],
  },
]

export function RecentResults() {
  const [expandedDays, setExpandedDays] = useState({})
  const [expandedPredictions, setExpandedPredictions] = useState({})

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const isPredictionCorrect = (match) => {
    if (match.team1.score > match.team2.score) {
      return match.prediction === match.team1.id
    } else {
      return match.prediction === match.team2.id
    }
  }

  const toggleDay = (date) => {
    setExpandedDays((prev) => ({
      ...prev,
      [date]: !prev[date],
    }))
  }

  const togglePredictions = (matchId) => {
    setExpandedPredictions((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }))
  }

  // Calculate total points for a day
  const getDayPoints = (matches) => {
    return matches.reduce((total, match) => total + match.points, 0)
  }

  return (
    <div className="space-y-6">
      {recentResults.map((day) => {
        const isExpanded = expandedDays[day.date] !== false // Default to expanded
        const dayPoints = getDayPoints(day.matches)

        return (
          <div key={day.date} className="rounded-lg overflow-hidden bg-card border">
            <div
              className={cn(
                "flex items-center justify-between p-4",
                dayPoints > 0 ? "bg-emerald-50/30 dark:bg-emerald-950/10" : "bg-muted/30",
              )}
            >
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{formatDate(day.date)}</h3>
                <Badge
                  variant={dayPoints > 0 ? "default" : "outline"}
                  className={dayPoints > 0 ? "bg-emerald-500" : ""}
                >
                  {dayPoints} points
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => toggleDay(day.date)}>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {isExpanded && (
              <div className="divide-y">
                {day.matches.map((match) => {
                  const correct = isPredictionCorrect(match)
                  const isPredictionsExpanded = expandedPredictions[match.id] || false

                  return (
                    <div key={match.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Match result and your prediction in one row */}
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center justify-between md:justify-start gap-2">
                            <div className="flex items-center gap-2">
                              <Image
                                src={match.team1.logo || "/placeholder.svg"}
                                alt={match.team1.name}
                                width={32}
                                height={32}
                                className={cn(
                                  "rounded-full",
                                  match.team1.score > match.team2.score ? "ring-2 ring-emerald-500 ring-offset-2" : "",
                                )}
                              />
                              <span className="font-medium hidden md:inline">{match.team1.name}</span>
                              <span className="font-medium md:hidden">{match.team1.name.substring(0, 3)}</span>
                            </div>

                            <div className="text-center font-bold mx-2">
                              {match.team1.score} - {match.team2.score}
                            </div>

                            <div className="flex items-center gap-2">
                              <Image
                                src={match.team2.logo || "/placeholder.svg"}
                                alt={match.team2.name}
                                width={32}
                                height={32}
                                className={cn(
                                  "rounded-full",
                                  match.team2.score > match.team1.score ? "ring-2 ring-emerald-500 ring-offset-2" : "",
                                )}
                              />
                              <span className="font-medium hidden md:inline">{match.team2.name}</span>
                              <span className="font-medium md:hidden">{match.team2.name.substring(0, 3)}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:justify-start gap-2 mt-2 md:mt-0">
                            <div
                              className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center",
                                correct
                                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                              )}
                            >
                              {correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </div>
                            <span className="text-sm">
                              Your pick: {match.prediction === match.team1.id ? match.team1.name : match.team2.name}
                            </span>
                            <Badge
                              variant={match.points > 0 ? "default" : "outline"}
                              className={match.points > 0 ? "bg-emerald-500" : ""}
                            >
                              {match.points} pts
                            </Badge>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 md:mt-0"
                          onClick={() => togglePredictions(match.id)}
                        >
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-xs">
                            {isPredictionsExpanded ? "Hide Predictions" : "Show Predictions"}
                          </span>
                        </Button>
                      </div>

                      {isPredictionsExpanded && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium flex items-center gap-2">
                                <Image
                                  src={match.team1.logo || "/placeholder.svg"}
                                  alt={match.team1.name}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />
                                {match.team1.name} Predictions
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                <TooltipProvider>
                                  {match.otherPredictions
                                    .filter((p) => p.prediction === match.team1.id)
                                    .map((user) => (
                                      <Tooltip key={user.userId}>
                                        <TooltipTrigger asChild>
                                          <div className="relative">
                                            <Avatar className="h-8 w-8 border-2 border-background">
                                              <AvatarImage src={user.avatar} alt={user.name} />
                                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            {user.points > 0 && (
                                              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                                                ✓
                                              </span>
                                            )}
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>
                                            {user.name}: {user.points} points
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    ))}
                                </TooltipProvider>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm font-medium flex items-center gap-2">
                                <Image
                                  src={match.team2.logo || "/placeholder.svg"}
                                  alt={match.team2.name}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />
                                {match.team2.name} Predictions
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                <TooltipProvider>
                                  {match.otherPredictions
                                    .filter((p) => p.prediction === match.team2.id)
                                    .map((user) => (
                                      <Tooltip key={user.userId}>
                                        <TooltipTrigger asChild>
                                          <div className="relative">
                                            <Avatar className="h-8 w-8 border-2 border-background">
                                              <AvatarImage src={user.avatar} alt={user.name} />
                                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            {user.points > 0 && (
                                              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                                                ✓
                                              </span>
                                            )}
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>
                                            {user.name}: {user.points} points
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    ))}
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

