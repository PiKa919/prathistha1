'use client'
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { EventModal } from "@/components/EventModal"

interface EventCardProps {
  title: string
  description: string
  time: string
  place: string
  videoUrl: string
  imageUrl: string
  price: string
  ranking: {
    first: string
    second: string
    third: string
  }
  date: string
  eventHead?: string
  eventHeadContact?: string
  eventCoHead?: string
  eventCoHeadContact?: string
  festName?:string
}

export function EventCard({
  title,
  description,
  time,
  place,
  videoUrl,
  imageUrl,
  price,
  ranking,
  date,
  eventHead,
  eventHeadContact,
  eventCoHead,
  eventCoHeadContact,
  festName,
}: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-navy-900 rounded-lg overflow-hidden border border-blue-900/40">
      {/* Image container */}
      <div className="relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          className="w-full object-cover h-48"
        />
        {/* Date badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-blue-950/90 px-3 py-1 rounded-md border border-amber-500/20">
            <span className="block text-xs font-medium text-amber-400">
              {new Date(date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
            </span>
            <span className="block text-lg font-bold text-amber-300">
              {date.split("-")[2]}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-blue-950/50">
        <h3 className="font-bold text-xl mb-3 text-amber-300">
          {title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <p className="text-blue-200 flex items-center text-sm">
            <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {time}
          </p>
          <p className="text-blue-200 flex items-center text-sm">
            <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {place}
          </p>
        </div>

        <div className="mb-4">
          <span className="inline-block bg-blue-900/40 px-3 py-1 rounded-md text-amber-300 text-sm border border-amber-500/20">
            {price}
          </span>
        </div>

        <div className="mb-4">
          {eventHead && eventHeadContact && (
            <p className="text-blue-200 text-sm">
              <strong>Event Head:</strong> {eventHead} ({eventHeadContact})
            </p>
          )}
          {eventCoHead && eventCoHeadContact && (
            <p className="text-blue-200 text-sm">
              <strong>Event Co-Head:</strong> {eventCoHead} ({eventCoHeadContact})
            </p>
          )}
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-900 hover:bg-blue-800 text-amber-300 border border-amber-500/20 transition-colors duration-200"
        >
          More Info
        </Button>
      </div>

      {/* Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        time={time}
        place={place}
        videoUrl={videoUrl}
        price={price}
        imageUrl={imageUrl}
        ranking={ranking}
        festName={festName}
      />
    </div>
  )
}