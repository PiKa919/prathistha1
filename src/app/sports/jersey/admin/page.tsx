"use client"
import { useState, useEffect, useMemo } from 'react';
import { database } from '@/firebaseConfig';
import { ref, onValue, update } from "firebase/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface JerseyRegistration {
  name: string;
  jerseyText: string;
  email: string;
  prn: string;
  number: string;
  size: string;
  year: string;
  department: string;
  timestamp: number;
  jerseyReceived?: boolean;
  paymentVerified?: boolean;
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState<Record<string, JerseyRegistration>>({});
  const [filter, setFilter] = useState({ department: '', year: '', search: '' });

  const departments = [
    { value: 'COMPS', label: 'Computer Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'ECS', label: 'Electronics & Computer Science' },
    { value: 'CYSE', label: 'Cyber Security' },
  ];

  const years = [
    { value: 'FE', label: 'First Year' },
    { value: 'SE', label: 'Second Year' },
    { value: 'TE', label: 'Third Year' },
    { value: 'BE', label: 'Fourth Year' },
  ];

  const getYearFromPRN = (prn: string) => {
    const firstTwoDigits = prn.substring(0, 2);
    switch (firstTwoDigits) {
      case '21': return 'Fourth Year';
      case '22': return 'Third Year';
      case '23': return 'Second Year';
      case '24': return 'First Year';
      default: return '';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchData();
    } else {
      alert('Invalid password');
    }
  };

  const fetchData = () => {
    const jerseysRef = ref(database, 'jerseys');
    onValue(jerseysRef, (snapshot) => {
      const data = snapshot.val();
      setRegistrations(data || {});
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching data:", error);
      alert(`Error fetching data: ${error.message}`);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const filteredRegistrations = useMemo(() => {
    return Object.entries(registrations || {})
      .map(([key, registration]) => ({
        key,
        ...registration,
        actualYear: getYearFromPRN(registration.prn)
      }))
      .filter((registration) => (
        (!filter.department || registration.department === filter.department) &&
        (!filter.year || registration.actualYear === filter.year) &&
        (!filter.search || 
          registration.name?.toLowerCase().includes(filter.search.toLowerCase()) ||
          registration.prn?.toLowerCase().includes(filter.search.toLowerCase()))
      ))
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }, [registrations, filter]);

  const updateStatus = async (key: string, field: 'jerseyReceived' | 'paymentVerified', value: boolean) => {
    try {
      await update(ref(database, `jerseys/${key}`), {
        [field]: value
      });
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md p-8 bg-gray-900 rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Jersey Registrations</h1>
          <Button 
            onClick={() => {
              localStorage.removeItem('adminAuth');
              setIsAuthenticated(false);
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Search by name or PRN"
            value={filter.search}
            onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            className="bg-gray-800 border-gray-700"
          />
          <select
            value={filter.department}
            onChange={(e) => setFilter(prev => ({ ...prev, department: e.target.value }))}
            className="bg-gray-800 border-gray-700 rounded-md p-2"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept.value} value={dept.value}>{dept.label}</option>
            ))}
          </select>
          <select
            value={filter.year}
            onChange={(e) => setFilter(prev => ({ ...prev, year: e.target.value }))}
            className="bg-gray-800 border-gray-700 rounded-md p-2"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year.value} value={year.value}>{year.label}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No.</TableHead>
                <TableHead>PRN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Jersey Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Jersey Text</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Registration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((registration, index) => (
                <TableRow key={registration.key}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{registration.prn}</TableCell>
                  <TableCell>{registration.name}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => updateStatus(
                        registration.key,
                        'jerseyReceived',
                        !registration.jerseyReceived
                      )}
                      className={`px-3 py-1 text-sm ${
                        registration.jerseyReceived
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {registration.jerseyReceived ? 'Received' : 'Not Received'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => updateStatus(
                        registration.key,
                        'paymentVerified',
                        !registration.paymentVerified
                      )}
                      className={`px-3 py-1 text-sm ${
                        registration.paymentVerified
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {registration.paymentVerified ? 'Verified' : 'Not Verified'}
                    </Button>
                  </TableCell>
                  <TableCell>{registration.jerseyText}</TableCell>
                  <TableCell>{registration.number}</TableCell>
                  <TableCell>{registration.size}</TableCell>
                  <TableCell>{registration.department}</TableCell>
                  <TableCell>{registration.actualYear}</TableCell>
                  <TableCell>
                    {new Date(registration.timestamp).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-center text-gray-400">
          Total Registrations: {filteredRegistrations.length}
        </div>
      </div>
    </div>
  );
}