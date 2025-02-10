"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Loader2 } from "lucide-react";


interface IEvent {
  name: string;
  icon: string;
  type: "single" | "team";
  event: "aurum" | "verve";
  enabled: boolean;
}

export default function EventRegistrationManager() {
  const [tempEvents, setTempEvents] = useState<IEvent[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [isSaving, setIsSaving] = useState(false);

  const correctPassword = process.env.NEXT_PUBLIC_TOGGLEEVENTS_PASSWORD;

  useEffect(() => {
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      setAttemptsLeft((prev) => prev - 1);
      alert(`Incorrect password. Attempts left: ${attemptsLeft - 1}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const toggleAllEvents = () => {
    const allEnabled = tempEvents.every((e) => e.enabled);
    setTempEvents(tempEvents.map((event) => ({ ...event, enabled: !allEnabled })));
  };

  const toggleEvent = (eventName: string) => {
    setTempEvents(tempEvents.map((event) =>
      event.name === eventName ? { ...event, enabled: !event.enabled } : event
    ));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      await axios.put("/api/update-events", { events: tempEvents });
      alert("Changes saved successfully");
    } catch (error) {
      console.error("Failed to save changes", error);
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              className="p-2 border rounded bg-gray-900 text-white w-full pr-10"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={attemptsLeft === 0}
            />
            <button
              type="button"
              className="absolute right-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <Button className="mt-4" onClick={handleLogin} disabled={attemptsLeft === 0}>Login</Button>
          {attemptsLeft === 0 && <p className="text-red-500 mt-2">Too many failed attempts.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Event Registration Manager</h1>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="master-toggle" className="text-xl">Toggle All Events</Label>
            <Switch
              id="master-toggle"
              checked={tempEvents.every((e) => e.enabled)}
              onCheckedChange={toggleAllEvents}
            />
          </div>
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
        <div className="mb-6 flex gap-4">
          <Button onClick={saveChanges} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}