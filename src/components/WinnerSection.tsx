import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import type React from "react"

interface Participant {
  name?: string
  branch: string
  year: number
}

type SportType = "indoor" | "outdoor"
type CategoryType = "single" | "double" | "team"

interface SportData {
  gender: "boys" | "girls" | "mixed";
  icon: string
  type: SportType
  category: CategoryType
  winner: Participant
  runnerUp: Participant
}

interface WinnerSectionProps {
  sportsData?: Record<string, SportData>
}

export function WinnerSection({ sportsData = {} }: WinnerSectionProps) {
  const sportsArray = Object.entries(sportsData).map(([name, data]) => ({ name, ...data }))

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>🏆 Winners & Runners-Up 🧈</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="outdoor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="outdoor">🌳 Outdoor Games</TabsTrigger>
            <TabsTrigger value="indoor">🏠 Indoor Games</TabsTrigger>
          </TabsList>
          <TabsContent value="outdoor">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sportsArray
                .filter((data) => data.type === "outdoor")
                .map((data) => (
                  <WinnerCard key={data.name} data={data} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="indoor">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sportsArray
                .filter((data) => data.type === "indoor")
                .map((data) => (
                  <WinnerCard key={data.name} data={data} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface WinnerCardProps {
  data: SportData & { name: string }
}

function WinnerCard({ data }: WinnerCardProps) {
  const isTeamGame = !data.winner.name

  const formatGender = (gender: "boys" | "girls" | "mixed") => {
    const genderMap = {
      boys: {  icon: "👨" },
      girls: {  icon: "👩" },
      mixed: {  icon: "👥" }
    };
    
    return genderMap[gender] || { text: "Unknown", icon: "❓" };
  };

  const winnerGender = formatGender(data.gender);
  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
        <span className="text-2xl">{data.icon}</span>
        {data.name} ({winnerGender.icon}) - <strong>{data.category}</strong>
        {isTeamGame ? (
            <p>🤝 <strong>Team</strong></p>
          ) : <p><strong>Single</strong></p>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="font-bold text-green-600">🏆 Winner</p>
          {isTeamGame ? (
            <>
              <p>
                🏢 <strong>Branch:</strong> {data.winner.branch}
              </p>
              <p>
                🎓 <strong>Year:</strong> {data.winner.year}
              </p>
            </>
          ) : (
            <>
              <p>
                🙋 <strong>Name:</strong> {data.winner.name}
              </p>
              <p>
                🏢 <strong>Branch:</strong> {data.winner.branch}
              </p>
              <p>
                🎓 <strong>Year:</strong> {data.winner.year}
              </p>
            </>
          )}

          <hr className="my-2 border-dashed" />

          <p className="font-bold text-blue-500">🧈 Runner-Up</p>
          {isTeamGame ? (
            <>
              <p>
                🏢 <strong>Branch:</strong> {data.runnerUp.branch}
              </p>
              <p>
                🎓 <strong>Year:</strong> {data.runnerUp.year}
              </p>
            </>
          ) : (
            <>
              <p>
                🙋 <strong>Name:</strong> {data.runnerUp.name}
              </p>
              <p>
                🏢 <strong>Branch:</strong> {data.runnerUp.branch}
              </p>
              <p>
                🎓 <strong>Year:</strong> {data.runnerUp.year}
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
