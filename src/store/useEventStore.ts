"use client";

import { create } from "zustand";

type Event = {
  name: string;
  icon: string;
  type: "single" | "team";
  enabled: boolean;
};

type EventStore = {
  events: Event[];
  showForm: boolean;
  toggleEvent: (name: string) => void;
  setEvents: (events: Event[]) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  events: [
    { name: "Crime Scene Investigation", icon: "🕵️", type: "team", enabled: true },
    { name: "Escape Room", icon: "🚪", type: "team", enabled: true },
    { name: "AR Treasure Hunt", icon: "🗺️", type: "team", enabled: true },
    { name: "Giant Jenga", icon: "🧱", type: "single", enabled: true },
    { name: "Glow-in-the-Dark Pickleball", icon: "🏓", type: "single", enabled: true },
    { name: "Laser Maze", icon: "🔦", type: "single", enabled: true },
    { name: "BGMI Tournament", icon: "📱", type: "team", enabled: true },
    { name: "Valorant Championship", icon: "🎮", type: "team", enabled: true },
    { name: "Robo Sumo", icon: "🤖", type: "team", enabled: true },
    { name: "Robo Race", icon: "🏎️", type: "team", enabled: true },
    { name: "Cozmo Clench", icon: "🦾", type: "single", enabled: true },
    { name: "Technokagaz", icon: "📄", type: "single", enabled: true },
    { name: "Tech Expo", icon: "🔬", type: "single", enabled: true },
    { name: "Code of Duty", icon: "💻", type: "single", enabled: true },
    { name: "Cybersecurity Challenge", icon: "🔒", type: "single", enabled: true },
    { name: "FIFA Tournament", icon: "⚽", type: "single", enabled: true },
    { name: "VR Room", icon: "🥽", type: "single", enabled: true },
    { name: "Mortal Kombat Tournament", icon: "🥋", type: "single", enabled: true },
    { name: "Midtown Madness", icon: "🏙️", type: "team", enabled: true },
  ],

  showForm: true,
  
  toggleEvent: (name) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.name === name ? { ...event, enabled: !event.enabled } : event
      ),
    })),

  setEvents: (events) => set(() => ({ events })),
}));
