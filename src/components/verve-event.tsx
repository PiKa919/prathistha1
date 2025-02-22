"use client"

// import { useState } from "react"
import { EventCard } from "./EventCard"
// import EventDetailModal from "./Verve-EventDetailModal"


const festName = "verve";
const events = [
  {
    title: "Human Pool",
    description: "Exciting pool game with a human twist",
    time: "8:00 pm to 4:30 pm",
    place: "Cage",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/Humanpool.webp",
    price: "₹40",
    ranking: { first: "", second: "", third: "" },
    eventHead: "Piyush Kanbhat",
    eventHeadContact: "7977289256",
    eventCoHead: "Rama Bhere",
    eventCoHeadContact: "9004699711",
  },
  {
    title: "Sakec Studio",
    description: "Creative showcase platform",
    time: "8:00 pm to 4:30 pm",
    place: "Foyer",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/SAKEC_STUDIO.webp",
    price: "₹0",
    ranking: { first: "", second: "", third: "" },
    eventHead: "Siddhi Mahajan",
    eventHeadContact: "8779484537",
    eventCoHead: "Tauqeer Siddiqui",
    eventCoHeadContact: "8454060591",
  },
  {
    title: "IPL Auction",
    description: "Team: 360pp | Entry: 60pp",
    time: "8:00 pm to 4:30 pm",
    place: "seminar hall",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/IPL_AUCTION.webp",
    price: "₹350 (team)",
    ranking: {first: "", second: "", third: ""},
    eventHead: "Ankit Ozha",
    eventHeadContact: "996745830",
    eventCoHead: "Arin Pawar",
    eventCoHeadContact: "8928484014",
  },
  {
    title: "FIFA Auction",
    description: "Team: 200pp | Entry: 50pp",
    time: "8:00 pm to 4:30 pm",
    place: "Lab 306",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/FIFA_AUCTION.webp",
    price: "team-120 (team of 2). 60pp",
    ranking: {first: "", second: "", third: ""},
    eventHead: "Neel Mulik",
    eventHeadContact: "7738002054",
    eventCoHead: "Parth Jagad",
    eventCoHeadContact: "8104321575",
  },
  {
    title: "Housie",
    description: "Entry: 30pp",
    time: "8:00 pm to 4:30 pm",
    place: "CR-23",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/HOUSIE_HIVE.webp",
    price: "₹30",
    ranking: {first: "", second: "", third: ""},
    eventHead: "Kush Wadhvana",
    eventHeadContact: "8097329769",
    eventCoHead: "Ravi Gowda",
    eventCoHeadContact: "7795124600",
  },
  {
    title: "Carnival Chaos",
    description: "Entry: 40pp",
    time: "8:00 pm to 4:30 pm",
    place: "CR-31",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/CARNIVAL_CHAOS.webp",
    price: "₹50",
    ranking: {first: "", second: "", third: ""},
    eventHead: "Krisha Thacker",
    eventHeadContact: "7021436465",
    eventCoHead: "Shraddha Shetty",
    eventCoHeadContact: "9152539792",
  },
  {
    title: "Pratistha Got Talent",
    description: "Entry: 100pp",
    time: "8:00 pm to 4:30 pm",
    place: "Auditorium",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/GOT_TALENT.webp",
    price: "₹100pp",
    ranking: {first: "", second: "", third: ""},
    eventHead: "Nihar Morye",
    eventHeadContact: "8591105032",
    eventCoHead: "Vallabh Gaikwad",
    eventCoHeadContact: "7506850928",
  },
  {
    title: "Neon Cricket",
    description: "Entry: 50pp",
    time: "8:00 pm to 4:30 pm",
    place: "7th Floor ED Hall",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/NEON_CRICKET.webp",
    price: "₹55 pp & Team of 5: ₹55pp(₹275)",
    ranking: {first: "", second: "", third: ""},
    eventHead: "Harsh",
    eventHeadContact: "9372829908",
    eventCoHead: "Monarch",
    eventCoHeadContact: "8928244779",
  },
  {
    title: "Stock Exchange",
    description: "Entry: 60pp",
    time: "8:00 pm to 4:30 pm",
    place: "Lab 607",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/STOCK.webp",
    price: "₹60",
    ranking: {first: "", second: "", third: ""},
    eventHead: "Nikhil Epili",
    eventHeadContact: "8260753244",
    eventCoHead: "Lalit Koturu",
    eventCoHeadContact: "9594430493",
  },
  {
    title: "ABCD",
    description: "Entry: 100pp",
    time: "8:00 pm to 4:30 pm",
    place: "Auditorium",
    date: "2025-02-17",
    videoUrl: "",
    imageUrl: "/verve/ABCD.webp",
    price: "₹100",
    ranking: {first: "AARYA MHATRE", second: "PRAPTEE PANCHAL", third: "DRASHTI DOSHI"}, 
    eventHead: "Vedika Katarkar",
    eventHeadContact: "9324694492",
    eventCoHead: "Shivam Shinde",
    eventCoHeadContact: "7977535959",
  },
  // {
  //   title: "Glow in the Dark Pickle Ball",
  //   description: "Entry: 50pp",
  //   time: "8:00 pm to 4:30 pm",
  //   place: "7th Floor ED Hall",
  //   date: "2025-02-17",
  //   videoUrl: "",
  //   imageUrl: "/aurum/GlowInTheDark.webp",
  //   price: "₹50",
  //   ranking: {first: "", second: "", third: ""},
  //   eventHead: "Harsh",
  //   eventHeadContact: "9372829908",
  //   eventCoHead: "Monarch",
  //   eventCoHeadContact: "8928244779",
  // },
];

export default function Events() {
  // const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <div className="container mx-auto py-8 bg-cultural-cream dark:bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-cultural-maroon dark:text-cultural-red">Event Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
                <EventCard key={index} {...event} festName={festName} />
      ))}

      </div>
      {/* {selectedEvent && (
        <EventDetailModal event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
      )} */}
    </div>
  )
}

