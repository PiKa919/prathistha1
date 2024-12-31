"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { database } from "@/firebaseConfig"
import { ref, set, onValue, remove } from "firebase/database"

interface ParticipantData {
  name: string;
  ccName: string;
  ccNumber: string;
  ccPoints: number;
  prPoints: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, replace with proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true)
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      })
    }
  }

  const [participants, setParticipants] = useState<Record<string, ParticipantData>>({});
  const [formData, setFormData] = useState<ParticipantData>({
    name: '',
    ccName: '',
    ccNumber: '',
    ccPoints: 0,
    prPoints: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      const rsvpsRef = ref(database, 'rsvps');
      const unsubscribe = onValue(rsvpsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) setParticipants(data);
      });
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = editingId || formData.ccNumber.replace(/\s/g, '');
      await set(ref(database, `rsvps/${id}`), formData);
      setFormData({
        name: '',
        ccName: '',
        ccNumber: '',
        ccPoints: 0,
        prPoints: 0
      });
      setEditingId(null);
      toast({
        title: "Success",
        description: "Entry updated successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update entry",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(ref(database, `rsvps/${id}`));
      toast({
        title: "Success",
        description: "Entry deleted successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setFormData(participants[id]);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: '',
      ccName: '',
      ccNumber: '',
      ccPoints: 0,
      prPoints: 0
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="w-[350px] bg-gray-900 text-white border-gray-800">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="destructive" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        <div className="space-y-8">
          {/* Entry Form */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit' : 'Add'} Leaderboard Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Participant Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                />
                <Input
                  placeholder="CC Name"
                  value={formData.ccName}
                  onChange={(e) => setFormData(prev => ({ ...prev, ccName: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                />
                <Input
                  placeholder="CC Number"
                  value={formData.ccNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, ccNumber: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                />
                <Input
                  type="number"
                  placeholder="CC Points"
                  value={formData.ccPoints}
                  onChange={(e) => setFormData(prev => ({ ...prev, ccPoints: Number(e.target.value) }))}
                  className="bg-gray-800 border-gray-700"
                />
                <Input
                  type="number"
                  placeholder="PR Points"
                  value={formData.prPoints}
                  onChange={(e) => setFormData(prev => ({ ...prev, prPoints: Number(e.target.value) }))}
                  className="bg-gray-800 border-gray-700"
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingId ? 'Update' : 'Save'} Entry
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Entries Table */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Leaderboard Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>CC Name</TableHead>
                      <TableHead>CC Number</TableHead>
                      <TableHead>CC Points</TableHead>
                      <TableHead>PR Points</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(participants).map(([id, participant]) => (
                      <TableRow key={id}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.ccName}</TableCell>
                        <TableCell>{participant.ccNumber}</TableCell>
                        <TableCell>{participant.ccPoints}</TableCell>
                        <TableCell>{participant.prPoints}</TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}