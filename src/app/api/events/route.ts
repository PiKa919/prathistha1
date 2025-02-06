import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event, { IEvent } from "@/models/Event";

export async function GET() {
  try {
    await connectDB();
    const events: IEvent[] = await Event.find({});
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, icon, type, event, enabled } = await req.json();

    // Validate event type
    if (!["single", "team"].includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    // Validate event category
    if (!["aurum", "verve"].includes(event)) {
      return NextResponse.json({ error: "Invalid event category" }, { status: 400 });
    }

    const newEvent = new Event({ name, icon, type, event, enabled });
    await newEvent.save();

    return NextResponse.json(newEvent, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}