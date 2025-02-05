"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import RegistrationForm from "../page";
import { useEventStore } from "@/store/useEventStore";


export default function EventRegistrationManager() {
  const { events, setEvents } = useEventStore();
  const [showForm, setShowForm] = useState(true);
  const [tempEvents, setTempEvents] = useState(events); // Temporary state for toggling

  // Sync tempEvents with Zustand store on initial load and when store updates
  useEffect(() => {
    setTempEvents(events);
  }, [events]);

  // Toggle all events locally
  const toggleAllEvents = () => {
    const allEnabled = tempEvents.every((e) => e.enabled);
    setTempEvents(tempEvents.map((event) => ({ ...event, enabled: !allEnabled })));
  };

  // Save changes to Zustand store when "Save Changes" is clicked
  const handleSave = () => {
    setEvents(tempEvents);
    console.log("Saved Events:", tempEvents); // Log the saved state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Event Registration Manager</h1>

        {/* Toggle All Events */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="master-toggle" className="text-xl">Toggle All Events</Label>
            <Switch
              id="master-toggle"
              checked={tempEvents.every((e) => e.enabled)}
              onCheckedChange={toggleAllEvents}
            />
          </div>

          {/* Individual Event Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tempEvents.map((event) => (
              <div key={event.name} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <Label htmlFor={`toggle-${event.name}`} className="flex items-center">
                  <span className="mr-2">{event.icon}</span>
                  {event.name}
                </Label>
                <Switch
                  id={`toggle-${event.name}`}
                  checked={event.enabled}
                  onCheckedChange={() =>
                    setTempEvents(tempEvents.map((e) =>
                      e.name === event.name ? { ...e, enabled: !e.enabled } : e
                    ))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save and Reset Buttons */}
        <div className="mb-6 flex gap-4">
          <Button onClick={handleSave} >
            Save Changes
          </Button>
          <Button onClick={() => setTempEvents(events)} variant="outline">
            Reset
          </Button>
        </div>

        {/* Show/Hide Registration Form */}
        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)} variant="outline">
            {showForm ? "Hide Registration Form" : "Show Registration Form"}
          </Button>
        </div>

        {showForm && <RegistrationForm />}
      </div>
    </div>
  );
}
