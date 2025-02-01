import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import Image from "next/image"

interface Event {
  title: string
  description: string
  detailedDescription: string
  date: string
  venue: string
  image: string
}

interface EventCardProps {
  event: Event
  onMoreInfo: () => void
}

export default function EventCard({ event, onMoreInfo }: EventCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative w-full h-40">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex items-center space-x-2 text-lg text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center space-x-2 text-lg text-muted-foreground mt-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{event.venue}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onMoreInfo}>More Info</Button>
      </CardFooter>
    </Card>
  )
}

