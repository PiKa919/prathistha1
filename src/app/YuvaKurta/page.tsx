"use client"

import React, { useState, useEffect } from 'react';
// import { Jersey } from '@/components/Jersey'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { database } from '@/firebaseConfig';
import { ref, set, onValue } from "firebase/database";
import Image from 'next/image';

// Remove imports not needed anymore:
// import { getStorage } from 'firebase/storage';
// const storage = getStorage();
// import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import JerseyGalleryModal from '@/components/jerseymodalgallery';
// import JerseyFront from '@public/olympus/jersey/front.webp';
// import JerseyBack from '@public/olympus/jersey/back.webp';

interface FormData {
  name: string;
  email: string;
  prn: string;
  size: string;
  year: string;
  department: string;
  transactionId: string;
  paymentScreenshot: string;
  phoneNumber: string; // Added phone number
}

// Remove this unused interface since we're not using it anymore

export default function KurtaRegistration() {
  const [isClient, setIsClient] = useState(false);
  // Update default size
  const [selectedSize] = useState<string>('36');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    email: '',
    prn: ''
  });
  const [prnWarning, setPrnWarning] = useState('');
  // Update initial form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    prn: '',
    size: '36', // Changed from 'medium' to '36'
    year: '',
    department: '',
    transactionId: '',
    paymentScreenshot: '',
    phoneNumber: '', // Added phone number
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Fetch existing jersey numbers and PRNs
    const jerseysRef = ref(database, 'jerseys');
    onValue(jerseysRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // const numbers = Object.values(data as Record<string, JerseyData>).map((jersey: JerseyData) => jersey.number); // Remove this line
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === 'prn') {
      // Check if PRN exists
      const jerseysRef = ref(database, `jerseys/${value}`);
      onValue(jerseysRef, (snapshot) => {
        if (snapshot.exists()) {
          setPrnWarning('A registration with this PRN already exists. Submitting will update the existing registration.');
        } else {
          setPrnWarning('');
        }
      });

      // Modified year detection logic
      let year = '';
      if (value.toUpperCase().startsWith('PRN') || /^PRN\d+$/.test(value)) {
        year = 'First Year';
      } else {
        const firstTwoDigits = value.substring(0, 2);
        switch (firstTwoDigits) {
          case '21':
            year = 'Fourth Year';
            break;
          case '22':
            year = 'Third Year';
            break;
          case '23':
            year = 'Second Year';
            break;
          default:
            year = 'First Year';
        }
      }
      
      // Add department detection
      const detectedDepartment = getDepartmentFromPRN(value);
      
      setFormData(prev => ({ 
        ...prev, 
        [id]: value,
        year: year,
        department: detectedDepartment // Automatically set department
      }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
    
    // Clear errors when user types
    if (id === 'email') {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    if (id === 'prn') {
      setErrors(prev => ({ ...prev, prn: '' }));
    }
  };

  const getDepartmentFromPRN = (prn: string) => {
    const departmentCode = prn.substring(4, 6); // Get department code from PRN
    switch (departmentCode) {
      case 'CO':
        return "Computer Engineering";
      case 'IT':
        return "Information Technology";
      case 'EC':
        return "Electronics & Computer Science";
      case 'CS':
        return "Cyber Security";
      case 'ET':
        return "Electronics and Telecommunication";
      case 'AI':
        return "Artificial Intelligence and Data Science";
      case 'AC':
        return "Advance Communication and Technology";
      case 'VL':
        return "Very Large Scale Integration";
      default:
        return "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          setSelectedFile(file);
        }
        break;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validateEmail = (email: string) => {
      return email.endsWith('@sakec.ac.in');
    };

    const validatePRN = (prn: string) => {
      return /^[a-zA-Z0-9]{14}$/.test(prn);
    };

    // Validate all required fields
    if (!formData.name || !formData.email || !formData.prn || !formData.phoneNumber || !formData.transactionId) {
      alert('Please fill all required fields');
      return;
    }

    // Email and PRN validation
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Email must be a valid SAKEC email (@sakec.ac.in)' }));
      return;
    }
    
    if (!validatePRN(formData.prn)) {
      setErrors(prev => ({ ...prev, prn: 'PRN must be exactly 14 characters (letters or numbers)' }));
      return;
    }

    if (!selectedFile) {
      alert("Please select a payment screenshot");
      return;
    }

    try {
      const timestamp = Date.now();

      // Convert file to data URI (base64)
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        const paymentScreenshotDataUrl = reader.result; // Base64 encoded string

        // Save all data directly into Realtime Database
        const newKurtaRef = ref(database, `yuvaKurta/${formData.prn}`);
        await set(newKurtaRef, {
          ...formData,
          paymentScreenshot: paymentScreenshotDataUrl,
          timestamp: timestamp
        });

        alert("Registration successful!");
        setSelectedFile(null);
        // ...additional reset logic if needed...
      };
      reader.onerror = () => {
        console.error("Error reading the file");
        alert("Error processing file. Please try again.");
      };
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

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

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.15),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(255,255,0,0.15),transparent_25%)] text-white flex flex-col lg:flex-row pt-24">
      {/* Kurta Display Section */}
      <div className="w-full lg:w-[40%] p-4 md:p-8 flex flex-col justify-start items-center bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-3xl m-2">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
          Yuva Kurta Design
        </h2>
        <div className="space-y-8 md:space-y-12 w-full max-w-md transition-all hover:scale-105 duration-300">
          <div className="relative w-full h-48 md:h-64">
            <Image src="/kurta/front.webp" alt="Kurta Front" layout="fill" objectFit="contain" />
          </div>
          <div className="relative w-full h-48 md:h-64">
            <Image src="/kurta/back.webp" alt="Kurta Back" layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="w-full lg:w-[60%] p-4 md:p-6 overflow-y-auto">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-4xl py-4 md:py-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
            Yuva Kurta Registration
          </h1>
          
          <form className="space-y-6 md:space-y-8 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-cyan-500/5 backdrop-blur-md rounded-3xl p-4 md:p-8 shadow-2xl border border-white/10" onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl border border-white/5">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg md:text-xl font-medium">Full Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all" 
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg md:text-xl font-medium">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your SAKEC email" 
                    className={`bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prn" className="text-lg md:text-xl font-medium">PRN *</Label>
                  <Input 
                    id="prn" 
                    placeholder="Enter your 14-character PRN" 
                    className={`bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all ${
                      errors.prn ? 'border-red-500' : ''
                    }`}
                    onChange={handleChange}
                    value={formData.prn}
                    required
                  />
                  <p className="text-gray-400 text-sm">FEs write PRN first and then enter your 11 digit number</p>
                  {errors.prn && (
                    <p className="text-red-500 text-sm mt-1">{errors.prn}</p>
                  )}
                  {prnWarning && (
                    <p className="text-yellow-500 text-sm mt-1">{prnWarning}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number" className="text-lg md:text-xl font-medium">Jersey Number *</Label>
                  <Input 
                    id="number" 
                    type="number" 
                    placeholder="Choose your jersey number (0-999)"
                    min="0"
                    max="999"
                    className={`w-full text-lg md:text-xl h-10 md:h-12 bg-black/50 text-white border-gray-700 focus:ring-2 focus:ring-white/50 transition-all`}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-lg md:text-xl font-medium">Department *</Label>
                  <Select 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                    value={formData.department}
                    required
                  >
                    <SelectTrigger className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 text-white border-gray-700">
                      {departments.map((dept) => (
                        <SelectItem 
                          key={dept} 
                          value={dept}
                          className="focus:bg-gray-800 focus:text-white hover:bg-gray-700"
                        >
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Added Phone Number field */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-lg md:text-xl font-medium">Phone Number *</Label>
                  <Input 
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    pattern="[6-9]\d{9}"
                    className="bg-black/50 text-white border-gray-700"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Size Selection Section */}
            <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10 rounded-2xl border border-white/5">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Kurta Size
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <RadioGroup defaultValue={selectedSize} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="36" id="36" />
                    <Label htmlFor="36">Size 36 (S)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="38" id="38" />
                    <Label htmlFor="38">Size 38 (M)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="40" id="40" />
                    <Label htmlFor="40">Size 40 (L)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="42" id="42" />
                    <Label htmlFor="42">Size 42 (XL)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="44" id="44" />
                    <Label htmlFor="44">Size 44 (XXL)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="46" id="46" />
                    <Label htmlFor="46">Size 46 (XXXL)</Label>
                  </div>
                </RadioGroup>
                <table className="table-auto border-collapse border border-gray-700 text-white w-full text-sm md:text-lg">
                  <thead>
                    <tr>
                      <th className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">Size</th>
                      <th className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">Label</th>
                      <th className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">Chest (inches)</th>
                      <th className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">36</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">S</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">36</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">29</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">38</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">M</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">38</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">30</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">40</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">L</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">40</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">31</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">42</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">XL</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">42</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">32</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">44</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">XXL</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">44</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">33</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">46</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">XXXL</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">46</td>
                      <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">34</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/10 rounded-2xl border border-white/5">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 md:p-6 rounded-xl backdrop-blur-md border border-white/20 transition-all hover:scale-105 duration-300">
                    <Image
                      src="/payment/qr-code.webp"
                      alt="Payment QR Code"
                      width={200}
                      height={200}
                      className="mx-auto transform scale-110 md:scale-124"
                    />
                  </div>
                  <p className="text-center text-gray-400">Scan QR code to pay ₹150</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transactionId" className="text-lg md:text-xl font-medium">Transaction ID *</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter UPI transaction ID"
                      className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all"
                      value={formData.transactionId}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentScreenshot" className="text-lg md:text-xl font-medium">Payment Screenshot *</Label>
                    <div 
                      className="relative border-2 border-dashed border-gray-700 rounded-lg p-4"
                      onPaste={handlePaste}
                    >
                      <Input
                        id="paymentScreenshot"
                        type="file"   
                        accept="image/*"
                        className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all"
                        onChange={handleFileChange}
                        required
                      />
                      <p className="text-gray-400 text-sm mt-2">
                        You can also paste (Ctrl+V) a screenshot directly here
                      </p>
                      {selectedFile && (
                        <p className="text-green-500 text-sm mt-1">
                          File selected: {selectedFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Replace the conditional button with a simple submit button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white cursor-pointer text-base md:text-lg py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 animate-gradient-x border border-white/10 shadow-lg"
            >
              Register Now
            </Button>

          </form>
        </div>
      </div>
    </div>
  )
}

// Add these styles to your global CSS file
// filepath: /styles/globals.css
/*
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

.animate-gradient-x {
  background-size: 200% auto;
  animation: gradient 3s linear infinite;
}
*/