"use client"

import { RecentResults } from "@/components/recent-results"
import { LeagueSelector } from "@/components/league-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResultsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Past Results</h1>
          <p className="text-muted-foreground">View your prediction history and points earned</p>
        </div>
        <LeagueSelector />
      </div>

      <Card>
        <CardHeader className="bg-muted/30">
          <CardTitle>IEM Cologne 2023 Results</CardTitle>
          <CardDescription>Your prediction outcomes for recent matches</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <RecentResults />
        </CardContent>
      </Card>
    </div>
  )
}

