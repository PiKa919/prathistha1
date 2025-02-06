"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface IEvent {
  name: string;
  icon: string;
  type: "single" | "team";
  event: "aurum" | "verve";
  enabled: boolean;
}

export default function EventRegistrationManager() {
  // const { events } = useEventStore() as unknown as { events: IEvent[], setEvents: (events: IEvent[]) => void };
  const [tempEvents, setTempEvents] = useState<IEvent[]>([]); // Temporary state for toggling

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        const aurumEvents = response.data.filter((event: IEvent) => event.event === "aurum");
        setTempEvents(aurumEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);

  // Sync tempEvents with Zustand store on initial load and when store updates
  // useEffect(() => {
  //   setTempEvents(events.filter((event) => event.event === "aurum"));
  // }, [events]);

  // Toggle all events locally
  const toggleAllEvents = () => {
    const allEnabled = tempEvents.every((e) => e.enabled);
    setTempEvents(tempEvents.map((event) => ({ ...event, enabled: !allEnabled })));
  };

  // Toggle individual event
  const toggleEvent = (eventName: string) => {
    setTempEvents(tempEvents.map((event) =>
      event.name === eventName ? { ...event, enabled: !event.enabled } : event
    ));
  };

  // Save changes to Zustand store when "Save Changes" is clicked
  const saveChanges = async () => {
    try {
      await axios.put("/api/update-events", { events: tempEvents });
      alert("Changes saved successfully");
    } catch (error) {
      console.error("Failed to save changes", error);
      alert("Failed to save changes");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-20">
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
                  onCheckedChange={() => toggleEvent(event.name)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save and Reset Buttons */}
        <div className="mb-6 flex gap-4">
          <Button onClick={saveChanges} >
            Save Changes
          </Button>
          {/* <Button onClick={() => setTempEvents(events)} variant="outline">
            Reset
          </Button> */}
        </div>

        {/* Show/Hide Registration Form */}
        {/* <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)} variant="outline">
            {showForm ? "Hide Registration Form" : "Show Registration Form"}
          </Button>
        </div> */}

        {/* {showForm && <RegistrationForm />} */}
      </div>
    </div>
  );
}
