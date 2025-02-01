"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EventSelection, { type Event } from "@/components/aurumRegistration/EventSelection"
import TeamSize from "@/components/aurumRegistration/TeamSize"
import ParticipantDetails from "@/components/aurumRegistration/ParticipantDetails"
import Payment from "@/components/aurumRegistration/Payment"
import { SuccessModal } from "@/components/aurumRegistration/SuccessModal"
// import type { Participant } from "../types/registration"
import { Trophy } from "lucide-react"
interface Participant {
  fullName: string
  prn: string
  class: string
  branch: string
  email: string
  phoneNo: string
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

export default function EventRegistrationForm() {
  const [step, setStep] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState("")
  const [teamSize, setTeamSize] = useState(1)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [teamLeader, setTeamLeader] = useState<number | null>(null)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedEventType = events.find((event) => event.name === selectedEvent)?.type || "single"

  useEffect(() => {
    if (selectedEventType === "single") {
      setTeamSize(1)
    }
  }, [selectedEventType])

  const nextStep = () => {
    if (step === 1 && selectedEventType === "single") {
      setStep(3) // Skip team size selection for single events
    } else {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step === 3 && selectedEventType === "single") {
      setStep(1) // Go back to event selection for single events
    } else {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    console.log({
      selectedEvent,
      teamSize,
      participants,
      teamLeader,
      paymentScreenshot,
    })
    setShowSuccess(true)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccess(false)
    setStep(1)
    setSelectedEvent("")
    setTeamSize(1)
    setParticipants([])
    setTeamLeader(null)
    setPaymentScreenshot(null)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6" />
            <span>Event Registration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && <EventSelection selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />}
          {step === 2 && selectedEventType === "team" && (
            <TeamSize teamSize={teamSize} setTeamSize={setTeamSize} maxTeamSize={4} />
          )}
          {step === 3 && (
            <ParticipantDetails
              participants={participants}
              setParticipants={setParticipants}
              teamSize={teamSize}
              teamLeader={teamLeader}
              setTeamLeader={setTeamLeader}
              registrationType={selectedEventType}
            />
          )}
          {step === 4 && <Payment paymentScreenshot={paymentScreenshot} setPaymentScreenshot={setPaymentScreenshot} />}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && <Button onClick={prevStep}>Previous</Button>}
          {step < 4 ? <Button onClick={nextStep}>Next</Button> : <Button onClick={handleSubmit}>Register</Button>}
        </CardFooter>
      </Card>
      <SuccessModal isOpen={showSuccess} onClose={handleCloseSuccessModal} />
    </div>
  )
}

