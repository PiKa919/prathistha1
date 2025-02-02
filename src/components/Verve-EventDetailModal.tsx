import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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

interface EventDetailModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export default function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] bg-cultural-cream dark:bg-zinc-900 border-2 border-cultural-maroon dark:border-cultural-red">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cultural-maroon dark:text-cultural-red">{event.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="relative w-full h-48">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <DialogDescription className="text-lg text-cultural-deepred dark:text-cultural-gold">{event.description}</DialogDescription>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-cultural-deepred dark:text-cultural-gold">
              <CalendarIcon className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-cultural-deepred dark:text-cultural-gold">
              <MapPinIcon className="h-4 w-4" />
              <span>{event.venue}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-cultural-maroon dark:text-cultural-red">Detailed Description</h3>
            <p className="text-sm text-cultural-deepred dark:text-cultural-gold">{event.detailedDescription}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

