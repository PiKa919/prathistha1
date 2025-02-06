import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { events } = await req.json();

    for (const event of events) {
      await Event.updateOne({ name: event.name }, { enabled: event.enabled });
    }

    return NextResponse.json({ message: "Events updated successfully" });
  } catch  {
    return NextResponse.json({ error: "Failed to update events" }, { status: 500 });
  }
}