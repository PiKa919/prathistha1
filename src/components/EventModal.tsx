import Image from 'next/image'
import Link from 'next/link'
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
  imageUrl: string
  ranking: {
    first: string
    second: string
    third: string
  }
  festName?: string
}

export function EventModal({ isOpen, onClose, title, description, time, place, videoUrl, price, imageUrl, ranking,festName }: EventModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 flex-1">
            <DialogHeader>
              <DialogTitle className="text-3xl mb-6">{title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <p className="text-gray-700">{description}</p>
              <div className="text-sm text-gray-600">
                <p>Time: {time}</p>
                <p>Place: {place}</p>
                <p className="font-semibold text-gray-800">Price: {price}</p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-lg mb-2">Event Rankings</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>1st Place: {ranking.first}</li>
                  <li>2nd Place: {ranking.second}</li>
                  <li>3rd Place: {ranking.third}</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 mt-6">
                <Button asChild className="flex-1">
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Watch on YouTube
                  </a>
                </Button>
                <Link href={`${festName}/registeration`}>
                  <Button className="flex-1">Register</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative p-4">
            <div className="relative h-full w-full">
              <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg border-2 border-gray-200"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
