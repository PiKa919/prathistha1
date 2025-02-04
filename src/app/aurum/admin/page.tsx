"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { database } from "@/firebaseConfig"
import { ref, onValue, update, remove } from "firebase/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import * as XLSX from "xlsx"
import Image from "next/image"

interface TeamMember {
  fullName: string
  email: string
  phone: string
  prn: string
  class: string
  branch: string
  isTeamLeader: boolean
}

interface EventRegistration {
  id: string
  event: string
  teamSize: number
  members: TeamMember[]
  payment: {
    referenceId: string
    timestamp: string
    screenshot: string
  }
  status: string
  createdAt: string
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null)
  const [registrations, setRegistrations] = useState<Record<string, EventRegistration>>({})
  const [filter, setFilter] = useState({ event: "", search: "" })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<Record<string, boolean>>({})
  const [editedData, setEditedData] = useState<Record<string, Partial<EventRegistration>>>({})
  const [selectedTeam, setSelectedTeam] = useState<TeamMember[] | null>(null)
  const [editingCell, setEditingCell] = useState<{ key: string; field: keyof EventRegistration } | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = process.env.NEXT_PUBLIC_AURUM_PASSWORD
    const now = Date.now()

    if (lockoutUntil && now < lockoutUntil) {
      alert(`Too many failed attempts. Please try again later.`)
      return
    }

    if (password === adminPassword) {
      setIsAuthenticated(true)
      setLoginAttempts(0)
      fetchData()
    } else {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

      if (newAttempts >= 5) {
        const lockoutTime = now + 15 * 60 * 1000 // 15 minutes lockout
        setLockoutUntil(lockoutTime)
        alert("Too many failed attempts. Please try again in 15 minutes.")
      } else {
        alert(`Invalid password. ${5 - newAttempts} attempts remaining.`)
      }
    }
  }

  const fetchData = () => {
    const aurumRef = ref(database, "aurum")
    onValue(
      aurumRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const sortedData = Object.entries(data)
            .sort(([, a], [, b]) =>
              (b as EventRegistration).createdAt.localeCompare((a as EventRegistration).createdAt),
            )
            .reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: value,
              }),
              {},
            )
          setRegistrations(sortedData)
        } else {
          setRegistrations({})
        }
        setIsLoading(false)
      },
      (error) => {
        console.error("Error fetching data:", error)
        alert(`Error fetching data: ${error.message}`)
        setIsLoading(false)
      },
    )
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const getTeamLeader = useCallback((members: TeamMember[]): TeamMember => {
    return members.find((member) => member.isTeamLeader) || members[0]
  }, [])

  const filteredRegistrations = useMemo(() => {
    return Object.entries(registrations).filter(([, registration]) => {
      const teamLeader = getTeamLeader(registration.members)
      return (
        (!filter.event || registration.event === filter.event) &&
        (!filter.search ||
          teamLeader.fullName.toLowerCase().includes(filter.search.toLowerCase()) ||
          teamLeader.prn.toLowerCase().includes(filter.search.toLowerCase()))
      )
    })
  }, [registrations, filter, getTeamLeader])

  // const updateStatus = async (key: string, status: string) => {
  //   try {
  //     await update(ref(database, `aurum/${key}`), { status })
  //   } catch (error) {
  //     console.error("Error updating status:", error)
  //     alert("Failed to update status")
  //   }
  // }

  const handleEditChange = (key: string, field: keyof EventRegistration, value: string | number) => {
    setEditedData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }))
  }

  const saveChanges = async (key: string) => {
    try {
      await update(ref(database, `aurum/${key}`), editedData[key])
      setEditMode((prev) => ({ ...prev, [key]: false }))
      setEditedData((prev) => ({ ...prev, [key]: {} }))
      setEditingCell(null)
    } catch (error) {
      console.error("Error saving changes:", error)
      alert("Failed to save changes")
    }
  }

  const deleteRegistration = async (key: string) => {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      try {
        await remove(ref(database, `aurum/${key}`))
        setRegistrations((prev) => {
          const updated = { ...prev }
          delete updated[key]
          return updated
        })
      } catch (error) {
        console.error("Error deleting registration:", error)
        alert("Failed to delete registration")
      }
    }
  }

  const exportToExcel = () => {
    const dataToExport = filteredRegistrations.map(([, registration], index) => {
      const teamLeader = getTeamLeader(registration.members)
      return {
        "Sr. No.": index + 1,
        Event: registration.event,
        "Team Size": registration.teamSize,
        "Team Leader": teamLeader.fullName,
        Email: teamLeader.email,
        Phone: teamLeader.phone,
        PRN: teamLeader.prn,
        Class: teamLeader.class,
        Branch: teamLeader.branch,
        Status: registration.status,
        "Payment Reference ID": registration.payment.referenceId,
        "Payment Screenshot": registration.payment.screenshot || "No screenshot",
        "Registration Date": new Date(registration.createdAt).toLocaleString(),
      }
    })

    const ws = XLSX.utils.json_to_sheet(dataToExport)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Event Registrations")

    const date = new Date().toISOString().split("T")[0]
    const fileName = `event_registrations_${date}.xlsx`

    XLSX.writeFile(wb, fileName)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md p-8 bg-gray-900 rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          {lockoutUntil && Date.now() < lockoutUntil ? (
            <div className="text-red-500 text-center mb-4">
              Account locked. Try again in {Math.ceil((lockoutUntil - Date.now()) / 60000)} minutes.
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700"
                disabled={lockoutUntil !== null && Date.now() < lockoutUntil}
              />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={lockoutUntil !== null && Date.now() < lockoutUntil}>
            Login
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-20">
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Payment Screenshot</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-[600px]">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Payment Screenshot"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Event Registrations</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">Total Registrations: {filteredRegistrations.length}</div>
            <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700">
              Export to Excel
            </Button>
            <Button onClick={() => setIsAuthenticated(false)} className="bg-red-600 hover:bg-red-700">
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="Search by name or PRN"
            value={filter.search}
            onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
            className="bg-gray-800 border-gray-700"
          />
          <select
            value={filter.event}
            onChange={(e) => setFilter((prev) => ({ ...prev, event: e.target.value }))}
            className="bg-gray-800 border-gray-700 rounded-md p-2"
          >
            <option value="">All Events</option>
            {Array.from(new Set(Object.values(registrations).map((r) => r.event))).map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No.</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Team Size</TableHead>
                <TableHead>Team Leader</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>PRN</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Team Detail</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map(([key, registration], index) => {
                const teamLeader = getTeamLeader(registration.members)
                return (
                  <TableRow key={key} className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell onClick={() => editMode[key] && setEditingCell({ key, field: "event" })}>
                      {editMode[key] && editingCell?.key === key && editingCell?.field === "event" ? (
                        <Input
                          value={editedData[key]?.event || registration.event}
                          onChange={(e) => handleEditChange(key, "event", e.target.value)}
                          onBlur={() => setEditingCell(null)}
                          autoFocus
                        />
                      ) : (
                        registration.event
                      )}
                    </TableCell>
                    <TableCell onClick={() => editMode[key] && setEditingCell({ key, field: "teamSize" })}>
                      {editMode[key] && editingCell?.key === key && editingCell?.field === "teamSize" ? (
                        <Input
                          type="number"
                          value={editedData[key]?.teamSize || registration.teamSize}
                          onChange={(e) => handleEditChange(key, "teamSize", Number.parseInt(e.target.value))}
                          onBlur={() => setEditingCell(null)}
                          autoFocus
                        />
                      ) : (
                        registration.teamSize
                      )}
                    </TableCell>
                    <TableCell>{teamLeader.fullName}</TableCell>
                    <TableCell>{teamLeader.email}</TableCell>
                    <TableCell>{teamLeader.phone}</TableCell>
                    <TableCell>{teamLeader.prn}</TableCell>
                    <TableCell>{teamLeader.class}</TableCell>
                    <TableCell>{teamLeader.branch}</TableCell>
                    <TableCell onClick={() => editMode[key] && setEditingCell({ key, field: "status" })}>
                      {editMode[key] && editingCell?.key === key && editingCell?.field === "status" ? (
                        <Input
                          value={editedData[key]?.status || registration.status}
                          onChange={(e) => handleEditChange(key, "status", e.target.value)}
                          onBlur={() => setEditingCell(null)}
                          autoFocus
                        />
                      ) : (
                        registration.status
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => setSelectedImage(registration.payment.screenshot)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        View Screenshot
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => setSelectedTeam(registration.members)}
                        className="bg-purple-600 hover:bg-purple-700 ml-2"
                      >
                        View Team
                      </Button>
                    </TableCell>
                    <TableCell>
                      {new Date(registration.createdAt).toLocaleDateString()}
                      {new Date(registration.createdAt).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {editMode[key] ? (
                          <Button onClick={() => saveChanges(key)} className="bg-green-600 hover:bg-green-700">
                            Save
                          </Button>
                        ) : (
                          <Button
                            onClick={() => setEditMode((prev) => ({ ...prev, [key]: true }))}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            Edit
                          </Button>
                        )}
                        <Button onClick={() => deleteRegistration(key)} className="bg-red-600 hover:bg-red-700">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      {selectedTeam && (
        <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Team Members</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>PRN</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTeam.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>{member.fullName}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.prn}</TableCell>
                      <TableCell>{member.class}</TableCell>
                      <TableCell>{member.branch}</TableCell>
                      <TableCell>{member.isTeamLeader ? "Team Leader" : "Member"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

