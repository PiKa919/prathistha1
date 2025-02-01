import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Crown, Phone, Mail, BadgeIcon as IdCard, BookOpen, GraduationCap } from "lucide-react"

export interface Participant {
  fullName: string
  prn: string
  class: string
  branch: string
  email: string
  phoneNo: string
}

export default function ParticipantDetails({
  participants,
  setParticipants,
  teamSize,
  teamLeader,
  setTeamLeader,
  registrationType,
}: {
  participants: Participant[]
  setParticipants: (participants: Participant[]) => void
  teamSize: number
  teamLeader: number | null
  setTeamLeader: (index: number | null) => void
  registrationType: "single" | "team"
}) {
  const handleInputChange = (index: number, field: keyof Participant, value: string) => {
    const updatedParticipants = [...participants]
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value }
    setParticipants(updatedParticipants)
  }

  const handleLeaderChange = (index: number) => {
    setTeamLeader(index)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <User className="w-5 h-5" />
        <span>{registrationType === "single" ? "Participant Details" : "Team Details"}</span>
      </h2>
      {[...Array(teamSize)].map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded">
          <h3 className="font-medium flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{registrationType === "single" ? "Participant" : `Team Member ${index + 1}`}</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`fullname-${index}`} className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </Label>
              <Input
                id={`fullname-${index}`}
                value={participants[index]?.fullName || ""}
                onChange={(e) => handleInputChange(index, "fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`prn-${index}`} className="flex items-center space-x-2">
                <IdCard className="w-4 h-4" />
                <span>PRN</span>
              </Label>
              <Input
                id={`prn-${index}`}
                value={participants[index]?.prn || ""}
                onChange={(e) => handleInputChange(index, "prn", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`class-${index}`} className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Class</span>
              </Label>
              <Input
                id={`class-${index}`}
                value={participants[index]?.class || ""}
                onChange={(e) => handleInputChange(index, "class", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`branch-${index}`} className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Branch</span>
              </Label>
              <Input
                id={`branch-${index}`}
                value={participants[index]?.branch || ""}
                onChange={(e) => handleInputChange(index, "branch", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`email-${index}`} className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Label>
              <Input
                id={`email-${index}`}
                type="email"
                value={participants[index]?.email || ""}
                onChange={(e) => handleInputChange(index, "email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`phone-${index}`} className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number</span>
              </Label>
              <Input
                id={`phone-${index}`}
                type="tel"
                value={participants[index]?.phoneNo || ""}
                onChange={(e) => handleInputChange(index, "phoneNo", e.target.value)}
              />
            </div>
          </div>
          {registrationType === "team" && teamSize > 1 && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`leader-${index}`}
                checked={teamLeader === index}
                onCheckedChange={() => handleLeaderChange(index)}
              />
              <Label htmlFor={`leader-${index}`} className="flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span>Team Leader</span>
              </Label>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

