"use client"

import { useState } from "react"
import Image from "next/image"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

// Mock teams data
const allTeams = [
  { id: "t1", name: "Natus Vincere", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t2", name: "FaZe Clan", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t3", name: "Team Liquid", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t4", name: "Vitality", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t5", name: "G2 Esports", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t6", name: "Astralis", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t7", name: "Heroic", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t8", name: "ENCE", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t9", name: "Cloud9", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t10", name: "Complexity", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t11", name: "MOUZ", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t12", name: "BIG", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t13", name: "Fnatic", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t14", name: "OG", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t15", name: "FURIA", logo: "/placeholder.svg?height=48&width=48" },
  { id: "t16", name: "Evil Geniuses", logo: "/placeholder.svg?height=48&width=48" },
]

export function PlayoffPredictions({ isLocked = false }) {
  const [availableTeams, setAvailableTeams] = useState(allTeams)
  const [selectedTeams, setSelectedTeams] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const handleDragEnd = (result) => {
    if (isLocked || !result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      const items = Array.from(source.droppableId === "available" ? availableTeams : selectedTeams)
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)

      if (source.droppableId === "available") {
        setAvailableTeams(items)
      } else {
        setSelectedTeams(items)
      }
    } else {
      // Moving between lists
      const sourceItems = Array.from(source.droppableId === "available" ? availableTeams : selectedTeams)
      const destItems = Array.from(destination.droppableId === "available" ? availableTeams : selectedTeams)
      const [movedItem] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, movedItem)

      setAvailableTeams(source.droppableId === "available" ? sourceItems : destItems)
      setSelectedTeams(source.droppableId === "selected" ? sourceItems : destItems)
    }
  }

  const handleSubmit = () => {
    // Here you would submit the playoff predictions to your backend
    console.log(
      "Playoff predictions:",
      selectedTeams.map((team) => team.id),
    )
    setSubmitted(true)
  }

  if (isLocked && submitted) {
    return (
      <div className="space-y-6">
        <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Predictions Submitted!</AlertTitle>
          <AlertDescription>
            Your playoff predictions have been saved. Results will be available after the playoffs begin.
          </AlertDescription>
        </Alert>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Your Playoff Predictions</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {selectedTeams.map((team, index) => (
              <div
                key={team.id}
                className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <Image
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isLocked) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">Predictions are now locked</h3>
        <p className="text-muted-foreground mb-6">
          The deadline for submitting playoff predictions has passed. Results will be available after the playoffs
          begin.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {submitted ? (
        <Alert className="md:col-span-2 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Predictions Submitted!</AlertTitle>
          <AlertDescription>Your playoff predictions have been saved. Good luck!</AlertDescription>
        </Alert>
      ) : null}

      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-4">Available Teams</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="available">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 min-h-[400px]">
                {availableTeams.map((team, index) => (
                  <Draggable key={team.id} draggableId={team.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg border"
                      >
                        <Image
                          src={team.logo || "/placeholder.svg"}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <span className="font-medium">{team.name}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-4">Your Playoff Predictions</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="selected">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 min-h-[400px]">
                {selectedTeams.map((team, index) => (
                  <Draggable key={team.id} draggableId={team.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <Image
                          src={team.logo || "/placeholder.svg"}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <span className="font-medium">{team.name}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-4">
          <Button onClick={handleSubmit} disabled={selectedTeams.length !== 8 || submitted} className="w-full">
            {selectedTeams.length === 8
              ? "Submit Playoff Predictions"
              : `Select ${8 - selectedTeams.length} more team${selectedTeams.length === 7 ? "" : "s"}`}
          </Button>
        </div>
      </div>
    </div>
  )
}

