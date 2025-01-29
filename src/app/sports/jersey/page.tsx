// "use client"
// import React, { useState, useEffect } from 'react';
// // import { Jersey } from '@/components/Jersey'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { database } from '@/firebaseConfig';
// import { getStorage } from 'firebase/storage';
// const storage = getStorage();
// import { ref, set, onValue } from "firebase/database";
// import Image from 'next/image';
// import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import JerseyGalleryModal from '@/components/jerseymodalgallery';
// // import JerseyFront from '@public/olympus/jersey/front.webp';
// // import JerseyBack from '@public/olympus/jersey/back.webp';

// interface FormData {
//   name: string;
//   jerseyText: string;
//   email: string;
//   prn: string;
//   number: string;
//   size: string;
//   year: string;
//   department: string;
//   transactionId: string;
//   paymentScreenshot: string;
// }

// // Remove this unused interface since we're not using it anymore

// interface FirebaseError extends Error {
//   code?: string;
// }

// export default function JerseyRegistration() {
//   // Add new state for tracking link clicks
//   const [clickedLinks, setClickedLinks] = useState({
//     pratishtha: false,
//     sportsClub: false,
//     youtube: false
//   });

//   const [isClient, setIsClient] = useState(false);
//   const [selectedSize] = useState<string>('medium');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [errors, setErrors] = useState({
//     email: '',
//     prn: ''
//   });
//   const [prnWarning, setPrnWarning] = useState('');
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     jerseyText: '',
//     email: '',
//     prn: '',
//     number: '',
//     size: 'medium',
//     year: '',
//     department: '',
//     transactionId: '',
//     paymentScreenshot: ''
//   });

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     // Fetch existing jersey numbers and PRNs
//     const jerseysRef = ref(database, 'jerseys');
//     onValue(jerseysRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         // const numbers = Object.values(data as Record<string, JerseyData>).map((jersey: JerseyData) => jersey.number); // Remove this line
//       }
//     });
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { id, value } = e.target;

//     if (id === 'prn') {
//       // Check if PRN exists
//       const jerseysRef = ref(database, `jerseys/${value}`);
//       onValue(jerseysRef, (snapshot) => {
//         if (snapshot.exists()) {
//           setPrnWarning('A registration with this PRN already exists. Submitting will update the existing registration.');
//         } else {
//           setPrnWarning('');
//         }
//       });

//       // Modified year detection logic
//       let year = '';
//       if (value.toUpperCase().startsWith('PRN') || /^PRN\d+$/.test(value)) {
//         year = 'First Year';
//       } else {
//         const firstTwoDigits = value.substring(0, 2);
//         switch (firstTwoDigits) {
//           case '21':
//             year = 'Fourth Year';
//             break;
//           case '22':
//             year = 'Third Year';
//             break;
//           case '23':
//             year = 'Second Year';
//             break;
//           default:
//             year = 'First Year';
//         }
//       }
      
//       // Add department detection
//       const detectedDepartment = getDepartmentFromPRN(value);
      
//       setFormData(prev => ({ 
//         ...prev, 
//         [id]: value,
//         year: year,
//         department: detectedDepartment // Automatically set department
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [id]: value }));
//     }
    
//     // Clear errors when user types
//     if (id === 'email') {
//       setErrors(prev => ({ ...prev, email: '' }));
//     }
//     if (id === 'prn') {
//       setErrors(prev => ({ ...prev, prn: '' }));
//     }
//   };

//   const validateEmail = (email: string) => {
//     return email.endsWith('@sakec.ac.in');
//   };

//   const validatePRN = (prn: string) => {
//     return /^[a-zA-Z0-9]{14}$/.test(prn);
//   };

//   const getDepartmentFromPRN = (prn: string) => {
//     const departmentCode = prn.substring(4, 6); // Get department code from PRN
//     switch (departmentCode) {
//       case 'CO':
//         return "Computer Engineering";
//       case 'IT':
//         return "Information Technology";
//       case 'EC':
//         return "Electronics & Computer Science";
//       case 'CS':
//         return "Cyber Security";
//       case 'ET':
//         return "Electronics and Telecommunication";
//       case 'AI':
//         return "Artificial Intelligence and Data Science";
//       case 'AC':
//         return "Advance Communication and Technology";
//       case 'VL':
//         return "Very Large Scale Integration";
//       default:
//         return "";
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const handlePaste = async (e: React.ClipboardEvent) => {
//     const items = e.clipboardData?.items;
    
//     for (let i = 0; i < items.length; i++) {
//       if (items[i].type.indexOf('image') !== -1) {
//         const file = items[i].getAsFile();
//         if (file) {
//           setSelectedFile(file);
//         }
//         break;
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate email, PRN, and department
//     let hasErrors = false;
//     if (!validateEmail(formData.email)) {
//       setErrors(prev => ({ ...prev, email: 'Email must be a valid SAKEC email (@sakec.ac.in)' }));
//       hasErrors = true;
//     }
//     if (!validatePRN(formData.prn)) {
//       setErrors(prev => ({ ...prev, prn: 'PRN must be exactly 14 characters (letters or numbers)' }));
//       hasErrors = true;
//     }
//     if (!formData.department) {
//       alert('Please select your department');
//       hasErrors = true;
//     }

//     if (hasErrors) {
//       return;
//     }

//     if (prnWarning && !confirm('A registration with this PRN already exists. Do you want to update it?')) {
//       return;
//     }

//     try {
//       let paymentScreenshotUrl = '';
      
//       if (selectedFile) {
//         const fileRef = storageRef(storage, `payment-screenshots/${formData.prn}-${Date.now()}`);
//         try {
//           const snapshot = await uploadBytes(fileRef, selectedFile);
//           paymentScreenshotUrl = await getDownloadURL(snapshot.ref);
//         } catch (uploadError: unknown) {
//           console.error('Error uploading file:', uploadError);
//           alert('Error uploading payment screenshot. Please try again.');
//           return;
//         }
//       }

//       const newJerseyRef = ref(database, 'jerseys/' + formData.prn);
//       try {
//         await set(newJerseyRef, {
//           ...formData,
//           paymentScreenshot: paymentScreenshotUrl,
//           timestamp: Date.now()
//         });
//         alert('Jersey registered successfully!');
//         // Reset form
//         setFormData({
//           name: '',
//           jerseyText: '',
//           email: '',
//           prn: '',
//           number: '',
//           size: 'medium',
//           year: '',
//           department: '',
//           transactionId: '',
//           paymentScreenshot: ''
//         });
//         setSelectedFile(null);
//       } catch (dbError: unknown) {
//         console.error('Database error:', dbError);
//         if (
//           dbError instanceof Error && 
//           (dbError as FirebaseError).code === 'PERMISSION_DENIED'
//         ) {
//           alert('Unable to register jersey. Please check if you have already registered or contact the administrator.');
//         } else {
//           alert('Error saving registration. Please try again later.');
//         }
//       }
//     } catch (error: unknown) {
//       console.error('General error:', error);
//       alert('An unexpected error occurred. Please try again later.');
//     }
//   };

//   // Add function to handle link clicks
//   const handleLinkClick = (linkName: 'pratishtha' | 'sportsClub' | 'youtube') => {
//     setClickedLinks(prev => ({
//       ...prev,
//       [linkName]: true
//     }));
//   };

//   // Add function to check if all links are clicked
//   const allLinksClicked = () => {
//     return Object.values(clickedLinks).every(clicked => clicked);
//   };

//   const departments = [
//     "Computer Engineering",
//     "Information Technology",
//     "Electronics & Computer Science",
//     "Cyber Security",
//     "Electronics and Telecommunication",
//     "Artificial Intelligence and Data Science",
//     "Advance Communication and Technology",
//     "Very Large Scale Integration",
//     "B.VOC AIDS",
//     "B.VOC CYSE",
//   ];

//   if (!isClient) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
//         <div className="animate-pulse">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col lg:flex-row pt-24"> {/* Added pt-24 here */}
//       {/* Jersey Mockups Section */}
//       <div className="w-full lg:w-[40%] p-4 md:p-8 flex flex-col justify-start items-center bg-black/30 backdrop-blur-sm">
//         <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Jersey Mockups</h2>
//         <div className="space-y-8 md:space-y-12 w-full max-w-md transition-all hover:scale-105 duration-300">
//           <div className="relative w-full h-48 md:h-64">
//             <Image src="/olympus/jersey/back.webp" alt="Jersey Front" layout="fill" objectFit="contain" />
//           </div>
//           <div className="relative w-full h-48 md:h-64">
//             <Image src="/olympus/jersey/front.webp" alt="Jersey Back" layout="fill" objectFit="contain" />
//           </div>
//         </div>
//         <JerseyGalleryModal />
//       </div>

//       {/* Registration Form Section */}
//       <div className="w-full lg:w-[60%] p-4 md:p-6 overflow-y-auto backdrop-blur-sm">
//         <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-4xl py-4 md:py-8">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//             Jersey Registration
//           </h1>
          
//           <form className="space-y-6 md:space-y-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-8 shadow-2xl border border-white/20" onSubmit={handleSubmit}>
//             {/* Personal Details Section */}
//             <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-black/30 rounded-xl">
//               <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-gray-200">Personal Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-lg md:text-xl font-medium">Full Name *</Label>
//                   <Input 
//                     id="name" 
//                     placeholder="Enter your full name" 
//                     className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all" 
//                     onChange={handleChange}
//                     required 
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="jerseyText" className="text-lg md:text-xl font-medium">Text on Jersey *</Label>
//                   <Input 
//                     id="jerseyText" 
//                     placeholder="Enter the text to be put on the jersey" 
//                     className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all" 
//                     onChange={handleChange}
//                     required 
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-lg md:text-xl font-medium">Email *</Label>
//                   <Input 
//                     id="email" 
//                     type="email" 
//                     placeholder="Enter your SAKEC email" 
//                     className={`bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all ${
//                       errors.email ? 'border-red-500' : ''
//                     }`}
//                     onChange={handleChange}
//                     value={formData.email}
//                     required
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="prn" className="text-lg md:text-xl font-medium">PRN *</Label>
//                   <Input 
//                     id="prn" 
//                     placeholder="Enter your 14-character PRN" 
//                     className={`bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all ${
//                       errors.prn ? 'border-red-500' : ''
//                     }`}
//                     onChange={handleChange}
//                     value={formData.prn}
//                     required
//                   />
//                   <p className="text-gray-400 text-sm">FEs write PRN first and then enter your 11 digit number</p>
//                   {errors.prn && (
//                     <p className="text-red-500 text-sm mt-1">{errors.prn}</p>
//                   )}
//                   {prnWarning && (
//                     <p className="text-yellow-500 text-sm mt-1">{prnWarning}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="number" className="text-lg md:text-xl font-medium">Jersey Number *</Label>
//                   <Input 
//                     id="number" 
//                     type="number" 
//                     placeholder="Choose your jersey number (0-999)"
//                     min="0"
//                     max="999"
//                     className={`w-full text-lg md:text-xl h-10 md:h-12 bg-black/50 text-white border-gray-700 focus:ring-2 focus:ring-white/50 transition-all`}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="department" className="text-lg md:text-xl font-medium">Department *</Label>
//                   <Select 
//                     onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
//                     value={formData.department}
//                     required
//                   >
//                     <SelectTrigger className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all">
//                       <SelectValue placeholder="Select your department" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-900 text-white border-gray-700">
//                       {departments.map((dept) => (
//                         <SelectItem 
//                           key={dept} 
//                           value={dept}
//                           className="focus:bg-gray-800 focus:text-white hover:bg-gray-700"
//                         >
//                           {dept}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>

//             {/* Size Selection Section */}
//             <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-black/30 rounded-xl">
//               <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-gray-200">Jersey Size</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//                 <RadioGroup defaultValue={selectedSize} onValueChange={(value) => setFormData({ ...formData, size: value })}>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="X-small" id="X-small" />
//                     <Label htmlFor="X-small">Xtra Small</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="small" id="small" />
//                     <Label htmlFor="small">Small</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="medium" id="medium" />
//                     <Label htmlFor="medium">Medium</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="large" id="large" />
//                     <Label htmlFor="large">Large</Label>
//                   </div>
//                   <div className="flex items-center space-x-2 ">
//                     <RadioGroupItem value="xl" id="xl" />
//                     <Label htmlFor="xl">XL</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="xxl" id="xxl" />
//                     <Label htmlFor="xxl">XXL</Label>
//                   </div>
//                 </RadioGroup>
//                 <table className="table-auto border-collapse border border-gray-700 text-white w-full text-sm md:text-lg">
//                 <thead>
//   <tr>
//     <th className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">Size</th>
//     <th className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">Chest (inches)</th>
//     <th className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">Length (inches)</th>
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">XS</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">36</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">29</td>
//   </tr>
//   <tr>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">S</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">38</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">30</td>
//   </tr>
//   <tr>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">M</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">40</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">31</td>
//   </tr>
//   <tr>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">L</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">42</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">32</td>
//   </tr>
//   <tr>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">XL</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">44</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">33</td>
//   </tr>
//   <tr>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">XXL</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">46</td>
//     <td className="border border-gray-600 px-2 md:px-4 py-1 md:py-2">34</td>
//   </tr>
// </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Payment Section */}
//             <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-black/30 rounded-xl">
//               <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-gray-200">Payment Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                 <div className="space-y-4">
//                   <div className="bg-white/10 p-4 md:p-6 rounded-xl backdrop-blur-md border border-white/20 transition-all hover:scale-105 duration-300">
//                     <Image
//                       src="/payment/qr-code.webp"
//                       alt="Payment QR Code"
//                       width={200}
//                       height={200}
//                       className="mx-auto transform scale-110 md:scale-124"
//                     />
//                   </div>
//                   <p className="text-center text-gray-400">Scan QR code to pay ₹350</p>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="transactionId" className="text-lg md:text-xl font-medium">Transaction ID *</Label>
//                     <Input
//                       id="transactionId"
//                       placeholder="Enter UPI transaction ID"
//                       className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all"
//                       value={formData.transactionId}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="paymentScreenshot" className="text-lg md:text-xl font-medium">Payment Screenshot *</Label>
//                     <div 
//                       className="relative border-2 border-dashed border-gray-700 rounded-lg p-4"
//                       onPaste={handlePaste}
//                     >
//                       <Input
//                         id="paymentScreenshot"
//                         type="file"   
//                         accept="image/*"
//                         className="bg-black/50 text-white border-gray-700 text-lg md:text-xl h-10 md:h-12 focus:ring-2 focus:ring-white/50 transition-all"
//                         onChange={handleFileChange}
//                         required
//                       />
//                       <p className="text-gray-400 text-sm mt-2">
//                         You can also paste (Ctrl+V) a screenshot directly here
//                       </p>
//                       {selectedFile && (
//                         <p className="text-green-500 text-sm mt-1">
//                           File selected: {selectedFile.name}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Media Links */}
//             <div className="grid grid-cols-3 gap-4 mb-4">
//               <a 
//                 href="https://www.instagram.com/pratishtha_sakecfest/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`bg-gradient-to-r ${
//                   clickedLinks.pratishtha 
//                     ? 'from-green-600 to-green-700' 
//                     : 'from-purple-600 to-pink-600'
//                 } text-white py-2 px-4 rounded-lg text-center text-sm md:text-base hover:opacity-90 transition-all`}
//                 onClick={() => handleLinkClick('pratishtha')}
//               >
//                 {clickedLinks.pratishtha ? '✓ Pratishtha' : 'Pratishtha'}
//               </a>
//               <a 
//                 href="https://www.instagram.com/sakec_sportsclub/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`bg-gradient-to-r ${
//                   clickedLinks.sportsClub 
//                     ? 'from-green-600 to-green-700' 
//                     : 'from-pink-500 to-orange-500'
//                 } text-white py-2 px-4 rounded-lg text-center text-sm md:text-base hover:opacity-90 transition-all`}
//                 onClick={() => handleLinkClick('sportsClub')}
//               >
//                 {clickedLinks.sportsClub ? '✓ Sports Club Instagram' : 'Sports Club Instagram'}
//               </a>
//               <a 
//                 href="https://youtu.be/TaQE5t2KQHM?si=0VcZiaJ_dDl78VN7"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`bg-gradient-to-r ${
//                   clickedLinks.youtube 
//                     ? 'from-green-600 to-green-700' 
//                     : 'from-red-600 to-red-700'
//                 } text-white py-2 px-4 rounded-lg text-center text-sm md:text-base hover:opacity-90 transition-all`}
//                 onClick={() => handleLinkClick('youtube')}
//               >
//                 {clickedLinks.youtube ? '✓ Pratishtha YouTube' : 'Pratishtha YouTube'}
//               </a>
//             </div>

//             {!allLinksClicked() && (
//               <p className="text-yellow-500 text-center mb-4">
//                 Please visit all three links above before registering
//               </p>
//             )}

//              <Button 
//               type="submit" 
//               disabled={!allLinksClicked()}
//               className={`w-full bg-gradient-to-r ${
//                 allLinksClicked()
//                   ? 'from-white to-gray-300 text-black hover:from-gray-100 hover:to-gray-200'
//                   : 'from-gray-600 to-gray-700 text-gray-300 cursor-not-allowed'
//               } text-base md:text-lg py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 ${
//                 allLinksClicked() ? 'hover:scale-[1.02]' : ''
//               }`}
//             >
//               Register Jersey
//             </Button> 
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }