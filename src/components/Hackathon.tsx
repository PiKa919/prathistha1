'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from 'next/image'

const images = [
  "/placeholder.svg?height=400&width=600&text=Vega+Hackathon+1",
  "/placeholder.svg?height=400&width=600&text=Vega+Hackathon+2",
  "/placeholder.svg?height=400&width=600&text=Vega+Hackathon+3",
]

export function Hackathon() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white"
    >
      <motion.h2 
        className="text-4xl font-bold mb-4 text-center"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        Vega Hackathon
      </motion.h2>
      <motion.p 
        className="mb-6 text-center text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Join our exciting 24-hour hackathon and showcase your skills! 
        Solve real-world problems, win amazing prizes, and network with industry experts.
      </motion.p>
      <div className="relative w-full h-64 md:h-96 mb-6 overflow-hidden rounded-lg">
        {images.map((src, index) => (
          <motion.div
            key={src}
            className="absolute w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={src}
              alt={`Vega Hackathon Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="flex justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg py-2 px-6">
          Register for Vega Hackathon
        </Button>
      </motion.div>
    </motion.div>
  )
}

