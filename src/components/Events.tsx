import { EventCard } from './EventCard'

const events = [
  {
    title: "Crime Scene Investigation",
    description: "Put your detective skills to the test in this thrilling crime scene investigation challenge.",
    time: "10:00 AM - 12:00 PM",
    place: "Forensic Lab",
    videoUrl: "https://www.youtube.com/live/q_JsgpiuY98?si=GkrEnp70QbssXf55",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹200",
    ranking: {
      first: "Team Sherlock",
      second: "CSI Masters",
      third: "Detective Squad"
    }
  },
  {
    title: "Escape Room",
    description: "Work together to solve puzzles and escape before time runs out!",
    time: "11:00 AM - 1:00 PM",
    place: "Mystery Room",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹250",
    ranking: {
      first: "Escape Artists",
      second: "Puzzle Breakers",
      third: "Time Benders"
    }
  },
  {
    title: "AR Treasure Hunt",
    description: "Embark on a high-tech treasure hunt using augmented reality.",
    time: "2:00 PM - 4:00 PM",
    place: "Campus Grounds",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹150",
    ranking: {
      first: "Team Rocket",
      second: "Treasure Hunters",
      third: "AR Explorers"
    }
  },
  {
    title: "Giant Jenga",
    description: "Test your steady hands and strategy in this supersized version of the classic game.",
    time: "3:00 PM - 5:00 PM",
    place: "Main Quad",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹100",
    ranking: {
      first: "Jenga Masters",
      second: "Tower Builders",
      third: "Steady Hands"
    }
  },
  {
    title: "Glow-in-the-Dark Pickleball",
    description: "Experience the fast-paced fun of pickleball with a luminous twist!",
    time: "7:00 PM - 9:00 PM",
    place: "Sports Complex",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹180",
    ranking: {
      first: "Night Owls",
      second: "Glow Getters",
      third: "Pickleball Pros"
    }
  },
  {
    title: "Laser Maze",
    description: "Navigate through a web of lasers in this Mission Impossible-style challenge.",
    time: "1:00 PM - 3:00 PM",
    place: "Physics Lab",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹220",
    ranking: {
      first: "Laser Ninjas",
      second: "Maze Masters",
      third: "Mission Accomplished"
    }
  },
  {
    title: "BGMI Tournament",
    description: "Compete in the ultimate BGMI showdown!",
    time: "4:00 PM - 8:00 PM",
    place: "Gaming Arena",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹300",
    ranking: {
      first: "Chicken Dinners",
      second: "BGMI Champs",
      third: "Elite Squad"
    }
  },
  {
    title: "Valorant Championship",
    description: "Show off your tactical prowess in this Valorant tournament.",
    time: "5:00 PM - 9:00 PM",
    place: "E-Sports Center",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹300",
    ranking: {
      first: "Valorant Veterans",
      second: "Tactical Titans",
      third: "Agent Aces"
    }
  },
  {
    title: "Robo Sumo",
    description: "Build and battle with your sumo wrestling robots!",
    time: "11:00 AM - 1:00 PM",
    place: "Robotics Lab",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹250",
    ranking: {
      first: "Robo Rumble",
      second: "Sumo Stars",
      third: "Bot Brawlers"
    }
  },
  {
    title: "Robo Race",
    description: "Design, build, and race your custom robots in this high-speed competition.",
    time: "2:00 PM - 4:00 PM",
    place: "Racing Track",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹280",
    ranking: {
      first: "Speed Demons",
      second: "Robo Racers",
      third: "Circuit Champions"
    }
  },
  {
    title: "Cozmo Clench",
    description: "Program Cozmo robots to complete challenging tasks in this AI-focused event.",
    time: "3:00 PM - 5:00 PM",
    place: "AI Lab",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹200",
    ranking: {
      first: "AI Aces",
      second: "Cozmo Commanders",
      third: "Coding Crew"
    }
  },
  {
    title: "Technokagaz",
    description: "Showcase your paper circuit designs in this innovative tech-meets-craft event.",
    time: "10:00 AM - 12:00 PM",
    place: "Design Studio",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹150",
    ranking: {
      first: "Circuit Wizards",
      second: "Paper Pros",
      third: "Technocrats"
    }
  },
  {
    title: "Tech Expo",
    description: "Explore cutting-edge technology demonstrations from industry leaders and student innovators.",
    time: "9:00 AM - 5:00 PM",
    place: "Exhibition Hall",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "Free",
    ranking: {
      first: "Innovation Inc.",
      second: "Tech Titans",
      third: "Future Forward"
    }
  },
  {
    title: "Code of Duty",
    description: "Test your coding skills in this fast-paced programming challenge.",
    time: "1:00 PM - 3:00 PM",
    place: "Computer Lab",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹200",
    ranking: {
      first: "Coding Ninjas",
      second: "Debug Masters",
      third: "Algorithm Aces"
    }
  },
  {
    title: "Cybersecurity Challenge",
    description: "Defend against simulated cyber attacks in this intense security competition.",
    time: "4:00 PM - 6:00 PM",
    place: "Security Operations Center",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹250",
    ranking: {
      first: "Cyber Warriors",
      second: "Security Squad",
      third: "Firewall Force"
    }
  },
  {
    title: "FIFA Tournament",
    description: "Show off your virtual football skills in this exciting FIFA tournament.",
    time: "6:00 PM - 10:00 PM",
    place: "Gaming Lounge",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹200",
    ranking: {
      first: "FIFA Fanatics",
      second: "Football Fury",
      third: "Goal Getters"
    }
  },
  {
    title: "VR Room",
    description: "Immerse yourself in virtual worlds and experience the future of gaming and simulation.",
    time: "11:00 AM - 7:00 PM",
    place: "VR Lab",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹300",
    ranking: {
      first: "VR Voyagers",
      second: "Virtual Victors",
      third: "Reality Rebels"
    }
  },
  {
    title: "Mortal Kombat Tournament",
    description: "Test your fighting game skills in this classic Mortal Kombat showdown.",
    time: "7:00 PM - 11:00 PM",
    place: "Arcade Center",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹180",
    ranking: {
      first: "Kombat Kings",
      second: "Fighting Force",
      third: "Mortal Masters"
    }
  },
  {
    title: "Midtown Madness",
    description: "Race through virtual city streets in this exciting gaming event.",
    time: "5:00 PM - 8:00 PM",
    place: "Simulation Room",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: "₹220",
    ranking: {
      first: "Street Racers",
      second: "City Slickers",
      third: "Speed Demons"
    }
  }
]

export function Events() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  )
}

