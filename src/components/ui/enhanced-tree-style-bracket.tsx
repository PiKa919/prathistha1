"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, ArrowRight, Crown } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface Team {
  id: string
  name: string
  seed?: number
}

interface Match {
  id: string
  team1: Team
  team2: Team
  winner?: string
  score?: [number, number]
}

interface Round {
  name: string
  matches: Match[]
}

const tournamentData: Round[] = [
  {
    name: "Quarter-Finals",
    matches: [
      { id: "QF1", team1: { id: "T1", name: "Fnatic", seed: 1 }, team2: { id: "T2", name: "Cloud9", seed: 8 }, winner: "Fnatic", score: [13, 7] },
      { id: "QF2", team1: { id: "T3", name: "Team Liquid", seed: 4 }, team2: { id: "T4", name: "Sentinels", seed: 5 }, winner: "Sentinels", score: [11, 13] },
      { id: "QF3", team1: { id: "T5", name: "100 Thieves", seed: 3 }, team2: { id: "T6", name: "G2 Esports", seed: 6 }, winner: "G2 Esports", score: [8, 13] },
      { id: "QF4", team1: { id: "T7", name: "LOUD", seed: 2 }, team2: { id: "T8", name: "OpTic Gaming", seed: 7 }, winner: "OpTic Gaming", score: [10, 13] },
    ]
  },
  {
    name: "Semi-Finals",
    matches: [
      { id: "SF1", team1: { id: "T1", name: "Fnatic" }, team2: { id: "T4", name: "Sentinels" }, winner: "Fnatic", score: [13, 11] },
      { id: "SF2", team1: { id: "T6", name: "G2 Esports" }, team2: { id: "T8", name: "OpTic Gaming" }, winner: "OpTic Gaming", score: [9, 13] },
    ]
  },
  {
    name: "Final",
    matches: [
      { id: "F1", team1: { id: "T1", name: "Fnatic" }, team2: { id: "T8", name: "OpTic Gaming" }, winner: "Fnatic", score: [13, 11] },
    ]
  }
]

export function EnhancedTreeStyleBracket() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null)
  const [winner, setWinner] = useState<Team | null>(null)

  useEffect(() => {
    const finalMatch = tournamentData[tournamentData.length - 1].matches[0]
    if (finalMatch.winner) {
      setWinner(finalMatch.winner === finalMatch.team1.name ? finalMatch.team1 : finalMatch.team2)
    }
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto p-4 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Valorant Tournament Bracket</h2>
      <div className="flex flex-col items-center mb-8">
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg"
            >
              <Crown className="w-6 h-6" />
              <span className="text-xl font-bold">Tournament Winner: {winner.name}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-between min-w-[1000px] gap-8">
        {tournamentData.map((round, roundIndex) => (
          <div key={round.name} className="flex-1 flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-center">{round.name}</h3>
            <div className="space-y-8 flex-1 flex flex-col justify-around">
              {round.matches.map((match, matchIndex) => (
                <div key={match.id} className="relative">
                  <Card className="bg-background border-primary">
                    <CardContent className="p-2">
                      <MatchDisplay
                        match={match}
                        hoveredTeam={hoveredTeam}
                        setHoveredTeam={setHoveredTeam}
                      />
                    </CardContent>
                  </Card>
                  {roundIndex < tournamentData.length - 1 && (
                    <Arrow 
                      direction="right" 
                      isHighlighted={hoveredTeam === match.winner}
                    />
                  )}
                  {roundIndex > 0 && (
                    <>
                      <Arrow 
                        direction="left" 
                        isHighlighted={hoveredTeam === match.team1.id}
                        offset="top"
                      />
                      <Arrow 
                        direction="left" 
                        isHighlighted={hoveredTeam === match.team2.id}
                        offset="bottom"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchDisplay({ match, hoveredTeam, setHoveredTeam }: { 
  match: Match, 
  hoveredTeam: string | null,
  setHoveredTeam: (teamId: string | null) => void
}) {
  return (
    <div className="space-y-2">
      <TeamDisplay 
        team={match.team1}
        score={match.score ? match.score[0] : undefined}
        isWinner={match.winner === match.team1.name}
        isHovered={hoveredTeam === match.team1.id}
        onHover={setHoveredTeam}
      />
      <div className="border-t border-primary-foreground/20"></div>
      <TeamDisplay 
        team={match.team2}
        score={match.score ? match.score[1] : undefined}
        isWinner={match.winner === match.team2.name}
        isHovered={hoveredTeam === match.team2.id}
        onHover={setHoveredTeam}
      />
    </div>
  )
}

function TeamDisplay({ team, score, isWinner, isHovered, onHover }: { 
  team: Team, 
  score?: number, 
  isWinner?: boolean, 
  isHovered: boolean,
  onHover: (teamId: string | null) => void
}) {
  return (
    <motion.div 
      className={`flex items-center justify-between p-2 rounded-md transition-colors duration-200
        ${isWinner ? 'bg-primary/10' : ''}
        ${isHovered ? 'bg-secondary/20' : ''}
      `}
      onMouseEnter={() => onHover(team.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center space-x-2">
        {team.seed && (
          <span className="text-xs font-semibold text-muted-foreground">{team.seed}</span>
        )}
        <span className={`font-semibold ${isWinner ? 'text-primary' : ''}`}>{team.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        {score !== undefined && (
          <span className={`text-sm ${isWinner ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            {score}
          </span>
        )}
        {isWinner && <Trophy className="text-primary w-4 h-4" />}
      </div>
    </motion.div>
  )
}

function Arrow({ direction, isHighlighted, offset }: { 
  direction: "left" | "right", 
  isHighlighted: boolean,
  offset?: "top" | "bottom"
}) {
  const arrowStyles = {
    right: "absolute top-1/2 -translate-y-1/2 -right-6",
    left: `absolute ${offset === "bottom" ? "bottom-1/4" : "top-1/4"} -translate-y-1/2 -left-6`
  }

  return (
    <div className={arrowStyles[direction]}>
      <motion.div
        animate={{ x: isHighlighted ? [0, 5, 0] : 0 }}
        transition={{ duration: 0.5, repeat: isHighlighted ? Infinity : 0 }}
      >
        <ArrowRight 
          className={`w-4 h-4 ${isHighlighted ? 'text-primary' : 'text-muted-foreground'} ${direction === "left" ? "rotate-180" : ""}`} 
        />
      </motion.div>
    </div>
  )
}

