import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  time: string
  place: string
  videoUrl: string
  price: string
}

export function EventModal({ isOpen, onClose, title, description, time, place, videoUrl, price }: EventModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>{description}</p>
          <p>Time: {time}</p>
          <p>Place: {place}</p>
          <p className="font-semibold">Price: {price}</p>
          <div className="flex justify-between">
            <Button asChild>
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Watch on YouTube
              </a>
            </Button>
            <Button>Register</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

