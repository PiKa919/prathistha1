import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Trophy } from "lucide-react"

const events = [
  { name: "Crime Scene Investigation", icon: "🕵️" },
  { name: "Escape Room", icon: "🚪" },
  { name: "AR Treasure Hunt", icon: "🗺️" },
  { name: "Giant Jenga", icon: "🧱" },
  { name: "Glow-in-the-Dark Pickleball", icon: "🏓" },
  { name: "Laser Maze", icon: "🔦" },
  { name: "BGMI Tournament", icon: "📱" },
  { name: "Valorant Championship", icon: "🎮" },
  { name: "Robo Sumo", icon: "🤖" },
  { name: "Robo Race", icon: "🏎️" },
  { name: "Cozmo Clench", icon: "🦾" },
  { name: "Technokagaz", icon: "📄" },
  { name: "Tech Expo", icon: "🔬" },
  { name: "Code of Duty", icon: "💻" },
  { name: "Cybersecurity Challenge", icon: "🔒" },
  { name: "FIFA Tournament", icon: "⚽" },
  { name: "VR Room", icon: "🥽" },
  { name: "Mortal Kombat Tournament", icon: "🥋" },
  { name: "Midtown Madness", icon: "🏙️" },
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
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

