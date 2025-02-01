import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Trophy } from "lucide-react"

export interface Event {
  name: string
  icon: string
  type: "single" | "team"
}

const events: Event[] = [
  { name: "Crime Scene Investigation", icon: "🕵️", type: "team" },
  { name: "Escape Room", icon: "🚪", type: "team" },
  { name: "AR Treasure Hunt", icon: "🗺️", type: "team" },
  { name: "Giant Jenga", icon: "🧱", type: "single" },
  { name: "Glow-in-the-Dark Pickleball", icon: "🏓", type: "single" },
  { name: "Laser Maze", icon: "🔦", type: "single" },
  { name: "BGMI Tournament", icon: "📱", type: "team" },
  { name: "Valorant Championship", icon: "🎮", type: "team" },
  { name: "Robo Sumo", icon: "🤖", type: "team" },
  { name: "Robo Race", icon: "🏎️", type: "team" },
  { name: "Cozmo Clench", icon: "🦾", type: "single" },
  { name: "Technokagaz", icon: "📄", type: "single" },
  { name: "Tech Expo", icon: "🔬", type: "single" },
  { name: "Code of Duty", icon: "💻", type: "single" },
  { name: "Cybersecurity Challenge", icon: "🔒", type: "single" },
  { name: "FIFA Tournament", icon: "⚽", type: "single" },
  { name: "VR Room", icon: "🥽", type: "single" },
  { name: "Mortal Kombat Tournament", icon: "🥋", type: "single" },
  { name: "Midtown Madness", icon: "🏙️", type: "team" },
]

export default function EventSelection({
  selectedEvent,
  setSelectedEvent,
}: {
  selectedEvent: string
  setSelectedEvent: (event: string) => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <Trophy className="w-5 h-5" />
        <span>Select Event</span>
      </h2>
      <div className="space-y-2">
        <Label htmlFor="event">Event</Label>
        <Select value={selectedEvent} onValueChange={setSelectedEvent}>
          <SelectTrigger id="event">
            <SelectValue placeholder="Select an event" />
          </SelectTrigger>
          <SelectContent>
            {events.map((event) => (
              <SelectItem key={event.name} value={event.name}>
                <span className="flex items-center space-x-2">
                  <span>{event.icon}</span>
                  <span>{event.name}</span>
                  <span className="text-xs text-gray-500">({event.type})</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

