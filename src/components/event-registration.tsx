'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card" // Removed CardHeader
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, AlertCircle } from 'lucide-react'
import Image from 'next/image' // Added import for next/image

const gameContent = {
  bgmi: {
    name: "BGMI Tournament",
    banner: "/esports/bgmi-banner.jpg",
    description: "Battle Grounds Mobile India tournament featuring intense battle royale action.",
    rules: [
      "Squad size: 4 players",
      "Device: Mobile only",
      "Emulators not allowed",
      "Points system: Kills + Placement points",
      "Three matches per round",
      "Top 16 teams qualify for finals"
    ],
    startDate: "March 15, 2024 - 10:00 AM",
    endDate: "March 16, 2024 - 6:00 PM",
    location: "Online",
    eventHead: "John Doe",
    eventCoHead: "Jane Smith"
  },
  valorant: {
    name: "Valorant Championship",
    banner: "/esports/valo-banner.jpg",
    description: "Competitive 5v5 tactical shooter tournament with elimination rounds.",
    rules: [
      "Team size: 5 players",
      "Platform: PC only",
      "Best of 3 matches",
      "Map pool: All current competitive maps",
      "Standard competitive rules apply",
      "Anti-cheat required"
    ],
    startDate: "March 20, 2024 - 2:00 PM",
    endDate: "March 21, 2024 - 8:00 PM",
    location: "Online",
    eventHead: "Alex Wilson",
    eventCoHead: "Sarah Parker"
  },
  fifa: {
    name: "FIFA Tournament",
    banner: "/esports/fifa-banner.jpg",
    description: "1v1 FIFA tournament with knockout stages.",
    rules: [
      "1v1 matches",
      "Platform: PS5/Xbox Series X",
      "Default teams only",
      "No custom formations",
      "90-minute games",
      "Double elimination format"
    ],
    startDate: "March 25, 2024 - 11:00 AM",
    endDate: "March 25, 2024 - 7:00 PM",
    location: "Gaming Arena, Main Campus",
    eventHead: "Mike Johnson",
    eventCoHead: "Chris Brown"
  }
}

interface EventRegistrationProps {
  gameId: string | null;
}

export default function EventRegistration({ gameId }: EventRegistrationProps) {
  if (!gameId || !gameContent[gameId as keyof typeof gameContent]) {
    return null;
  }

  const content = gameContent[gameId as keyof typeof gameContent];

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 light:bg-white rounded-lg overflow-hidden h-[32rem]">
      <div className="relative h-32 bg-sky-900 light:bg-sky-100 overflow-hidden">
        <Image
          src={content.banner}
          alt={content.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 light:bg-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-gray-700 light:bg-white p-3 rounded-lg text-center min-w-[80px]">
            <div className="text-sm text-red-400 light:text-red-600 font-medium">March</div>
            <div className="text-2xl font-bold text-white light:text-gray-900">2024</div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white light:text-gray-900">{content.name}</h1>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="font-medium text-gray-200 light:text-gray-900">Registration Open</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Leaderboard</Button>
          <Button variant="destructive">Register Now</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 p-3 h-[calc(32rem-160px)] overflow-y-auto bg-gray-900 light:bg-white">
        <Card className="md:col-span-2 h-full bg-gray-800 border-gray-700 light:bg-white light:border-gray-200">
          <CardContent className="p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-white light:text-gray-900">Event Description:</h2>
              <p className="text-gray-300 light:text-gray-600">{content.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white light:text-gray-900">
                <AlertCircle className="h-5 w-5" />
                Rules
              </h2>
              <ul className="space-y-3 text-gray-300 light:text-gray-600">
                {content.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Card className="bg-gray-800 border-gray-700 light:bg-white light:border-gray-200">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white light:text-gray-900">
                <Clock className="h-5 w-5" />
                Date & Time
              </h2>
              <div className="space-y-2 text-gray-300 light:text-gray-600">
                <p>From: {content.startDate}</p>
                <p>To: {content.endDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 light:bg-white light:border-gray-200">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white light:text-gray-900">
                <MapPin className="h-5 w-5" />
                Location - {content.location}
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 light:bg-white light:border-gray-200">
            <CardContent className="p-4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-white light:text-gray-900">EVENT HEAD</h2>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>EH</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-200 light:text-gray-900">{content.eventHead}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4 text-white light:text-gray-900">EVENT CO-HEAD</h2>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>EC</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-200 light:text-gray-900">{content.eventCoHead}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

