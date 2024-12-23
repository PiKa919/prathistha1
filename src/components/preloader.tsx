'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GradualSpacing from './ui/gradual-spacing'
import { Merienda } from 'next/font/google'

const merienda = Merienda({ 
  subsets: ['latin'],
  weight: ['900'] // Using bold weight
})

const words = ['Get', 'Ready', 'for']
const finalText = 'Prathistha 2025'

export default function Preloader() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showFinal, setShowFinal] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex === words.length - 1) {
          clearInterval(interval)
          setShowFinal(true)
          return prevIndex
        }
        return prevIndex + 1
      })
    }, 750)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <AnimatePresence mode="wait">
              {!showFinal ? (
                <motion.div
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <GradualSpacing
                    text={words[currentWordIndex]}
                    className="text-4xl font-bold text-white"
                    duration={0.3}
                    delayMultiple={0.03}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className={`${merienda.className} text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-text-shine`}>
                    {finalText}
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
