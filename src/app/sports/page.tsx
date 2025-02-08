"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
// Remove unused Input import
import CarouselComponent from "@/components/ui/CarouselComponent"
// import SportsSchedule from "@/components/ui/SportsSchedule"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EnhancedTreeStyleBracket } from "@/components/ui/enhanced-tree-style-bracket"
import { WinnerSection } from "@/components/WinnerSection"

// Move bracket games type definition after the constant
const BRACKET_GAMES = [
  "Cricket",
  "Football",
  "Basketball",
  "Volleyball",
  "Table Tennis",
  "Badminton",
  "Chess",
  "Baseball",
  "Tennis",
] as const

type BracketGameType = (typeof BRACKET_GAMES)[number]

interface Game {
  name: BracketGameType
  description: string
  image: string
  status: string
  leaderboard: { rank: number; team: string; points: number }[]
  registrationLink?: string
  rulesLink?: string
  bracketLink?: string
}

// Since Form1, Form2, Form3, and related form functionality aren't used in this page,
// we can remove them and their related imports

const sports: Record<string, Array<Game>> = {
  inter: [
    {
      name: "Cricket",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `College ${String.fromCharCode(65 + i)}`,
        points: 500 - i * 5,
      })),
    },
    {
      name: "Football",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `College ${String.fromCharCode(65 + i)}`,
        points: 300 - i * 3,
      })),
    },
    {
      name: "Basketball",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `College ${String.fromCharCode(65 + i)}`,
        points: 400 - i * 4,
      })),
    },
    {
      name: "Volleyball",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `College ${String.fromCharCode(65 + i)}`,
        points: 350 - i * 3.5,
      })),
    },
    {
      name: "Table Tennis",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `College ${String.fromCharCode(65 + i)}`,
        points: 250 - i * 2.5,
      })),
    },
  ],
  intra: [
    {
      name: "Baseball",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `Team ${String.fromCharCode(65 + i)}`,
        points: 200 - i * 2,
      })),
    },
    {
      name: "Volleyball",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `Team ${String.fromCharCode(65 + i)}`,
        points: 250 - i * 2.5,
      })),
    },
    {
      name: "Tennis",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `Team ${String.fromCharCode(65 + i)}`,
        points: 150 - i * 1.5,
      })),
    },
    {
      name: "Badminton",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `Team ${String.fromCharCode(65 + i)}`,
        points: 180 - i * 1.8,
      })),
    },
    {
      name: "Chess",
      description: "",
      image: "",
      status: "",
      leaderboard: Array.from({ length: 25 }, (_, i) => ({
        rank: i + 1,
        team: `Team ${String.fromCharCode(65 + i)}`,
        points: 120 - i * 1.2,
      })),
    },
  ],
} as const


const yearMapping: { [key: number]: string } = {
  1: "FY",
  2: "SY",
  3: "TY",
  4: "B.Tech"
};



interface Participant {
  name?: string
  branch: string
  year: number
}

interface SportData {
  gender: "boys" | "girls" | "mixed";
  icon: string
  type: "indoor" | "outdoor"
  winner: Participant
  runnerUp: Participant
}

// const sportsData: Record<string, SportData> = {
//   Cricket: {
//     icon: "🏏",
//     type: "outdoor",
//     winner: { branch: "Mechanical", year: 3 },
//     runnerUp: { branch: "Civil", year: 2 },
//   },
//   Football: {
//     icon: "⚽",
//     type: "outdoor",
//     winner: { branch: "Electrical", year: 4 },
//     runnerUp: { branch: "IT", year: 3 },
//   },
//   Chess: {
//     icon: "♟️",
//     type: "indoor",
//     winner: { name: "John Doe", branch: "CSE", year: 2 },
//     runnerUp: { name: "Jane Smith", branch: "ECE", year: 1 },
//   },
//   "Table Tennis": {
//     icon: "🏓",
//     type: "indoor",
//     winner: { name: "Alice Johnson", branch: "Mechanical", year: 2 },
//     runnerUp: { name: "Bob Brown", branch: "Civil", year: 3 },
//   },
//   Volleyball: {
//     icon: "🏐",
//     type: "outdoor",
//     winner: { branch: "Chemical", year: 3 },
//     runnerUp: { branch: "Biotech", year: 2 },
//   },
//   Badminton: {
//     icon: "🏸",
//     type: "indoor",
//     winner: { name: "Emily Davis", branch: "IT", year: 1 },
//     runnerUp: { name: "Michael Lee", branch: "CSE", year: 3 },
//   },
// };




interface LeaderboardCardProps {
  game: Game
}

const LeaderboardCard = ({ game }: LeaderboardCardProps) => {
  const showBrackets = BRACKET_GAMES.includes(game.name)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {game.leaderboard.slice(0, 3).map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell>{entry.rank}</TableCell>
                <TableCell>{entry.team}</TableCell>
                <TableCell>{entry.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1">View All Positions</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{game.name} - All Team Positions</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[50vh] mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {game.leaderboard.map((entry) => (
                      <TableRow key={entry.rank}>
                        <TableCell>{entry.rank}</TableCell>
                        <TableCell>{entry.team}</TableCell>
                        <TableCell>{entry.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          {showBrackets && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1">View Brackets</Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl">
                <DialogHeader>
                  <DialogTitle>{game.name} - Tournament Brackets</DialogTitle>
                </DialogHeader>
                <EnhancedTreeStyleBracket />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Modify SportsCategorySection to remove unused category parameter
const SportsCategorySection: React.FC<{ games: Game[] }> = ({ games }) => {
  const [showAll, setShowAll] = useState(false)
  const displayedGames = showAll ? games : games.slice(0, 3)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedGames.map((game) => (
          <LeaderboardCard key={game.name} game={game} />
        ))}
      </div>
      {games.length > 3 && (
        <Button onClick={() => setShowAll(!showAll)} className="mt-6 mx-auto block">
          {showAll ? (
            <>
              Show Less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  )
}

export default function MultistepFormPage(): JSX.Element {
  const [sportsData, setSportsData] = useState<Record<string, SportData>>({})
  const [branches, setBranches] = useState<{ name: string; year: number; points: number; }[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/sports");
      const sports = await res.json();

      const pointsMap: { [key: string]: { [key: number]: number } } = {};

      sports.forEach((sport: { winner: {
        branch: string;
        year: number;
      };
      runnerUp: {
        branch: string;
        year: number;
      }; }) => {
        const { winner, runnerUp } = sport;

        if (!pointsMap[winner.branch]) pointsMap[winner.branch] = {};
        if (!pointsMap[runnerUp.branch]) pointsMap[runnerUp.branch] = {};

        pointsMap[winner.branch][winner.year] = (pointsMap[winner.branch][winner.year] || 0) + 1;
        pointsMap[runnerUp.branch][runnerUp.year] = (pointsMap[runnerUp.branch][runnerUp.year] || 0) + 0.5;
      });

      const leaderboard = Object.entries(pointsMap).flatMap(([branch, years]) =>
        Object.entries(years).map(([year, points]) => ({
          name: branch,
          year: Number(year),
          points
        }))
      );

      setBranches(leaderboard);
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch("/api/sports");
        if (!res.ok) throw new Error("Network response was not ok");
  
        const data = await res.json();
        if (Array.isArray(data)) {
          const formattedData = data.reduce((acc, sport) => {
            const key = `${sport.name}-${sport.gender}- ${sport.winner.name}`; // Unique key using name and gender
            acc[key] = {
              icon: sport.icon,
              type: sport.type,
              gender: sport.gender,
              winner: sport.winner,
              runnerUp: sport.runnerUp,
            };
            return acc;
          }, {});
  
          setSportsData(formattedData);
        } else {
          console.warn("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    fetchSports();
  }, []);
  

  const sortedBranches = branches.sort((a, b) => b.points - a.points);
  const displayedBranches = showAll ? sortedBranches : sortedBranches.slice(0, 5);
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return index + 1;
    }
  };


  return (
    <div className="mt-24">
      {/* Ensure CarouselComponent is correctly rendered */}
      <CarouselComponent />

      {/* Jersey Registration Section */}
      <div className="max-w-7xl mx-auto my-8 p-6 bg-gray-900 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Jersey Registration</h2>
            <p className="mb-6 text-gray-300">Register now to get your custom jersey for the upcoming sports events!</p>
            <Link href="/sports/jersey">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Register for Jersey
              </Button>
            </Link>
          </div>
          <div className="flex-1 flex justify-end">
            <Image
              src="/olympus/jersey/orange.webp"
              alt="Jersey Preview"
              width={256}
              height={256}
              className="object-contain"
            />
          </div>
        </div>
      </div>


      <Card className="mt-12">
      <CardHeader>
        <CardTitle>Branch Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedBranches.map((branch, index) => (
              <TableRow key={`${branch.name}-${branch.year}`}>
                <TableCell>{getRankIcon(index)}</TableCell>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{yearMapping[branch.year]}</TableCell>
                <TableCell>{branch.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {sortedBranches.length > 5 && (
          <Button
            className="mt-6 mx-auto block"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
      </CardContent>
    </Card>
      
      
      <WinnerSection sportsData={sportsData} />

      <Tabs defaultValue="inter" className="mt-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inter">Inter-College</TabsTrigger>
          <TabsTrigger value="intra">Intra-College</TabsTrigger>
        </TabsList>
        {Object.entries(sports)
          .filter(([category]) => category === "inter" || category === "intra")
          .map(([category, games]) => (
            <TabsContent key={category} value={category}>
              <SportsCategorySection games={games} />
            </TabsContent>
          ))}
      </Tabs>

      {/* <SportsSchedule /> */}

    </div>
  )
}

