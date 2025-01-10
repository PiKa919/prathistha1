"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Leaderboard } from "@/components/leaderboard"
import { Modal } from "@/components/Modal"
import { Button } from "@/components/ui/button"
import { Slideshow } from "@/components/Slideshow"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <div className="flex justify-center pb-8">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="
            relative 
            px-8 
            py-4 
            text-2xl 
            font-bold 
            bg-transparent 
            border-2 
            border-sky-400 
            rounded-full 
            text-sky-400
            transition-all 
            duration-300
            hover:text-white
            hover:border-sky-500
            hover:bg-sky-400
            hover:shadow-[0_0_15px_rgba(56,189,248,0.5),0_0_30px_rgba(56,189,248,0.3)]
            active:scale-95
            before:content-['']
            before:absolute
            before:inset-0
            before:rounded-full
            before:bg-sky-400/20
            before:transition-all
            before:duration-300
            before:opacity-0
            hover:before:opacity-100
            group
          "
        >
          <span className="relative inline-flex items-center gap-2">
            ✨ Open Mumbai Locations Slideshow
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Slideshow />
      </Modal>
      <Stats />
      <Leaderboard />
    </main>
  )
}