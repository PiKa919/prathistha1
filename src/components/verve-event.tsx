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
      title: "SAKEC Studio",
      description: "A creative space for showcasing artistic and media talents.",
      detailedDescription:
        "SAKEC Studio is a vibrant platform where students can exhibit their artistic prowess and media skills. From photography to digital art, this event celebrates creativity in all its forms. Participants will have the opportunity to showcase their work, receive feedback from peers and professionals, and potentially win recognition for their talents.",
      date: "11th March",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Housie",
      description: "A fun-filled numbers game where luck decides the winners.",
      detailedDescription:
        "Housie is an exciting game of chance that brings together participants for an engaging experience. Players mark numbers on their cards as they're called out, aiming to complete a pattern and claim victory. Prizes and surprises make this event even more thrilling.",
      date: "11th - 13th March",
      venue: "Lab 23",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Bowling",
      description: "Enjoy a thrilling game of target bowling with friends.",
      detailedDescription:
        "Compete with friends in this exciting bowling event, where precision and skill determine the winners. Aim for the highest score as you roll the ball towards the pins in a test of focus and accuracy.",
      date: "11th - 13th March",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Adventure Games",
      description: "Exciting challenges to test your skills and teamwork.",
      detailedDescription:
        "Adventure Games is a collection of thrilling challenges designed to test endurance, strategy, and teamwork. Participants will navigate obstacles, solve puzzles, and push their limits in this adrenaline-filled experience.",
      date: "11th - 13th March",
      venue: "CR 31, 34",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Neon Cricket",
      description: "Experience cricket with a glowing neon twist!",
      detailedDescription:
        "Neon Cricket brings a dazzling glow-in-the-dark experience to the classic game of cricket. With neon-lit equipment and a vibrant atmosphere, this event takes cricket to the next level.",
      date: "11th - 13th March",
      venue: "7th Floor ED",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Octaves",
      description: "A musical extravaganza featuring talented vocalists.",
      detailedDescription:
        "Octaves is a celebration of melody and rhythm, where talented vocalists take the stage to mesmerize the audience. From solo performances to duets, this event is a treat for music lovers.",
      date: "11th March",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Mono-Acting",
      description: "A solo performance drama competition with impactful storytelling.",
      detailedDescription:
        "Mono-Acting is a stage event where performers captivate the audience with their dramatic storytelling skills. Each participant brings a unique story to life through expressions, voice modulation, and body language.",
      date: "11th March",
      venue: "7th Floor Audi",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Stock Exchange",
      description: "Simulated trading experience to test financial acumen.",
      detailedDescription:
        "Step into the shoes of a stock market trader in this simulated exchange event. Buy, sell, and strategize your way to success as you experience the highs and lows of the financial world.",
      date: "11th March",
      venue: "4th Floor Audi",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Step it up",
      description: "A high-energy dance competition showcasing unique moves.",
      detailedDescription:
        "Showcase your best moves in this electrifying dance competition. Participants will battle it out on the dance floor, bringing creativity, rhythm, and energy to the stage.",
      date: "12th March",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "War of DJs x Neon Party",
      description: "An electrifying battle of DJs under neon lights.",
      detailedDescription:
        "Experience an epic battle of beats as DJs compete to own the dance floor. The Neon Party vibe adds an exciting twist with glowing visuals and high-energy music.",
      date: "12th March",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "IPL Auction",
      description: "A strategic bidding competition based on the IPL format.",
      detailedDescription:
        "Test your strategic skills in the IPL Auction, where participants bid for players to form their dream cricket team. Smart decision-making and budget management are key to victory.",
      date: "12th March",
      venue: "4th Floor Audi",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Fun Fair",
      description: "A lively carnival filled with games and entertainment.",
      detailedDescription:
        "Enjoy a day full of joy and excitement at the Fun Fair. With engaging games, food stalls, and entertainment, this event guarantees a great time for all.",
      date: "12th March",
      venue: "Cage",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "FIFA Auction",
      description: "Bid and build your dream football team in this exciting event.",
      detailedDescription:
        "Similar to the IPL Auction, this event lets participants build their ultimate football team by strategically bidding for players and forming the perfect lineup.",
      date: "12th March",
      venue: "7th Floor Audi",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Bidding Quiz",
      description: "A trivia quiz where participants bid on their knowledge.",
      detailedDescription:
        "Bidding Quiz adds an exciting twist to traditional quizzes. Participants bid points before answering questions, making it a test of both knowledge and risk-taking ability.",
      date: "12th March",
      venue: "CR 61, 64",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Glass Painting",
      description: "Create beautiful art on glass with vibrant colors.",
      detailedDescription:
        "Unleash your inner artist in this glass painting competition. Participants will craft stunning designs on glass surfaces, showcasing their creativity and artistic skills.",
      date: "13th March",
      venue: "Foyer",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Debate",
      description: "Engage in intellectual battles with strong arguments.",
      detailedDescription:
        "Challenge your intellect and persuasion skills in this intense debate competition. Participants will present compelling arguments, counter opponents, and strive to win the debate.",
      date: "13th March",
      venue: "CR 51, 58",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Tu Kheech Meri Photo",
      description: "An online photography contest to capture stunning moments.",
      detailedDescription:
        "Capture and submit your best photographs for this online competition. This event rewards creativity, perspective, and storytelling through the lens.",
      date: "4th Onwards",
      venue: "Online",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Reel & Meme Making",
      description: "Create engaging reels and memes to entertain and inspire.",
      detailedDescription:
        "Showcase your creativity in this social media-focused event. Participants will create engaging reels or funny memes to entertain the audience and go viral!",
      date: "4th Onwards",
      venue: "Online",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Faculty Verve",
      description: "A special event dedicated to faculty performances and fun.",
      detailedDescription:
        "Faculty Verve is a unique event that turns the spotlight on our esteemed faculty members. Watch as your professors showcase their hidden talents, from singing and dancing to stand-up comedy and more.",
      date: "11th March",
      venue: "7th Floor Audi",
      image: "/placeholder.svg?height=200&width=300",
    }
  ];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Event Schedule</h1>
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

