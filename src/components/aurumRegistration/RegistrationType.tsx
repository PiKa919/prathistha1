import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, User } from "lucide-react"

export default function RegistrationType({
  registrationType,
  setRegistrationType,
}: {
  registrationType: "single" | "team"
  setRegistrationType: (type: "single" | "team") => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Registration Type</h2>
      <RadioGroup value={registrationType} onValueChange={setRegistrationType as (value: string) => void}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="single" id="single" />
          <Label htmlFor="single" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Single</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="team" id="team" />
          <Label htmlFor="team" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Team</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

