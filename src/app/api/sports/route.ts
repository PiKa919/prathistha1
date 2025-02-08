// pages/api/sports.ts
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import {Sport} from "@/models/Sport"

export async function GET() {
  try {
    await connectDB()
    const sports = await Sport.find({})
    return NextResponse.json(sports)  // Always return JSON
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch sports data" }, { status: 500 })
  }
}


export async function POST(req: Request) {
    try {
      await connectDB()
      const body = await req.json()
      const newSport = new Sport(body)
      await newSport.save()
      return NextResponse.json(newSport, { status: 201 })
    } catch (error) {
      console.error("API Error:", error)
      return NextResponse.json({ error: "Failed to add sports data" }, { status: 500 })
    }
  }