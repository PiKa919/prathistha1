"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import RegistrationForm from "../page"

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

export default function EventRegistrationManager() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [showForm, setShowForm] = useState(true)

  // Load selected events from local storage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("selectedEvents")
    if (savedEvents) {
      setSelectedEvents(JSON.parse(savedEvents))
    }
  }, [])

  // Save selected events to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("selectedEvents", JSON.stringify(selectedEvents))
  }, [selectedEvents])

  const toggleEvent = (eventName: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName) ? prev.filter((e) => e !== eventName) : [...prev, eventName]
    )
  }

  const toggleAllEvents = () => {
    setSelectedEvents((prev) => (prev.length === events.length ? [] : events.map((e) => e.name)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Event Registration Manager</h1>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="master-toggle" className="text-xl">
              Toggle All Events
            </Label>
            <Switch
              id="master-toggle"
              checked={selectedEvents.length === events.length}
              onCheckedChange={toggleAllEvents}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.name} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <Label htmlFor={`toggle-${event.name}`} className="flex items-center">
                  <span className="mr-2">{event.icon}</span>
                  {event.name}
                </Label>
                <Switch
                  id={`toggle-${event.name}`}
                  checked={selectedEvents.includes(event.name)}
                  onCheckedChange={() => toggleEvent(event.name)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)} variant="outline">
            {showForm ? "Hide Registration Form" : "Show Registration Form"}
          </Button>
        </div>

        <RegistrationForm  />
      </div>
    </div>
  )
}