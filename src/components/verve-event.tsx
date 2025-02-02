"use client"

import { useState } from "react"
import EventCard from "./verve-eventcard"
import EventDetailModal from "./Verve-EventDetailModal"

interface Event {
  title: string
  description: string
  detailedDescription: string
  date: string
  venue: string
  image: string
}


const events: Event[] = [
    {
      title: "Human Pool",
      description: "Exciting pool game with a human twist",
      detailedDescription: "Contact: Piyush Kanbhat (7977289256), Rama Bhere (9004699711)",
      date: "17-18 Feb",
      venue: "Cage",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Sakec Studio",
      description: "Creative showcase platform",
      detailedDescription: "Contact: Siddhi Mahajan (8779484537), Tauqeer Siddiqui (8454060591)",
      date: "17 Feb",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Barati Dance",
      description: "Traditional dance celebration",
      detailedDescription: "Contact: Jitendra Rajde (7506339878), Rahul Jana (9136726490)",
      date: "TBA",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "IPL Auction",
      description: "Team: 360pp | Entry: 60pp",
      detailedDescription: "Contact: Ankit Ozha (996745830), Arin pawar (8928484014)",
      date: "17 Feb",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "FIFA Auction",
      description: "Team: 200pp | Entry: 50pp",
      detailedDescription: "Contact: Neel Mulik (7738002054), Parth jagad (8104321575)",
      date: "17-18 Feb",
      venue: "Seminar Hall",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Housie",
      description: "Entry: 30pp",
      detailedDescription: "Contact: Kush Wadhvana (8097329769), Ravi gowda (7795124600)",
      date: "17-18 Feb",
      venue: "2nd Floor ED Hall",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Carnival Chaos",
      description: "Entry: 40pp",
      detailedDescription: "Contact: Krisha Thacker (70214 36465), Shraddha shetty (9152539792)",
      date: "17-18 Feb",
      venue: "CR-31",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Pratistha Got Talent",
      description: "Entry: 100pp",
      detailedDescription: "Contact: Nihar morye (85911 05032), Vallabh Gaikwad (7506850928)",
      date: "18 Feb",
      venue: "Auditorium",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Glow in the Dark Pickle Ball",
      description: "Entry: 50pp",
      detailedDescription: "Contact: Harsh Solanki (9372829908), Monarch Vakani (8928244779)",
      date: "17-18 Feb",
      venue: "ED Hall",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Stock Exchange",
      description: "Entry: 60pp",
      detailedDescription: "Contact: Nikhil Epili (8260753244), Lalit koturu (9594430493)",
      date: "17-18 Feb",
      venue: "4th Floor Cyber Lab",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "ABCD",
      description: "Entry: 100pp",
      detailedDescription: "Contact: Vedika Katarkar (9324694492), Shivam Shinde (7977535959)",
      date: "8 Feb",
      venue: "Auditorium",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Reel Making",
      description: "Online Competition",
      detailedDescription: "Contact: Abhishek Patil (9156129555), Tanvi Lawhale (8855053721)",
      date: "6 Feb to 20 Feb",
      venue: "Online",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Adakaar Drama",
      description: "Dramatic performances",
      detailedDescription: "Drama competition showcasing theatrical talents",
      date: "18 Feb",
      venue: "Auditorium",
      image: "/placeholder.svg?height=200&width=300",
    }
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <div className="container mx-auto py-8 bg-cultural-cream dark:bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-cultural-maroon dark:text-cultural-red">Event Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} event={event} onMoreInfo={() => setSelectedEvent(event)} />
        ))}
      </div>
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}

