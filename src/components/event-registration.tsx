'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, AlertCircle } from 'lucide-react'
import Image from 'next/image'

const gameContent = {
  bgmi: {
    name: "BGMI Tournament",
    banner: "/esports/bgmi.webp",
    description: "🎮 Conquer the BGMI Battleground!\n\n📅 2nd - 12th Feb 2025\n📍 Shah & Anchor Kutchhi Engineering College\n👥 4+1 Squad | 16+ Eligibility\n\n🔥 Epic LAN Gaming & Prizes!\n💸 Register: ₹1000 (till 16th Jan) | ₹1500 (after)\n\n🔗 \nAre you ready to dominate?",
    rules: [
      "Squad size: 4 players",
      "Device: Mobile only",
      "Emulators not allowed",
      "Points system: Kills + Placement points",
      "Three matches per round",
      "Top 16 teams qualify for finals"
    ],
    startDate: "Feb 2, 2025 - 10:00 AM",
    endDate: "Feb 12, 2025 - 6:00 PM",
    location: "Online",
    eventHead: "Atharva: 9987858462",
    eventCoHead: "Jayesh: 8850416884"
  },
  valorant: {
    name: "Valorant Championship",
    banner: "/esports/valo-banner.jpg",
    description: "Join the Ultimate Valorant LAN Battle!\n\n📅 10th-12th Feb 2025\n📍 Shah & Anchor Kutchhi Engineering College\n👥 5v5 | 16+ | Thrilling Prizes\n\n💸 Register:\n• ₹1000/team (till 16th Jan)\n• ₹1500/team (after 16th Jan)\n\n🔗 Register Here",
    rules: [
      "Team size: 5 players",
      "Platform: PC only",
      "Best of 3 matches",
      "Map pool: All current competitive maps",
      "Standard competitive rules apply",
      "Anti-cheat required"
    ],
    startDate: "Feb 10, 2025 - 2:00 PM",
    endDate: "Feb 12, 2025 - 8:00 PM",
    location: "Online",
    eventHead: "Harsh: 8390073464",
    eventCoHead: "Neel: 7738002054"
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
    <div className="w-full max-w-4xl mx-auto bg-gray-900 light:bg-white rounded-lg overflow-hidden h-[75vh]">
      <div className="relative h-24 bg-sky-900 light:bg-sky-100 overflow-hidden">
        {gameId === 'fifa' ? (
          <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
            Coming Soon
          </div>
        ) : (
          <Image
            src={content.banner}
            alt={content.name}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 light:bg-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-gray-700 light:bg-white p-2 rounded-lg text-center min-w-[70px]">
            <div className="text-sm text-red-400 light:text-red-600 font-medium">Feb</div>
            <div className="text-xl font-bold text-white light:text-gray-900">2025</div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white light:text-gray-900">{content.name}</h1>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="font-medium text-gray-200 light:text-gray-900">Registration Open</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm">Leaderboard</Button>
          <Button variant="destructive" size="sm">Register Now</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 p-3 overflow-y-auto bg-gray-900 light:bg-white h-[calc(60vh-108px)]">
        <Card className="md:col-span-2 bg-gray-800 border-gray-700 light:bg-white light:border-gray-200">
          <CardContent className="p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-white light:text-gray-900">Event Description:</h2>
              <p className="text-gray-300 light:text-gray-600 whitespace-pre-line">{content.description}</p>
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
            <CardContent className="p-3">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white light:text-gray-900">
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
            <CardContent className="p-3">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white light:text-gray-900">
                <MapPin className="h-5 w-5" />
                Location - {content.location}
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 light:bg-white light:border-gray-200">
            <CardContent className="p-3">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-white light:text-gray-900">EVENT HEAD</h2>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/event-head-placeholder.svg" />
                      <AvatarFallback>EH</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-200 light:text-gray-900">{content.eventHead}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3 text-white light:text-gray-900">EVENT CO-HEAD</h2>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/event-cohead-placeholder.svg" />
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