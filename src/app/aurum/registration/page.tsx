"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import RegistrationType from "@/components/aurumRegistration/RegistrationType"
import EventSelection from "@/components/aurumRegistration/EventSelection"
import TeamSize from "@/components/aurumRegistration/TeamSize"
import ParticipantDetails from "@/components/aurumRegistration/ParticipantDetails"
import Payment from "@/components/aurumRegistration/Payment"
import { Trophy } from "lucide-react"


interface Participant {
    fullName: string
    prn: string
    class: string
    branch: string
    email: string
    phoneNo: string
  }
  
export default function EventRegistrationForm() {
  const [step, setStep] = useState(1)
  const [registrationType, setRegistrationType] = useState<"single" | "team">("single")
  const [selectedEvent, setSelectedEvent] = useState("")
  const [teamSize, setTeamSize] = useState(1)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [teamLeader, setTeamLeader] = useState<number | null>(null)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
//   const [showSuccess, setShowSuccess] = useState(false)

  const nextStep = () => {
    if (step === 2 && registrationType === "single") {
      setStep(4)
    } else {
      setStep(step + 1)
    }
  }
  const prevStep = () => {
    if (step === 4 && registrationType === "single") {
      setStep(2)
    } else {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log({
      registrationType,
      selectedEvent,
      teamSize,
      participants,
      teamLeader,
      paymentScreenshot,
    })
   
    // Reset form after 5 seconds
    setTimeout(() => {
      setStep(1)
      setRegistrationType("single")
      setSelectedEvent("")
      setTeamSize(1)
      setParticipants([])
      setTeamLeader(null)
      setPaymentScreenshot(null)
      
    }, 5000)
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
    <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-6 h-6" />
                <span>Event Registration</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            {step === 1 && (
                <RegistrationType registrationType={registrationType} setRegistrationType={setRegistrationType} />
            )}
            {step === 2 && <EventSelection selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />}
            {step === 3 && registrationType === "team" && <TeamSize teamSize={teamSize} setTeamSize={setTeamSize} />}
            {step === 4 && (
                <ParticipantDetails
                    participants={participants}
                    setParticipants={setParticipants}
                    teamSize={registrationType === "team" ? teamSize : 1}
                    teamLeader={teamLeader}
                    setTeamLeader={setTeamLeader}
                    registrationType={registrationType}
                />
            )}
            {step === 5 && <Payment paymentScreenshot={paymentScreenshot} setPaymentScreenshot={setPaymentScreenshot} />}
        </CardContent>
        <CardFooter className="flex justify-between">
            {step > 1 && <Button onClick={prevStep}>Previous</Button>}
            {step < 5 ? <Button onClick={nextStep}>Next</Button> : <Button onClick={handleSubmit}>Register</Button>}
        </CardFooter>
    </Card>
</div>


  )
}

