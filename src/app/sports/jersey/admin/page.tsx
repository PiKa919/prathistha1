"use client"
import { useState, useEffect, useMemo } from 'react';
import { database } from '@/firebaseConfig';
import { ref, onValue, update, remove } from "firebase/database";
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
import ImageModal from '@/components/ImageModal';
import * as XLSX from 'xlsx';

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
  paymentScreenshot: string;
  transactionId: string;
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [registrations, setRegistrations] = useState<Record<string, JerseyRegistration>>({});
  const [filter, setFilter] = useState({ department: '', year: '', search: '' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editedData, setEditedData] = useState<Record<string, Partial<JerseyRegistration>>>({});

  const departments = [
    "Computer Engineering",
    "Information Technology",
    "Electronics & Computer Science",
    "Cyber Security",
    "Electronics and Telecommunication",
    "Artificial Intelligence and Data Science",
    "Advance Communication and Technology",
    "Very Large Scale Integration",
    "B.VOC AIDS",
    "B.VOC CYSE",
  ];

  const years = [
    { value: 'FE', label: 'First Year' },
    { value: 'SE', label: 'Second Year' },
    { value: 'TE', label: 'Third Year' },
    { value: 'BE', label: 'Fourth Year' },
  ];

  const getYearFromPRN = (prn: string) => {
    if (prn.toUpperCase().startsWith('PRN')) {
      return 'First Year';
    }
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
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'OLYMPUS9965';
    const now = Date.now();

    if (lockoutUntil && now < lockoutUntil) {
      alert(`Too many failed attempts. Please try again later.`);
      return;
    }
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      fetchData();
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        const lockoutTime = now + (15 * 60 * 1000); // 15 minutes lockout
        setLockoutUntil(lockoutTime);
        alert('Too many failed attempts. Please try again in 15 minutes.');
      } else {
        alert(`Invalid password. ${5 - newAttempts} attempts remaining.`);
      }
    }
  };

  const fetchData = () => {
    const jerseysRef = ref(database, 'jerseys');
    onValue(jerseysRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const sortedData = Object.entries(data)
          .sort(([, a], [, b]) => (b as JerseyRegistration).timestamp - (a as JerseyRegistration).timestamp)
          .reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value
          }), {});
        setRegistrations(sortedData);
      } else {
        setRegistrations({});
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching data:", error);
      alert(`Error fetching data: ${error.message}`);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const filteredRegistrations = useMemo(() => {
    return Object.entries(registrations)
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
      ));
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

  const handleEditChange = (key: string, field: keyof JerseyRegistration, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const saveChanges = async (key: string) => {
    try {
      await update(ref(database, `jerseys/${key}`), editedData[key]);
      setEditMode(prev => ({ ...prev, [key]: false }));
      setEditedData(prev => ({ ...prev, [key]: {} }));
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes');
    }
  };

  const deleteRegistration = async (key: string) => {
    try {
      await remove(ref(database, `jerseys/${key}`));
      setRegistrations(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Failed to delete registration');
    }
  };

  const exportToExcel = () => {
    const dataToExport = filteredRegistrations.map((registration, index) => ({
      'Sr. No.': index + 1,
      'PRN': registration.prn,
      'Name': registration.name,
      'Jersey Text': registration.jerseyText,
      'Number': registration.number,
      'Size': registration.size,
      'Department': registration.department,
      'Year': registration.actualYear,
      'Jersey Status': registration.jerseyReceived ? 'Received' : 'Not Received',
      'Payment Status': registration.paymentVerified ? 'Verified' : 'Not Verified',
      'Transaction ID': registration.transactionId,
      'Payment Screenshot URL': registration.paymentScreenshot || 'No screenshot',
      'Registration Date': new Date(registration.timestamp).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Adjust column width for the URL column
    const urlColumnIndex = Object.keys(dataToExport[0]).indexOf('Payment Screenshot URL');
    if (!ws['!cols']) ws['!cols'] = [];
    ws['!cols'][urlColumnIndex] = { width: 50 }; // Make URL column wider

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Jersey Registrations');
    
    const date = new Date().toISOString().split('T')[0];
    const fileName = `jersey_registrations_${date}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
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
          <Button 
            type="submit" 
            className="w-full"
            disabled={lockoutUntil !== null && Date.now() < lockoutUntil}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-20">
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          transactionId={registrations[Object.keys(registrations).find(key => 
            registrations[key].paymentScreenshot === selectedImage
          ) || '']?.transactionId}
        />
      )}
      
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Jersey Registrations</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              Total Registrations: {filteredRegistrations.length}
            </div>
            <Button 
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700"
            >
              Export to Excel
            </Button>
            <Button 
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
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
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={filter.year}
            onChange={(e) => setFilter(prev => ({ ...prev, year: e.target.value }))}
            className="bg-gray-800 border-gray-700 rounded-md p-2"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year.value} value={year.label}>{year.label}</option>
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
                <TableHead>Payment Screenshot</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((registration, index) => (
                <TableRow 
                  key={`${registration.key}-${registration.timestamp}`}
                  className={index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/50'}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {editMode[registration.key] ? (
                      <Input
                        value={editedData[registration.key]?.prn || registration.prn}
                        onChange={(e) => handleEditChange(registration.key, 'prn', e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                    ) : (
                      registration.prn
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[registration.key] ? (
                      <Input
                        value={editedData[registration.key]?.name || registration.name}
                        onChange={(e) => handleEditChange(registration.key, 'name', e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                    ) : (
                      registration.name
                    )}
                  </TableCell>
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
                  <TableCell>
                    {editMode[registration.key] ? (
                      <Input
                        value={editedData[registration.key]?.jerseyText || registration.jerseyText}
                        onChange={(e) => handleEditChange(registration.key, 'jerseyText', e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                    ) : (
                      registration.jerseyText
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[registration.key] ? (
                      <Input
                        value={editedData[registration.key]?.number || registration.number}
                        onChange={(e) => handleEditChange(registration.key, 'number', e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                    ) : (
                      registration.number
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[registration.key] ? (
                      <Input
                        value={editedData[registration.key]?.size || registration.size}
                        onChange={(e) => handleEditChange(registration.key, 'size', e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                    ) : (
                      registration.size
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[registration.key] ? (
                      <Input
                        value={editedData[registration.key]?.department || registration.department}
                        onChange={(e) => handleEditChange(registration.key, 'department', e.target.value)}
                        className="bg-gray-800 border-gray-700"
                      />
                    ) : (
                      registration.department
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[registration.key] ? (
                      <select
                        value={editedData[registration.key]?.year || registration.year}
                        onChange={(e) =>
                          handleEditChange(registration.key, 'year', e.target.value)
                        }
                        className="bg-gray-800 border-gray-700 rounded-md p-2"
                      >
                        {years.map((year) => (
                          <option key={year.value} value={year.label}>
                            {year.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      registration.year
                    )}
                  </TableCell>
                  {/* <TableCell>{registration.actualYear}</TableCell> */}
                  <TableCell>
                    {registration.paymentScreenshot ? (
                      <Button
                        onClick={() => setSelectedImage(registration.paymentScreenshot)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        View Screenshot
                      </Button>
                    ) : (
                      <span className="text-gray-500">No screenshot</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(registration.timestamp).toLocaleDateString()} 
                    {new Date(registration.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    {editMode[registration.key] ? (
                      <Button
                        onClick={() => saveChanges(registration.key)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Save
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditMode(prev => ({ ...prev, [registration.key]: true }))}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteRegistration(registration.key)}
                          className="bg-red-600 hover:bg-red-700"
                        >
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
  );
}