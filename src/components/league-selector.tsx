"use client"

import { useState } from "react"
import { Check, ChevronDown, Trophy, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Mock leagues data with tournament info
const leagues = [
  { id: "1", name: "Pro Predictors", tournament: "IEM Cologne 2023", active: true, current: true },
  { id: "2", name: "CS2 Masters", tournament: "IEM Cologne 2023", active: true, current: false },
  { id: "3", name: "Office League", tournament: "ESL Pro League S18", active: true, current: false },
  { id: "4", name: "Friends Group", tournament: "ESL Pro League S18", active: true, current: false },
  { id: "5", name: "University Team", tournament: "BLAST Premier Fall", active: true, current: false },
  { id: "6", name: "Old School", tournament: "PGL Major Stockholm", active: false, current: false },
  { id: "7", name: "Legends", tournament: "ESL Pro League S17", active: false, current: false },
]

export function LeagueSelector() {
  const [selectedLeague, setSelectedLeague] = useState(leagues.find((league) => league.current))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
          <Trophy className="h-4 w-4" />
          <span className="truncate">
            {selectedLeague ? (
              <>
                {selectedLeague.name} <span className="text-muted-foreground">({selectedLeague.tournament})</span>
              </>
            ) : (
              "Select League"
            )}
          </span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Active Leagues</DropdownMenuLabel>
        <DropdownMenuGroup>
          {leagues
            .filter((league) => league.active)
            .map((league) => (
              <DropdownMenuItem key={league.id} onClick={() => setSelectedLeague(league)} className="cursor-pointer">
                <span className={cn("mr-2", league.id === selectedLeague?.id ? "opacity-100" : "opacity-0")}>
                  <Check className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span>{league.name}</span>
                  <span className="text-xs text-muted-foreground">{league.tournament}</span>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Past Leagues</DropdownMenuLabel>
        <DropdownMenuGroup>
          {leagues
            .filter((league) => !league.active)
            .map((league) => (
              <DropdownMenuItem key={league.id} onClick={() => setSelectedLeague(league)} className="cursor-pointer">
                <span className={cn("mr-2", league.id === selectedLeague?.id ? "opacity-100" : "opacity-0")}>
                  <Check className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span>{league.name}</span>
                  <span className="text-xs text-muted-foreground">{league.tournament}</span>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
            <a href="/leagues">
              <Plus className="h-4 w-4 mr-2" />
              Create or Join League
            </a>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

