"use client"
import { useState, useEffect, useMemo } from "react"
import { database } from "@/firebaseConfig"
import { ref, onValue, update, remove } from "firebase/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ImageModal from "@/components/ImageModal"
import * as XLSX from "xlsx"

interface VerveRegistration {
  event: string
  fullName: string
  email: string
  phone: string
  prn: string
  class: string
  branch: string
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
  const [registrations, setRegistrations] = useState<Record<string, VerveRegistration>>({})
  const [filter, setFilter] = useState({ event: "", branch: "", search: "" })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<Record<string, boolean>>({})
  const [editedData, setEditedData] = useState<Record<string, Partial<VerveRegistration>>>({})

  const events = ["ABCD: Anybody Can Dance"]

  const branches = [
    "Computer Engineering",
    "Information Technology",
    "Electronics & Computer Science",
    "AI & Data Science",
    "Electronics & Telecommunication",
    "Advanced Telecommunication",
    "VLSI Design",
    "Cybersecurity",
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = process.env.NEXT_PUBLIC_VERVE_PASSWORD
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
    const verveRef = ref(database, "verve")
    onValue(
      verveRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const sortedData = Object.entries(data)
            .sort(([, a], [, b]) => new Date((b as VerveRegistration).createdAt).getTime() - new Date((a as VerveRegistration).createdAt).getTime())
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

  const filteredRegistrations = useMemo(() => {
    return Object.entries(registrations).filter(
      ([, registration]) =>
        (!filter.event || registration.event === filter.event) &&
        (!filter.branch || registration.branch === filter.branch) &&
        (!filter.search ||
          registration.fullName.toLowerCase().includes(filter.search.toLowerCase()) ||
          registration.prn.toLowerCase().includes(filter.search.toLowerCase())),
    )
  }, [registrations, filter])

  const updateStatus = async (key: string, status: string) => {
    try {
      await update(ref(database, `verve/${key}`), { status })
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update status")
    }
  }

  const handleEditChange = (key: string, field: keyof VerveRegistration, value: string) => {
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
      await update(ref(database, `verve/${key}`), editedData[key])
      setEditMode((prev) => ({ ...prev, [key]: false }))
      setEditedData((prev) => ({ ...prev, [key]: {} }))
    } catch (error) {
      console.error("Error saving changes:", error)
      alert("Failed to save changes")
    }
  }

  const deleteRegistration = async (key: string) => {
    try {
      await remove(ref(database, `verve/${key}`))
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

  const exportToExcel = () => {
    const dataToExport = filteredRegistrations.map(([, registration], index) => ({
      "Sr. No.": index + 1,
      Event: registration.event,
      "Full Name": registration.fullName,
      Email: registration.email,
      Phone: registration.phone,
      PRN: registration.prn,
      Class: registration.class,
      Branch: registration.branch,
      "Payment Reference ID": registration.payment.referenceId,
      "Payment Status": registration.status,
      "Registration Date": new Date(registration.createdAt).toLocaleString(),
    }))

    const ws = XLSX.utils.json_to_sheet(dataToExport)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Verve Registrations")

    const date = new Date().toISOString().split("T")[0]
    const fileName = `verve_registrations_${date}.xlsx`

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
        <ImageModal
          imageUrl={selectedImage}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          transactionId={
            registrations[
              Object.keys(registrations).find((key) => registrations[key].payment.screenshot === selectedImage) || ""
            ]?.payment.referenceId
          }
        />
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Verve Event Registrations</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            {events.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
          <select
            value={filter.branch}
            onChange={(e) => setFilter((prev) => ({ ...prev, branch: e.target.value }))}
            className="bg-gray-800 border-gray-700 rounded-md p-2"
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
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
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>PRN</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Payment Screenshot</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map(([key, registration], index) => (
                <TableRow key={key} className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{registration.event}</TableCell>
                  <TableCell>
                    {editMode[key] ? (
                      <Input
                        value={editedData[key]?.fullName || registration.fullName}
                        onChange={(e) => handleEditChange(key, "fullName", e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                    ) : (
                      registration.fullName
                    )}
                  </TableCell>
                  <TableCell>{registration.email}</TableCell>
                  <TableCell>{registration.phone}</TableCell>
                  <TableCell>{registration.prn}</TableCell>
                  <TableCell>{registration.class}</TableCell>
                  <TableCell>{registration.branch}</TableCell>
                  <TableCell>
                    <select
                      value={registration.status}
                      onChange={(e) => updateStatus(key, e.target.value)}
                      className="bg-gray-800 border-gray-700 rounded-md p-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    {registration.payment.screenshot ? (
                      <Button
                        onClick={() => setSelectedImage(registration.payment.screenshot)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        View Screenshot
                      </Button>
                    ) : (
                      <span className="text-gray-500">No screenshot</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(registration.createdAt).toLocaleDateString()}
                    {new Date(registration.createdAt).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    {editMode[key] ? (
                      <Button onClick={() => saveChanges(key)} className="bg-green-600 hover:bg-green-700">
                        Save
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditMode((prev) => ({ ...prev, [key]: true }))}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          Edit
                        </Button>
                        <Button onClick={() => deleteRegistration(key)} className="bg-red-600 hover:bg-red-700">
                          Delete
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

