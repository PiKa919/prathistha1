"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_WINNERDATA_PASSWORD;
const MAX_ATTEMPTS = 4;
interface Game {
  name: string;
  icon: string;
  type: "indoor" | "outdoor";
  category: "single" | "double" | "team";
}

interface Participant {
  name?: string;
  branch: string;
  year: number | "";
}

interface FormData {
  name: string;
  type: string;
  icon: string;
  category: "single" | "double" | "team" | "";
  gender: "boys" | "girls" | "mixed" | "";
  winner: Participant;
  runnerUp: Participant;
}

const games: Game[] = [
  { name: "Cricket", icon: "🏏", type: "outdoor", category: "team" },
  { name: "Football", icon: "⚽", type: "outdoor", category: "team" },
  { name: "Chess", icon: "♟", type: "indoor", category: "single" },
  { name: "Table Tennis", icon: "🏓", type: "indoor", category: "single" },
  { name: "Volleyball", icon: "🏐", type: "outdoor", category: "team" },
  { name: "Badminton", icon: "🎽", type: "indoor", category: "double" },
  { name: "Throwball", icon: "🏐", type: "outdoor", category: "team" },
  { name: "Box Cricket", icon: "🏏", type: "outdoor", category: "team" },
  { name: "Kabbaddi", icon: "🤼", type: "outdoor", category: "team" },
  { name: "Tug of War", icon: "🤼‍♂️", type: "outdoor", category: "team" },
  { name: "Speed Cubing", icon: "🧊", type: "indoor", category: "single" },
  { name: "Snooker", icon: "🎱", type: "indoor", category: "single" },
  { name: "Pool", icon: "🎱", type: "indoor", category: "single" },
  { name: "Basketball", icon: "🏀", type: "outdoor", category: "team" },
  { name: "Carrom", icon: "🎯", type: "indoor", category: "double" },
  { name: "Dodgeball", icon: "🤾", type: "outdoor", category: "team" }
];

const branches = [
  "Computer Engineering",
  "Information Technology",
  "Electronics & Computer Science",
  "Cyber Security",
  "Electronics and Telecommunication",
  "Artificial Intelligence and Data Science",
  "Advance Communication and Technology",
  "Very Large Scale Integration"
];

const years = [1, 2, 3, 4];
const genders = [
  { value: "boys", label: "Boys" },
  { value: "girls", label: "Girls" },
  { value: "mixed", label: "Mixed" }
];

const categories = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "team", label: "Team" }
];

export default function GameForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    icon: "",
    category: "",
    gender: "",
    winner: { name: "", branch: "", year: "" },
    runnerUp: { name: "", branch: "", year: "" }
  });

  const handleGameSelect = (gameName: string) => {
    const game = games.find(g => g.name === gameName);
    if (game) {
      setSelectedGame(game);
      setFormData(prev => ({
        ...prev,
        name: game.name,
        type: game.type,
        icon: game.icon,
        category: game.category
      }));
    }
  };

  const handleChange = (field: string, value: string | number, section: "winner" | "runnerUp" | null = null) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/sports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to save sports data");
      }

      

      setFormData({
        name: "",
        type: "",
        icon: "",
        category: "",
        gender: "",
        winner: { name: "", branch: "", year: "" },
        runnerUp: { name: "", branch: "", year: "" }
      });
      setSelectedGame(null);
      alert("Sports data saved successfully!");
    } catch (error) {
      console.error("Error saving sports data:", error);
      alert("Failed to save sports data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setAttempts(attempts + 1);
      setPassword("");
      if (attempts + 1 >= MAX_ATTEMPTS) {
        alert("Maximum attempts reached. Access denied.");
      } else {
        alert("Incorrect password. Try again.");
      }
    }
  };

  if (!isAuthenticated && attempts < MAX_ATTEMPTS) {
    return (
      <Card className="mt-6 pt-20">
        <CardHeader>
          <CardTitle>Enter Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="mt-6 pt-20">
      <CardHeader>
        <CardTitle>Game Entry Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select onValueChange={handleGameSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select Game" />
            </SelectTrigger>
            <SelectContent>
              {games.map(game => (
                <SelectItem key={game.name} value={game.name}>
                  {game.icon} {game.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={value => handleChange("category", value)} value={formData.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={value => handleChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              {genders.map(gender => (
                <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedGame && ["winner", "runnerUp"].map(role => (
            <div key={role} className="space-y-2">
              <h3 className="font-semibold">{role === "winner" ? "Winner" : "Runner-Up"}</h3>

              {(formData.category === "single" || formData.category === "double") && (
                <Input
                  placeholder="Participant Name"
                  value={formData[role as "winner" | "runnerUp"].name}
                  onChange={(e) => handleChange("name", e.target.value, role as "winner" | "runnerUp")}
                />
              )}

              <Select onValueChange={value => handleChange("branch", value, role as "winner" | "runnerUp")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={value => handleChange("year", Number(value), role as "winner" | "runnerUp")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
