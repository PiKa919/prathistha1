import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Users } from "lucide-react"

export default function TeamSize({
  teamSize,
  setTeamSize,
  maxTeamSize,
}: {
  teamSize: number
  setTeamSize: (size: number) => void
  maxTeamSize: number
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <Users className="w-5 h-5" />
        <span>Team Size</span>
      </h2>
      <div className="space-y-2">
        <Label htmlFor="team-size" className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Number of team members</span>
        </Label>
        <Select value={teamSize.toString()} onValueChange={(value) => setTeamSize(Number.parseInt(value))}>
          <SelectTrigger id="team-size">
            <SelectValue placeholder="Select team size" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(maxTeamSize)].map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1} {i === 0 ? "member" : "members"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

