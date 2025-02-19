"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import CarouselComponent from "@/components/ui/CarouselComponent"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WinnerSection } from "@/components/WinnerSection"

// const BRACKET_GAMES = [
//   "Cricket",
//   "Football",
//   "Basketball",
//   "Volleyball",
//   "Table Tennis",
//   "Badminton",
//   "Chess",
//   "Baseball",
//   "Tennis",
//   "Kabbadi",
//   "Box Cricket",
//   "Snooker",
//   "Carrom",
//   "DodgeBall",
//   "Throwball",
//   "Tug of War",
//   "Speed Cubing"
// ] as const

// type BracketGameType = (typeof BRACKET_GAMES)[number]

interface Game {
  name:  "Cricket"|
  "Football"|
  "Basketball"|
  "Volleyball"|
  "Table Tennis"|
  "Badminton"|
  "Chess"|
  "Baseball"|
  "Tennis"|
  "Kabbadi"|
  "Box Cricket"|
  "Snooker"|
  "Carrom"|
  "DodgeBall"|
  "Throwball"|
  "Tug of War"|
  "Speed Cubing"
  gender?: "boys" | "girls" | "mixed"
  type: "single" | "double" | "team"  // Add game type
  matches?: Array<{
    teams: string
    winner: string
    stage: string
  }>
}

const sports: Record<string, Array<Game>> = {
  outdoor: [
    {
      name: "Cricket",
      gender: "boys",
      type: "team",  // Add type
      matches: [
        { teams: "SE AIDS vs FE COMPS", winner: "FE COMPS", stage: "Group-Stage" },
        { teams: "SE ACT vs SE IT", winner: "SE IT", stage: "Group-Stage" },
        { teams: "BE IT vs FE CYSE", winner: "BE IT", stage: "Group-Stage" },
        { teams: "FE IT vs FE AIDS", winner: "FE AIDS", stage: "Group-Stage" },
        { teams: "TE COMPS vs TE EXTC", winner: "TE COMPS", stage: "Group-Stage" },
        { teams: "BE AIDS vs FE ACT", winner: "FE ACT", stage: "Group-Stage" },
        { teams: "TE CYSE vs SE VLSI", winner: "TE CYSE", stage: "Group-Stage" },
        { teams: "BE COMPS vs SE ECS", winner: "BE COMPS", stage: "Group-Stage" },
        { teams: "BE ECS vs FE EXTC", winner: "BE ECS", stage: "Group-Stage" },
        { teams: "TE AIDS vs FE ECS", winner: "TE AIDS", stage: "Group-Stage" },
        { teams: "TE ECS vs FE VLSI", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "TE IT vs SE EXTC", winner: "TE IT", stage: "Group-Stage" },
        { teams: "BE CYSE vs SE COMPS", winner: "SE COMPS", stage: "Group-Stage" },
        { teams: "FE COMPS vs SE IT", winner: "SE IT", stage: "Group-Stage" },
        { teams: "BE IT vs FE AIDS", winner: "BE IT", stage: "Group-Stage" },
        { teams: "TE COMPS vs FE ACT", winner: "FE ACT", stage: "Group-Stage" },
        { teams: "TE ECS vs TE IT", winner: "TE IT", stage: "Group-Stage" },
        { teams: "SE COMPS vs Council", winner: "Council", stage: "Group-Stage" },
        { teams: "TE CYSE vs BE COMPS", winner: "BE COMPS", stage: "Group-Stage" },
        { teams: "BE ECS vs TE AIDS", winner: "BE ECS", stage: "Group-Stage" },
        { teams: "FE ACT vs BE IT", winner: "BE IT", stage: "Quarter-final" },
        { teams: "SE IT vs BE ECS", winner: "SE IT", stage: "Quarter-final" },
        { teams: "BE COMPS vs TE IT", winner: "BE COMPS", stage: "Quarter-final" },
        { teams: "Council vs SE CYSE", winner: "Council", stage: "Quarter-final" },
        { teams: "TE CYSE vs BE COMPS", winner: "BE COMPS", stage: "Group-Stage" },
        { teams: "BE ECS vs TE AIDS", winner: "BE ECS", stage: "Group-Stage" },
        { teams: "FE ACT vs BE IT", winner: "BE IT", stage: "Quarter-final" },
        { teams: "SE IT vs BE ECS", winner: "SE IT", stage: "Quarter-final" },
        { teams: "BE COMPS vs TE IT", winner: "BE COMPS", stage: "Quarter-final" },
        { teams: "Council vs SE CYSE", winner: "Council", stage: "Quarter-final" },
        { teams: "BE IT vs SE IT", winner: "BE IT", stage: "Semi-final" },
        { teams: "BE COMPS vs Council", winner: "BE COMPS", stage: "Semi-final" },
        { teams: "BE COMPS vs BE IT", winner: "BE COMPS", stage: "Final" },
      ],
    },
    {
      name: "Football",
      gender: "boys",
      type: "team",  // Add type
      matches: [
        { teams: "FE ACT vs SE IT", winner: "SE IT", stage: "Group-Stage" },
        { teams: "TE IT vs FE Comps",winner: "TE IT", stage: "Group-Stage" },
        { teams: "FE ECS vs SE EXTC",winner: "SE EXTC", stage: "Group-Stage" },
        { teams: "SE ECS vs TE Comps",winner: "TE Comps", stage: "Group-Stage" },
        { teams: "FE VLSI vs SE CYSE",winner: "SE CYSE", stage: "Group-Stage" },
        { teams: "FE EXTC vs FE AIDS",winner: "FE AIDS", stage: "Group-Stage" },
        { teams: "TE AIDS vs FE CYSE",winner: "TE AIDS", stage: "Group-Stage" },
        { teams: "BE IT vs BE EXTC",winner: "BE EXTC", stage: "Group-Stage" },
        { teams: "TE ECS vs FE IT",winner: "TE ECS", stage: "Group-Stage" },
        { teams: "SE Comps vs SE AIDS",winner: "SE Comps", stage: "Group-Stage" },
        { teams: "BE Comps vs FE VLSI",winner: "BE Comps", stage: "Group-Stage" },
        { teams: "BE ECS vs FE CYSE",winner: "BE ECS", stage: "Group-Stage" },
        { teams: "TE ECS vs SE IT",winner: "TE ECS", stage: "Group-Stage" },
        { teams: "SE Comps vs SE EXTC",winner: "SE Comps", stage: "Group-Stage" },
        { teams: "BE Comps vs SE CYSE",winner: "BE Comps", stage: "Group-Stage" },
        { teams: "BE ECS vs TE AIDS",winner: "TE AIDS", stage: "Group-Stage" },
        { teams: "BE EXTC vs Council",winner: "BE EXTC", stage: "Group-Stage" },
        { teams: "SE Comps vs TE Comps",winner: "TE Comps", stage: "Quarter-final" },
        { teams: "TE ECS vs TE IT",winner: "TE IT", stage: "Quarter-final" },
        { teams: "BE Comps vs FE AIDS",winner: "BE Comps", stage: "Quarter-final" },
        { teams: "BE EXTC vs TE AIDS",winner: "TE AIDS", stage: "Quarter-final" },
        { teams: "TE IT vs TE Comps",winner: "TE IT", stage: "Semi-final" },
        { teams: "BE Comps vs TE AIDS",winner: "BE Comps", stage: "Semi-final" },
        { teams: "TE IT vs BE Comps",winner: "BE Comps", stage: "Final" }
      ],
    },
    {
      name: "Kabbadi",
      gender: "boys",
      type: "team",  // Add type
      matches: [
        { teams: "TE CYSE vs FE Comps", winner: "TE CYSE", stage: "Group-Stage" },
        { teams: "TE Comps vs FE ACT", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "TE ECS vs SE VLSI", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "SE IT vs FE AIDS", winner: "SE IT", stage: "Group-Stage" },
        { teams: "FE CYSE vs SE ACT", winner: "SE ACT", stage: "Group-Stage" },
        { teams: "FE ECS vs FE IT", winner: "FE IT", stage: "Group-Stage" },
        { teams: "BE IT vs TE EXTC", winner: "TE EXTC", stage: "Group-Stage" },
        { teams: "SE AIDS vs FE EXTC", winner: "FE EXTC", stage: "Group-Stage" },
        { teams: "TE CYSE vs FE EXTC", winner: "TE CYSE", stage: "Group-Stage" },
        { teams: "TE ECS vs SE ACT", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "FE IT vs TE Comps", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "TE EXTC vs SE IT", winner: "TE EXTC", stage: "Group-Stage" },
        { teams: "TE ECS vs TE CYSE", winner: "TE ECS", stage: "Quarter-final" },
        { teams: "TE Comps vs TE EXTC", winner: "TE EXTC", stage: "Quarter-final" },
        { teams: "TE ECS vs TE EXTC", winner: "TE ECS", stage: "Final" }
      ]
    },
    {
      name: "Basketball",
      gender:"girls",
      type: "team",  // Add type
      matches: [
        { teams: "FE ECS vs TY Comps", winner: "FE ECS", stage: "Group-Stage" },
        { teams: "SE IT vs TY ECS", winner: "SE IT", stage: "Group-Stage" },
        { teams: "FE ECS vs SE IT", winner: "SE IT", stage: "Group-Stage" },
        { teams: "TY Comps vs TY ECS", winner: "TY ECS", stage: "Group-Stage" },
        { teams: "FE ECS vs TY ECS", winner: "TY ECS", stage: "Group-Stage" },
        { teams: "TY Comps vs SE IT", winner: "SE IT", stage: "Group-Stage" },
        { teams: "SY IT vs TY ECS", winner: "SY IT", stage: "Final" }
      ]
    },
    {
      name: "Basketball",
      gender: "boys",
      type: "team",  // Add type
      matches: [
        { teams: "SE ECS vs FE ECS", winner: "SE ECS", stage: "Group-Stage" },
        { teams: "FE IT vs SE ACT", winner: "SE ACT", stage: "Group-Stage" },
        { teams: "TE AIDS vs SE ECS", winner: "TE AIDS", stage: "Group-Stage" },
        { teams: "SE Comps vs BE IT", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "FE ECS vs TE AIDS", winner: "TE AIDS", stage: "Group-Stage" },
        { teams: "FE Cyse vs SE Comps", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "TE IT vs FE IT", winner: "TE IT", stage: "Group-Stage" },
        { teams: "TE IT vs SE ACT", winner: "SE ACT", stage: "Group-Stage" },
        { teams: "BE IT vs TE AIDS", winner: "TE AIDS", stage: "Group-Stage" },
        { teams: "SE Comps vs SE ACT", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "SE Comps vs TE AIDS", winner: "TE AIDS", stage: "Final" }
      ]
    },
    {
      name: "DodgeBall",
      gender: "boys",
      type: "team",  // Add type
      matches: [
        { teams: "SE Comps vs FE EXTC", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "FE ECS vs TE ECS", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "SE ECS vs TE EXTC", winner: "TE EXTC", stage: "Group-Stage" },
        { teams: "BE EXTC vs BE IT", winner: "BE EXTC", stage: "Group-Stage" },
        { teams: "SE Comps vs BE EXTC", winner: "SE Comps", stage: "Semi-final" },
        { teams: "TE ECS vs TE EXTC", winner: "TE EXTC", stage: "Semi-final" },
        { teams: "SE Comps vs TE EXTC", winner: "TE EXTC", stage: "Final" }
      ]
    }
    ,
    {
      name: "Volleyball",
      gender: "boys",
      type: "team",  // Add type
      matches: [
        { teams: "SE IT vs SE EXTC", winner: "SE IT", stage: "Group-Stage" },
        { teams: "TE CYSE vs SE CYSE", winner: "TE CYSE", stage: "Group-Stage" },
        { teams: "FE Comps vs SE Comps", winner: "FE Comps", stage: "Group-Stage" },
        { teams: "BE Comps vs FE ECS", winner: "BE Comps", stage: "Group-Stage" },
        { teams: "TE Comps vs FE ACT", winner: "FE ACT", stage: "Group-Stage" },
        { teams: "BE EXTC vs SE ECS", winner: "BE EXTC", stage: "Group-Stage" },
        { teams: "TE ECS vs BE IT", winner: "BE IT", stage: "Group-Stage" },
        { teams: "Council vs BE ECS", winner: "Council", stage: "Group-Stage" },
        { teams: "Council vs BE EXTC", winner: "Council", stage: "Group-Stage" },
        { teams: "SE IT vs TE CYSE", winner: "SE IT", stage: "Group-Stage" },
        { teams: "FE Comps vs BE IT", winner: "FE Comps", stage: "Group-Stage" },
        { teams: "BE Comps vs FE ACT", winner: "BE Comps", stage: "Group-Stage" },
        { teams: "Council vs FE Comps", winner: "Council", stage: "Semi-final" },
        { teams: "BE Comps vs SE IT", winner: "BE Comps", stage: "Semi-final" },
        { teams: "Council vs BE Comps", winner: "BE Comps", stage: "Final" }
      ]
    },
    {
      name: "Tug of War",
      gender: "boys",
      type: "team",  // Add type
      matches: [
        { teams: "SE CYSE vs BE EXTC", winner: "BE EXTC", stage: "Match 1" },
        { teams: "BE Comps vs BE IT", winner: "BE IT", stage: "Match 2" },
        { teams: "TE EXTC vs SE AIDS", winner: "TE EXTC", stage: "Match 3" },
        { teams: "FE IT vs TE ECS", winner: "TE ECS", stage: "Match 4" },
        { teams: "FE Comps vs FE ECS", winner: "FE ECS", stage: "Match 5" },
        { teams: "TE CYSE vs FE VLSI", winner: "TE CYSE", stage: "Match 6" },
        { teams: "SE VLSI vs FE ACT", winner: "SE VLSI", stage: "Match 7" },
        { teams: "SE IT vs FE EXTC", winner: "SE IT", stage: "Match 8" },
        { teams: "Infra vs BE ECS", winner: "Infra", stage: "Match 9" },
        { teams: "Infra vs Council", winner: "Infra", stage: "Match 10" },
        { teams: "BE EXTC vs BE Comps", winner: "BE EXTC", stage: "Match 11" },
        { teams: "TE EXTC vs TE ECS", winner: "TE ECS", stage: "Match 12" },
        { teams: "FE ECS vs TE CYSE", winner: "TE CYSE", stage: "Match 13" },
        { teams: "SE VLSI vs SE IT", winner: "SE IT", stage: "Match 14" },
        { teams: "TE CYSE vs SE IT", winner: "TE CYSE", stage: "Match 15" },
        { teams: "BE EXTC vs TE ECS", winner: "TE ECS", stage: "Match 16" },
        { teams: "TE CYSE vs Infra", winner: "Infra", stage: "Match 17" },
        { teams: "Infra vs TE ECS", winner: "Infra", stage: "Match 18" }
      ]
    },
    {
      name: "Throwball",
      gender: "girls",
      type : "team",  // Add type
      matches: [
        { teams: "TE ECS vs SE Comps", winner: "SE Comps", stage: "Match 1" },
        { teams: "BE EXTC vs FE EXTC", winner: "FE EXTC", stage: "Match 2" },
        { teams: "SE IT vs TE Comps", winner: "SE IT", stage: "Match 3" },
        { teams: "SE ECS vs Council", winner: "Council", stage: "Match 4" },
        { teams: "SE Comps vs SE IT", winner: "SE Comps", stage: "Match 5" },
        { teams: "FE EXTC vs Council", winner: "FE EXTC", stage: "Match 6" },
        { teams: "SE Comps vs FE EXTC", winner: "FE EXTC", stage: "Final" }
      ]
    },
    {
      name: "DodgeBall",
      gender: "girls",
      type: "team",  // Add type
      matches: [
        { teams: "SE Comps vs TE Comps", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "TE ECS vs SE IT", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "BE EXTC vs Council", winner: "BE EXTC", stage: "Group-Stage" },
        { teams: "SE Comps vs TE ECS", winner: "TE ECS", stage: "Semi-final" },
        { teams: "BE EXTC vs SE EXTC", winner: "BE EXTC", stage: "Semi-final" },
        { teams: "BE EXTC vs TE ECS", winner: "TE ECS", stage: "Final" }
      ]
    },
    {
      name: "Tug of War",
      gender: "girls",
      type: "team",
      matches: [
        { teams: "TE ECS vs SE IT", winner: "TE ECS", stage: "Final" }
      ]
    }
    
  ],

  indoor:[
    {
      name: "Table Tennis",
      gender: "boys",
      type: "single",
      matches: [
        { teams: "BE EXTC vs FY ECS", winner: "FY ECS", stage: "Group-Stage" },
        { teams: "TE ECS vs BE Comps", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "FE IT vs FE VLSI", winner: "FE VLSI", stage: "Group-Stage" },
        { teams: "SE Comps vs SE ECS", winner: "SE ECS", stage: "Group-Stage" },
        { teams: "BE Comps vs TE EXTC", winner: "TE EXTC", stage: "Group-Stage" },
        { teams: "SE ECS vs SE Comps", winner: "SE ECS", stage: "Group-Stage" },
        { teams: "SE ECS vs FE AIDS", winner: "SE ECS", stage: "Group-Stage" },
        { teams: "TE Comps vs BE IT", winner: "Draw", stage: "Group-Stage" },
        { teams: "FE IT vs FE ECS", winner: "FE IT", stage: "Group-Stage" },
        { teams: "FE Comps vs FE VLSI", winner: "FE VLSI", stage: "Group-Stage" },
        { teams: "SE ECS vs FE Comps", winner: "SE ECS", stage: "Group-Stage" },
        { teams: "BE IT vs TE EXTC", winner: "BE IT", stage: "Group-Stage" },
        { teams: "TE ECS vs SE ACT", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "SE ECS vs SE EXTC", winner: "SE EXTC", stage: "Group-Stage" },
        { teams: "SE ECS vs FE IT", winner: "SE ECS", stage: "Group-Stage" },
        { teams: "SE ECS vs FE VLSI", winner: "SE ECS", stage: "Group-Stage" },
        { teams: "BE IT vs TE ECS", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "TE Comps vs SE EXTC", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "SE ECS vs TE ECS", winner: "SE ECS", stage: "Group-Stage" },
        { teams: "TE Comps vs SE ECS", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "TE Comps vs SE ECS", winner: "SE ECS", stage: "Final" }
      ]
    },
    {
      name: "Table Tennis",
      gender: "girls",
      type: "single",
      matches: [
        { teams: "TE Comps vs SE VLSI", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "TE ECS vs SE EXTC", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "TE Comps vs TE ECS", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "SE Comps vs TE Comps", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "TE Comps vs TE Comps", winner: "TE Comps", stage: "Final" }
      ]
    },        
    {
      name: "Badminton",
      gender: "girls",
      type: "single",  // Add type
      matches: [
        { teams: "TE ECS vs FE CYSE", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "FE EXTC vs FE CYSE", winner: "FE CYSE", stage: "Group-Stage" },
        { teams: "TE ECS vs FE EXTC", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "TE Comps vs FE B.Voc CYSE", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "FE VLSI vs FE B.Voc CYSE", winner: "FE VLSI", stage: "Group-Stage" },
        { teams: "TE Comps vs FE VLSI", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "TE Comps vs TE ECS", winner: "TE Comps", stage: "Final" }
      ]
    } ,
    {
      name: "Badminton",
      gender: "boys",
      type: "double",  // Add type
      matches: [
        { teams: "FE Comps vs SE VLSI", winner: "SE VLSI", stage: "Group-Stage" },
        { teams: "SE Comps vs FE ACT", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "FE EXTC vs FE AIDS", winner: "FE AIDS", stage: "Group-Stage" },
        { teams: "TE Comps vs Council", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "SE VLSI vs SE Comps", winner: "SE VLSI", stage: "Group-Stage" },
        { teams: "FE AIDS vs TE Comps", winner: "FE AIDS", stage: "Group-Stage" },
        { teams: "FE Comps vs SE CYSE", winner: "SE CYSE", stage: "Group-Stage" },
        { teams: "FE IT vs SE AIDS", winner: "FE IT", stage: "Group-Stage" },
        { teams: "FE ECS vs FE VLSI", winner: "FE VLSI", stage: "Group-Stage" },
        { teams: "TE EXTC vs Council", winner: "TE EXTC", stage: "Group-Stage" },
        { teams: "FE IT vs SE CYSE", winner: "SE CYSE", stage: "Group-Stage" },
        { teams: "FE VLSI vs TE EXTC", winner: "TE EXTC", stage: "Group-Stage" },
        { teams: "BE Comps vs FE ACT", winner: "BE Comps", stage: "Group-Stage" },
        { teams: "SE EXTC vs FE Comps", winner: "SE EXTC", stage: "Group-Stage" },
        { teams: "SE Comps vs SE AIDS", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "FE CYSE vs Council", winner: "FE CYSE", stage: "Group-Stage" },
        { teams: "BE Comps vs SE EXTC", winner: "BE Comps", stage: "Group-Stage" },
        { teams: "SE Comps vs FY CYSE", winner: "FY CYSE", stage: "Group-Stage" },
        { teams: "TE ECS vs FE EXTC", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "FE IT vs FE Comps", winner: "FE Comps", stage: "Group-Stage" },
        { teams: "SE IT vs FE ECS", winner: "SE IT", stage: "Group-Stage" },
        { teams: "TE ECS vs FE IT", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "SE Comps vs SE IT", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "SE VLSI vs SE CYSE", winner: "SE VLSI", stage: "Quarter-final" },
        { teams: "SE Comps vs FE CYSE", winner: "SE Comps", stage: "Quarter-final" },
        { teams: "FE AIDS vs TE EXTC", winner: "TE EXTC", stage: "Quarter-final" },
        { teams: "BE Comps vs TE ECS", winner: "BE Comps", stage: "Quarter-final" },
        { teams: "SE Comps vs SE VLSI", winner: "SE Comps", stage: "Semi-final" },
        { teams: "TE EXTC vs BE Comps", winner: "BE Comps", stage: "Semi-final" },
        { teams: "BE Comps vs SE Comps", winner: "BE Comps", stage: "Final" }
      ]
    },
    {
      name: "Carrom",
      gender: "boys",
      type: "double",  // Add type
      matches: [
        { teams: "SE COMPS vs SE ACT", winner: "SE COMPS", stage: "Round 1" },
        { teams: "FE ECS vs SE ACT", winner: "FE ECS", stage: "Round 1" },
        { teams: "TE ECS vs FE COMPS", winner: "FE COMPS", stage: "Round 1" },
        { teams: "BE IT vs FY ECS", winner: "BE IT", stage: "Round 1" },
        { teams: "BE ECS vs TE EXTC", winner: "BE ECS", stage: "Round 1" },
        { teams: "FE VLSI vs FE EXTC", winner: "FE VLSI", stage: "Round 1" },
        { teams: "FE IT vs SE AIDS", winner: "SE AIDS", stage: "Round 1" },
        { teams: "BE IT vs FE EXTC", winner: "BE IT", stage: "Round 1" },
        { teams: "TE EXTC vs TE CYSE", winner: "TE CYSE", stage: "Round 1" },
        { teams: "BE IT vs SE ECS", winner: "BE IT", stage: "Round 1" },
        { teams: "SE ECS vs SE EXTC", winner: "SE EXTC", stage: "Round 1" },
    
        { teams: "BE IT vs SE COMPS", winner: "BE IT", stage: "Round 2" },
        { teams: "FE ECS vs FE VLSI", winner: "FE ECS", stage: "Round 2" },
        { teams: "TE CYSE vs BE IT", winner: "BE IT", stage: "Round 2" },
        { teams: "BE IT vs FE COMPS", winner: "BE IT", stage: "Round 2" },
        { teams: "BE ECS vs SE AIDS", winner: "BE ECS", stage: "Round 2" },
        { teams: "SE EXTC vs BE EXTC", winner: "SE EXTC", stage: "Round 2" },
    
        { teams: "BE IT vs FE ECS", winner: "FE ECS", stage: "Round 3" },
        { teams: "BE IT vs SE EXTC", winner: "BE IT", stage: "Round 3" },
        { teams: "BE IT vs BE ECS", winner: "BE IT", stage: "Round 3" },
    
        { teams: "BE IT vs BE ECS", winner: "BE IT", stage: "Round 4 (Triangular)" },
        { teams: "BE IT vs FE ECS", winner: "FE ECS", stage: "Round 4 (Triangular)" },
        { teams: "BE IT vs FE ECS", winner: "BE IT", stage: "Round 4 (Triangular)" },
    
        { teams: "BE IT vs FE ECS", winner: "BE IT", stage: "Finals" }
      ]
    },
    {
      name: "Snooker",
      gender: "boys",
      type: "single",  // Add type
      matches: [
        { teams: "TY IT vs TY AIDS", winner: "TY AIDS", stage: "Group-Stage" },
        { teams: "BE ECS vs Council", winner: "BE ECS", stage: "Group-Stage" },
        { teams: "TY AIDS vs BE ECS", winner: "BE ECS", stage: "Group-Stage" }
      ]
    },
   {
      name: "Box Cricket",
      gender: "girls",
      type: "team",  // Add type
      matches: [
        { teams: "SE EXTC vs SE Comps", winner: "SE Comps", stage: "Group-Stage" },
        { teams: "SE IT vs TE Comps", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "TE ECS vs SE ECS", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "TE ECS vs Council", winner: "TE ECS", stage: "Group-Stage" },
        { teams: "SE Comps vs TE Comps", winner: "TE Comps", stage: "Group-Stage" },
        { teams: "TE Comps vs TE ECS", winner: "TE ECS", stage: "Final" }
      ]
    },
    {
      name: "Chess",
      gender: "boys",
      type: "single",  // Add type
      matches: [
        { teams: "FE ECS vs FE Comps", winner: "FE ECS", stage: "Batch A" },
        { teams: "FE Comps vs FE ECS", winner: "FE Comps", stage: "Batch A" },
        { teams: "FE Comps vs FE Comps", winner: "FE Comps", stage: "Batch A" },
        { teams: "FE Comps vs FE Comps", winner: "FE Comps", stage: "Batch A" },
        { teams: "FE ECS vs SE Comps", winner: "SE Comps", stage: "Batch A" },
        { teams: "FE Comps vs FE Comps", winner: "FE Comps", stage: "Batch A" },
        { teams: "FE IT vs SE AIDS", winner: "SE AIDS", stage: "Batch B" },
        { teams: "FE ECS vs SE Comps", winner: "FE ECS", stage: "Batch B" },
        { teams: "FE IT vs TE ECS", winner: "FE IT", stage: "Batch B" },
        { teams: "FE AIDS vs TE EXTC", winner: "FE AIDS", stage: "Batch B" },
        { teams: "SE IT vs FE AIDS", winner: "SE IT", stage: "Batch B" },
        { teams: "FE VLSI vs TE AIDS", winner: "TE AIDS", stage: "Batch B" },
        { teams: "BE EXTC vs SE AIDS", winner: "BE EXTC", stage: "Batch B" },
        { teams: "FE AIDS vs FE ECS", winner: "FE ECS", stage: "Batch C" },
        { teams: "FE ECS vs FE ECS", winner: "FE ECS", stage: "Batch C" },
        { teams: "TE Comps vs TE CYSE", winner: "TE Comps", stage: "Batch C" },
        { teams: "FE EXTC vs BE AIDS", winner: "BE AIDS", stage: "Batch C" },
        { teams: "TE EXTC vs FE Comps", winner: "TE EXTC", stage: "Batch C" },
        { teams: "FE ECS vs SE AIDS", winner: "FE ECS", stage: "Round 2" },
        { teams: "FE Comps vs SE Comps", winner: "SE Comps", stage: "Round 2" },
        { teams: "FE Comps vs FE IT", winner: "FE IT", stage: "Round 2" },
        { teams: "FE Comps vs FE AIDS", winner: "FE AIDS", stage: "Round 2" },
        { teams: "SE Comps vs SE IT", winner: "SE Comps", stage: "Round 2" },
        { teams: "FE Comps vs TE AIDS", winner: "FE Comps", stage: "Round 2" },
        { teams: "TE Comps vs BE EXTC", winner: "TE Comps", stage: "Round 2" },
        { teams: "FE ECS vs TE EXTC", winner: "FE ECS", stage: "Round 2" },
        { teams: "TE Comps vs FE ECS", winner: "TE Comps", stage: "Round 2" },
        { teams: "FE ECS vs FE IT", winner: "FE ECS", stage: "Round 3" },
        { teams: "SE Comps vs FE ECS", winner: "SE Comps", stage: "Round 3" },
        { teams: "TE Comps vs FE AIDS", winner: "TE Comps", stage: "Round 3" },
        { teams: "TE Comps vs BE AIDS", winner: "TE Comps", stage: "Round 3" },
        { teams: "SE Comps vs FE Comps", winner: "SE Comps", stage: "Round 3" },
        { teams: "TE Comps vs SE Comps", winner: "TE Comps", stage: "Quarter-final" },
        { teams: "FE ECS vs TE Comps", winner: "FE ECS", stage: "Quarter-final" },
        { teams: "SE Comps vs SE AIDS", winner: "SE AIDS", stage: "Quarter-final" },
        { teams: "SE Comps vs BE ECS", winner: "SE Comps", stage: "Quarter-final" },
        { teams: "TE Comps vs SE Comps", winner: "SE Comps", stage: "Semi-final" },
        { teams: "FE ECS vs TE AIDS", winner: "FE ECS", stage: "Semi-final" },
        { teams: "FE ECS vs SE Comps", winner: "SE Comps", stage: "Final" }
      ]
    },
    {
      name: "Chess",
      gender: "girls",
      type: "single",  // Add type
      matches: [
        { teams: "TE ECS vs FE Comps", winner: "TE ECS", stage: "Match 1" }
      ]
    },
    {
      name: "Carrom",
      type:"single",
      gender: "girls",
      matches: [
        { teams: "BE IT vs TE ECS", winner: "BE IT", stage: "Match 1" },
        { teams: "SE VLSI vs SE EXTC", winner: "SE EXTC", stage: "Match 2" },
        { teams: "FE CYSE vs BE ECS", winner: "FE CYSE", stage: "Match 3" },
        { teams: "BE IT vs FE CYSE", winner: "BE IT", stage: "Match 4" },
        { teams: "FE CYSE vs SE EXTC", winner: "FE CYSE", stage: "Match 5" },
        { teams: "BE IT vs SE EXTC", winner: "BE IT", stage: "Match 6" },
        { teams: "BE IT vs FE CYSE", winner: "BE IT", stage: "Final" }
      ]
    },
    {
      name: "Carrom",
      gender: "girls",
      type: "double",  // Add type
      matches: [
        { teams: "BE IT vs FE EXTC", winner: "BE IT", stage: "Match 1" },
        { teams: "TE ECS vs TE Comps", winner: "TE ECS", stage: "Match 2" },
        { teams: "TE ECS vs BE IT", winner: "BE IT", stage: "Match 3" }
      ]
    },
    {
      name: "Speed Cubing",
      gender: "boys",
      type: "single",  // Add type
      matches: [
        { teams: "TE ECS vs SE Comps", winner: "TE ECS", stage: "Final" }
      ]
    },
    {
      name: "Badminton",
      gender: "boys",
      type: "single",  // Add type
      matches: [
        { teams: "TE AIDS vs SE Comps", winner: "SE Comps", stage: "Round 1" },
        { teams: "TE IT vs BE IT", winner: "TE IT", stage: "Round 1" },
        { teams: "SE Comps vs FY Comps", winner: "SE Comps", stage: "Round 1" },
        { teams: "TE IT vs TY CYSE", winner: "TY CYSE", stage: "Round 1" },
        { teams: "SE Comps vs TE EXTC", winner: "SE Comps", stage: "Round 1" },
        { teams: "SY Comps vs SY Comps", winner: "SY Comps", stage: "Round 1" },
        { teams: "Council vs TE ECS", winner: "TE ECS", stage: "Round 1" },
        { teams: "TE ECS vs BE ECS", winner: "TE ECS", stage: "Round 1" },
        { teams: "BE EXTC vs TE ECS", winner: "BE EXTC", stage: "Round 1" },
        { teams: "BE EXTC vs SY Comps", winner: "BE EXTC", stage: "Round 1" }
      ]
    }
    
  ],
} as const

const yearMapping: { [key: number]: string } = {
  1: "FY",
  2: "SY",
  3: "TY",
  4: "B.Tech",
}

interface Team {
  name: string
  points: number
}

interface Participant {
  name?: string
  branch: string
  year: number
}

interface SportData {
  name: string
  icon: string
  type: "indoor" | "outdoor"
  gender: "boys" | "girls" | "mixed"
  category: "single" | "double" | "team"
  winner: Participant
  runnerUp: Participant
}

const processMatchResults = (game: Game): Team[] => {
  const teams: { [key: string]: number } = {}
  game.matches?.forEach((match) => {
    teams[match.winner] = (teams[match.winner] || 0) + 1
  })
  return Object.entries(teams).map(([name, points]) => ({ name, points }))
}
const normalizeTeamName = (name: string): string => {
  // Standardize year prefixes
  let normalized = name.toUpperCase().trim()
  normalized = normalized
    .replace(/^FY|^FE/, "FE")
    .replace(/^SY|^SE/, "SE")
    .replace(/^TY|^TE/, "TE")
    .replace(/^BTECH|^BE/, "BE")

  return normalized
}

const aggregateBranchPoints = () => {
  const teamPoints: Record<string, number> = {}

  Object.values(sports).forEach((category) => {
    category.forEach((game) => {
      game.matches?.forEach((match) => {
        // Skip draws
        if (match.winner === "Draw") return

        // Normalize team name
        const teamName = normalizeTeamName(match.winner)

        // Initialize team if it doesn't exist
        if (!teamPoints[teamName]) {
          teamPoints[teamName] = 0
        }

        // Add one point for each win
        teamPoints[teamName] += 1
      })
    })
  })

  // Convert to array format and sort by points
  return Object.entries(teamPoints)
    .map(([name, points]) => {
      // Extract year from the team name
      const year = name.startsWith("FE") ? 1 
                 : name.startsWith("SE") ? 2
                 : name.startsWith("TE") ? 3
                 : name === "COUNCIL" || name === "INFRA" ? 4
                 : name.startsWith("BE") ? 4 : 0

      return {
        name: name.split(" ")
          .map(part => part.charAt(0) + part.slice(1).toLowerCase())
          .join(" "),
        year,
        points,
      }
    })
    .sort((a, b) => b.points - a.points)
}

interface LeaderboardCardProps {
  game: Game
}

const LeaderboardCard = ({ game }: LeaderboardCardProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const getStageEmoji = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "Quarter-final":
        return "🥉"
      case "Semi-final":
        return "🥈"
      case "final":
        return "🏆"
      default:
        return "🎯"
    }
  }

  const getGenderIcon = (gender?: string) => {
    switch (gender) {
      case "boys":
        return "👨"
      case "girls":
        return "👩"
      default:
        return ""
    }
  }

  const getSportEmoji = (sport: string) => {
    switch (sport.toLowerCase()) {
      case "cricket":
        return "🏏"
      case "football":
        return "⚽"
      case "basketball":
        return "🏀"
      case "volleyball":
        return "🏐"
      case "table tennis":
        return "🏓"
      case "badminton":
        return "🏸"
      case "chess":
        return "♟️"
      case "baseball":
        return "⚾"
      case "tennis":
        return "🎾"
      case "kabbadi":
        return "🤼"
      default:
        return "🏅"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "single":
        return "👤"
      case "double":
        return "👥"
      default:
        return ""
    }
  }

  const sortedMatches = game.matches?.sort((a, b) => {
    const stageOrder = ["Final", "Semi-final", "Quarter-final", "Group-Stage"]
    const aIndex = stageOrder.indexOf(a.stage)
    const bIndex = stageOrder.indexOf(b.stage)
    return sortOrder === "desc" ? aIndex - bIndex : bIndex - aIndex
  })

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"))
  }

  const sortedTeams = processMatchResults(game)
  return (
    <Card >
      <CardHeader>
        <CardTitle>
          {getSportEmoji(game.name)} {game.name}{" "}
          <span className="ml-2">
            {getGenderIcon(game.gender)} {game.gender && game.gender.charAt(0).toUpperCase() + game.gender.slice(1)}{" "}
            <span className="ml-2" title={`${game.type.charAt(0).toUpperCase() + game.type.slice(1)} Game`}>
              {getTypeIcon(game.type)}
            </span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Wins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams
              .sort((a, b) => b.points - a.points)
              .slice(0, 3)
              .map((team, index) => (
              <TableRow key={team.name}>
                <TableCell>{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.points} 🏆</TableCell>
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
                      <TableHead>Wins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTeams
                      .sort((a, b) => b.points - a.points)
                      .map((team, index) => (
                        <TableRow key={team.name}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{team.name}</TableCell>
                          <TableCell>{team.points}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1">View Matches</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{game.name} - Matches 🏆</DialogTitle>
              </DialogHeader>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Match Order</h3>
                <Button onClick={toggleSortOrder} variant="outline">
                  {sortOrder === "desc" ? "Final to Group Stage" : "Group Stage to Final"}
                </Button>
              </div>
              <ScrollArea className="h-[50vh] mt-4">
                {Object.entries(
                  sortedMatches?.reduce(
                    (acc, match) => {
                      if (!acc[match.stage]) {
                        acc[match.stage] = []
                      }
                      ;(acc[match.stage] as NonNullable<typeof game.matches>).push(match)
                      return acc
                    },
                    {} as Record<string, typeof game.matches>,
                  ) ?? {},
                ).map(([stage, matches]) => (
                  <div key={stage} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">
                      {getStageEmoji(stage)} {stage}
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Match</TableHead>
                          <TableHead>Winner</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matches?.map((match, index) => (
                          <TableRow key={index}>
                            <TableCell>{match.teams}</TableCell>
                            <TableCell>{match.winner} 🎉</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

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
  const [branches, setBranches] = useState<{ name: string; year: number; points: number }[]>([])
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const branchLeaderboard = aggregateBranchPoints()
    setBranches(branchLeaderboard)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch("/api/sports")
        if (!res.ok) throw new Error("Network response was not ok")

        const data: SportData[] = await res.json()
        if (Array.isArray(data)) {
          const formattedData = data.reduce<Record<string, SportData>>((acc, sport) => {
            const key = `${sport.name}-${sport.gender}-${sport.category}`
            acc[key] = sport
            return acc
          }, {})

          setSportsData(formattedData)
        } else {
          console.warn("Unexpected data format:", data)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }

    fetchSports()
  }, [])

  const sortedBranches = [...branches].sort((a, b) => b.points - a.points || b.year - a.year)
  const displayedBranches = showAll ? sortedBranches : sortedBranches.slice(0, 5)

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return "🥇"
      case 1:
        return "🥈"
      case 2:
        return "🥉"
      default:
        return index + 1
    }
  }

  return (
    <div className="mt-24">
      <CarouselComponent />

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
          <CardTitle>Branch Leaderboard 🏆</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
                <p className="text-sm text-muted-foreground">Loading leaderboard...</p>
              </div>
            </div>
          ) : (
            <>
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
                      <TableCell>{branch.points} 🏅</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {sortedBranches.length > 5 && (
                <Button className="mt-6 mx-auto block" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show Less" : "Show More"}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <WinnerSection sportsData={sportsData} />

      <Tabs defaultValue="outdoor" className="mt-12 py-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="outdoor">Outdoor Games 🌳</TabsTrigger>
          <TabsTrigger value="indoor">Indoor Games 🏠</TabsTrigger>
        </TabsList>
        {Object.entries(sports)
          .filter(([category]) => category === "outdoor" || category === "indoor")
          .map(([category, games]) => (
            <TabsContent key={category} value={category}>
              <SportsCategorySection games={games} />
            </TabsContent>
          ))}
      </Tabs>
    </div>
  )
}

