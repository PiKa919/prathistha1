"use client"
import { useState } from 'react';

interface EventRanking {
    first: string;
    second: string;
    third: string;
}

interface Event {
    id: number;
    title: string;
    description: string;
    time: string;
    place: string;
    videoUrl: string;
    imageUrl: string;
    price: string;
    ranking: EventRanking;
}

const initialEvents: Event[] = [
    // ...existing events array with an added 'id' field for each event...
    {
        id: 1,
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
    // ...other events...
];

export default function AdminPage() {
  const [events, setEvents] = useState(initialEvents);

const handleInputChange = (id: number, field: keyof Event, value: string) => {
    setEvents(events.map(event => 
        event.id === id ? { ...event, [field]: value } : event
    ));
};

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 mt-20">
      <h2 className="text-2xl font-bold mb-6">Admin: Manage Events</h2>
      {events.map(event => (
        <div key={event.id} className="mb-4 p-4 bg-gray-800 rounded">
          <input
            type="text"
            value={event.title}
            onChange={(e) => handleInputChange(event.id, 'title', e.target.value)}
            className="block w-full mb-2 p-2 bg-gray-700 text-white"
          />
          <textarea
            value={event.description}
            onChange={(e) => handleInputChange(event.id, 'description', e.target.value)}
            className="block w-full mb-2 p-2 bg-gray-700 text-white"
          />
          <input
            type="text"
            value={event.time}
            onChange={(e) => handleInputChange(event.id, 'time', e.target.value)}
            className="block w-full mb-2 p-2 bg-gray-700 text-white"
          />
          <input
            type="text"
            value={event.place}
            onChange={(e) => handleInputChange(event.id, 'place', e.target.value)}
            className="block w-full mb-2 p-2 bg-gray-700 text-white"
          />
          <input
            type="text"
            value={event.videoUrl}
            onChange={(e) => handleInputChange(event.id, 'videoUrl', e.target.value)}
            className="block w-full mb-2 p-2 bg-gray-700 text-white"
          />
          <input
            type="text"
            value={event.imageUrl}
            onChange={(e) => handleInputChange(event.id, 'imageUrl', e.target.value)}
            className="block w-full mb-2 p-2 bg-gray-700 text-white"
          />
          <input
            type="text"
            value={event.price}
            onChange={(e) => handleInputChange(event.id, 'price', e.target.value)}
            className="block w-full mb-2 p-2 bg-gray-700 text-white"
          />
          {/* Add more fields as necessary */}
        </div>
      ))}
    </div>
  );
}
