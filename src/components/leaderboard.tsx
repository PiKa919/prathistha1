"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Maximize2, Minimize2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// First, define interfaces
interface CCEntry {
  rank: number;
  clId: string;
  name: string;
  ccPoints: number;
}

interface PREntry {
  rank: number;
  clId: string;
  name: string;
  prPoints: number;
}

interface GameData {
  cc: CCEntry[];
  pr: PREntry[];
}

interface LeaderboardData {
  [key: string]: GameData;
}

// Update the component
export function Leaderboard() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentGameId, setCurrentGameId] = useState<string>("game1");

  const games = [
    { id: "game1", name: "Game 1" },
    { id: "game2", name: "Game 2" },
    { id: "game3", name: "Game 3" }
  ]

  const leaderboardData: LeaderboardData = {
    game1: {
      cc: [
        { rank: 1, clId: "CL001", name: "Alex Chen", ccPoints: 1500 },
        { rank: 2, clId: "CL002", name: "Maria Garcia", ccPoints: 1400 },
        { rank: 3, clId: "CL003", name: "John Smith", ccPoints: 1300 },
        { rank: 4, clId: "CL004", name: "Yuki Tanaka", ccPoints: 1200 },
        { rank: 5, clId: "CL005", name: "Anna Kowalski", ccPoints: 1100 },
      ],
      pr: [
        { rank: 1, clId: "CL003", name: "John Smith", prPoints: 1000 },
        { rank: 2, clId: "CL001", name: "Alex Chen", prPoints: 950 },
        { rank: 3, clId: "CL004", name: "Yuki Tanaka", prPoints: 900 },
        { rank: 4, clId: "CL002", name: "Maria Garcia", prPoints: 850 },
        { rank: 5, clId: "CL005", name: "Anna Kowalski", prPoints: 800 },
      ]
    }
    // Add more game data as needed
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-500/20 to-transparent"
      case 2: return "bg-gradient-to-r from-gray-500/20 to-transparent"
      case 3: return "bg-gradient-to-r from-yellow-600/20 to-transparent"
      default: return ""
    }
  }

  return (
    <section className={cn(
      "py-12 transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50 bg-black overflow-auto" : "relative"
    )}>
      <div className={cn(
        "container",
        isFullscreen ? "h-full" : "max-h-[600px]"
      )}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Leaderboard</h2>
            <div className="flex gap-2">
              {games.map((game) => (
                <Button
                  key={game.id}
                  variant={currentGameId === game.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentGameId(game.id)}
                >
                  {game.name}
                </Button>
              ))}
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-6",
          !isFullscreen && "max-h-[500px]"
        )}>
          {/* CC Points Table */}
          <div className="rounded-lg border border-gray-800 bg-black/50 backdrop-blur-sm">
            <div className="sticky top-0 z-10 p-4 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-blue-400">CC Points</h3>
            </div>
            <div className={cn(
              "overflow-y-auto",
              !isFullscreen && "max-h-[400px]"
            )}>
              <Table>
                <TableHeader className="sticky top-0 bg-black/50 backdrop-blur-sm">
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>CL ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {leaderboardData[currentGameId].cc.map((entry) => (
                      <motion.tr
                        key={entry.clId}
                        className={cn(getRankColor(entry.rank), "transition-colors")}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TableCell className="font-medium">{entry.rank}</TableCell>
                        <TableCell>{entry.clId}</TableCell>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell className="text-right font-bold text-blue-400">{entry.ccPoints}</TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* PR Points Table */}
          <div className="rounded-lg border border-gray-800 bg-black/50 backdrop-blur-sm">
            <div className="sticky top-0 z-10 p-4 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-green-400">PR Points</h3>
            </div>
            <div className={cn(
              "overflow-y-auto",
              !isFullscreen && "max-h-[400px]"
            )}>
              <Table>
                <TableHeader className="sticky top-0 bg-black/50 backdrop-blur-sm">
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>CL ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {leaderboardData[currentGameId].pr.map((entry) => (
                      <motion.tr
                        key={entry.clId}
                        className={cn(getRankColor(entry.rank), "transition-colors")}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TableCell className="font-medium">{entry.rank}</TableCell>
                        <TableCell>{entry.clId}</TableCell>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell className="text-right font-bold text-green-400">{entry.prPoints}</TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
