"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock tournaments data
const tournaments = [
  {
    id: "1",
    name: "IEM Cologne 2023",
    logo: "/placeholder.svg?height=60&width=60",
    dates: "Jul 15 - Jul 30",
    teams: 16,
  },
  {
    id: "2",
    name: "ESL Pro League S18",
    logo: "/placeholder.svg?height=60&width=60",
    dates: "Aug 10 - Sep 5",
    teams: 24,
  },
  {
    id: "3",
    name: "BLAST Premier Fall",
    logo: "/placeholder.svg?height=60&width=60",
    dates: "Sep 15 - Oct 1",
    teams: 12,
  },
]

// Mock leagues data
const availableLeagues = [
  {
    id: "1",
    name: "Pro Predictors",
    tournament: "IEM Cologne 2023",
    tournamentId: "1",
    members: 12,
    owner: "JohnDoe",
    isPasswordProtected: true,
  },
  {
    id: "2",
    name: "CS2 Masters",
    tournament: "IEM Cologne 2023",
    tournamentId: "1",
    members: 8,
    owner: "CS2Pro",
    isPasswordProtected: true,
  },
  {
    id: "3",
    name: "Office League",
    tournament: "ESL Pro League S18",
    tournamentId: "2",
    members: 15,
    owner: "GameMaster",
    isPasswordProtected: true,
  },
  {
    id: "4",
    name: "Friends Group",
    tournament: "ESL Pro League S18",
    tournamentId: "2",
    members: 6,
    owner: "Predictor123",
    isPasswordProtected: false,
  },
  {
    id: "5",
    name: "University Team",
    tournament: "BLAST Premier Fall",
    tournamentId: "3",
    members: 20,
    owner: "ESportsFan",
    isPasswordProtected: true,
  },
]

export default function LeaguesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tournamentId = searchParams.get("tournament")

  const [activeTab, setActiveTab] = useState("join")
  const [selectedTournamentId, setSelectedTournamentId] = useState(tournamentId || "all")
  const [leagueName, setLeagueName] = useState("")
  const [leaguePassword, setLeaguePassword] = useState("")
  const [joinPassword, setJoinPassword] = useState("")
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [joinDialogOpen, setJoinDialogOpen] = useState(false)

  const filteredLeagues =
    selectedTournamentId === "all"
      ? availableLeagues
      : availableLeagues.filter((league) => league.tournamentId === selectedTournamentId)

  const handleCreateLeague = () => {
    // Here you would submit the new league to your backend
    console.log("Creating league:", {
      name: leagueName,
      password: leaguePassword,
      tournament: selectedTournamentId,
    })

    // Mock success - redirect to dashboard
    router.push("/dashboard")
  }

  const handleJoinLeague = () => {
    // Here you would submit the join request to your backend
    console.log("Joining league:", {
      leagueId: selectedLeague?.id,
      password: joinPassword,
    })

    // Close dialog and redirect to dashboard
    setJoinDialogOpen(false)
    router.push("/dashboard")
  }

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leagues</h1>
        <p className="text-muted-foreground">Create or join a prediction league</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="join">Join League</TabsTrigger>
          <TabsTrigger value="create">Create League</TabsTrigger>
        </TabsList>

        <TabsContent value="join" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Leagues</CardTitle>
              <CardDescription>Browse and join prediction leagues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="tournament-filter">Filter by Tournament</Label>
                <Select value={selectedTournamentId} onValueChange={setSelectedTournamentId}>
                  <SelectTrigger id="tournament-filter" className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tournaments</SelectItem>
                    {tournaments.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.id}>
                        {tournament.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredLeagues.length > 0 ? (
                  filteredLeagues.map((league) => (
                    <Card key={league.id} className="border">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{league.name}</CardTitle>
                            <CardDescription>{league.tournament}</CardDescription>
                          </div>
                          {league.isPasswordProtected && <Lock className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{league.members} members</span>
                        </div>
                        <div className="text-sm mt-2">
                          <span className="text-muted-foreground">Owner: </span>
                          <span>{league.owner}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Dialog
                          open={joinDialogOpen && selectedLeague?.id === league.id}
                          onOpenChange={(open) => {
                            setJoinDialogOpen(open)
                            if (!open) setJoinPassword("")
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              className="w-full"
                              onClick={() => {
                                setSelectedLeague(league)
                                if (league.isPasswordProtected) {
                                  setJoinDialogOpen(true)
                                } else {
                                  // Join without password
                                  console.log("Joining league without password:", league.id)
                                  router.push("/dashboard")
                                }
                              }}
                            >
                              Join League
                            </Button>
                          </DialogTrigger>

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Join {league.name}</DialogTitle>
                              <DialogDescription>
                                This league is password protected. Enter the password to join.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="password">League Password</Label>
                                <Input
                                  id="password"
                                  type="password"
                                  placeholder="Enter password"
                                  value={joinPassword}
                                  onChange={(e) => setJoinPassword(e.target.value)}
                                />
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleJoinLeague} disabled={!joinPassword}>
                                Join League
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="md:col-span-2 lg:col-span-3 p-8 text-center border rounded-lg">
                    <p className="text-muted-foreground">No leagues found for this tournament.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a New League</CardTitle>
              <CardDescription>Start your own prediction league and invite friends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="league-name">League Name</Label>
                <Input
                  id="league-name"
                  placeholder="Enter league name"
                  value={leagueName}
                  onChange={(e) => setLeagueName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="league-password">League Password (Optional)</Label>
                <Input
                  id="league-password"
                  type="password"
                  placeholder="Set a password for your league"
                  value={leaguePassword}
                  onChange={(e) => setLeaguePassword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Setting a password will make your league private. Share the password with friends to let them join.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tournament-select">Select Tournament</Label>
                <Select value={selectedTournamentId} onValueChange={setSelectedTournamentId}>
                  <SelectTrigger id="tournament-select" className="w-full">
                    <SelectValue placeholder="Select tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournaments.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.id}>
                        {tournament.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleCreateLeague}
                disabled={!leagueName || !selectedTournamentId || selectedTournamentId === "all"}
              >
                Create League
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

