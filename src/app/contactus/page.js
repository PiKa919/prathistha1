// "use client";

// import { useState } from 'react'
// import Link from "next/link"
// import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react"

// export default function Footer() {
//   const [email, setEmail] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle newsletter signup logic here
//     console.log('Signed up with:', email)
//     setEmail('')
//   }

//   return (
//     <footer className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           <div className="space-y-4">
//             <h3 className="text-2xl font-bold font-serif">College Fest 2024</h3>
//             <p className="text-sm text-gray-300">Experience the future of education and entertainment at our annual college festival.</p>
//             <div className="flex space-x-4">
//               <Link href="#" className="hover:text-purple-400 transition-colors duration-300">
//                 <Facebook className="h-6 w-6" />
//                 <span className="sr-only">Facebook</span>
//               </Link>
//               <Link href="#" className="hover:text-purple-400 transition-colors duration-300">
//                 <Twitter className="h-6 w-6" />
//                 <span className="sr-only">Twitter</span>
//               </Link>
//               <Link href="#" className="hover:text-purple-400 transition-colors duration-300">
//                 <Instagram className="h-6 w-6" />
//                 <span className="sr-only">Instagram</span>
//               </Link>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold font-serif">Quick Links</h3>
//             <ul className="space-y-2">
//               {['Home', 'Events', 'Schedule', 'Sponsors'].map((item) => (
//                 <li key={item}>
//                   <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
//                     <span className="mr-2 text-purple-400">›</span> {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold font-serif">Contact Us</h3>
//             <ul className="space-y-2">
//               <li className="flex items-center">
//                 <MapPin className="h-5 w-5 mr-2 text-purple-400" />
//                 <span>123 University Ave, Collegetown, ST 12345</span>
//               </li>
//               <li className="flex items-center">
//                 <Phone className="h-5 w-5 mr-2 text-purple-400" />
//                 <span>(123) 456-7890</span>
//               </li>
//               <li className="flex items-center">
//                 <Mail className="h-5 w-5 mr-2 text-purple-400" />
//                 <span>info@collegefest.edu</span>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold font-serif">Festival Map</h3>
//             <div className="relative overflow-hidden rounded-lg h-48 group">
//               <img
//                 src="/placeholder.svg?height=200&width=300"
//                 alt="College Fest Map"
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
//                 <button className="bg-white text-blue-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-100 transition-colors duration-300">
//                   View Full Map
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 pt-8 border-t border-purple-700">
//           <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//             <h3 className="text-xl font-semibold font-serif mb-4 text-center">Stay Updated</h3>
//             <div className="flex">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="flex-grow px-4 py-2 rounded-l-full bg-purple-800 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-r-full transition-colors duration-300"
//               >
//                 Subscribe
//               </button>
//             </div>
//           </form>
//         </div>
//         <div className="mt-8 text-center text-sm text-gray-400">
//           <p>&copy; 2024 College Fest. All rights reserved.</p>
//           <div className="mt-2 space-x-4">
//             <Link href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
//             <Link href="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

import React from 'react';

// const page = () => {
//     return (
//         <div className='page-content'>
//             <h1>
//                 Welcome to the SPORTSSSSSSSSSSSSS
//             </h1>
//         </div>
//     );
// }


export default function Sports() {
  return (
      <h1>Contact Page</h1>
  );
}