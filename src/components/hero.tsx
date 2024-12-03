"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Background3D } from "./3d-background"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <Background3D />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            👋 Welcome to CL Meet
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-blue-400">Prathishtha.</span>{" "}
            <span className="text-green-400">Contingent Leaders.</span>{" "}
            <span className="text-yellow-400">Meet.</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Unite with fellow leaders to strategize, innovate, and elevate Prathistha. This exclusive meet-up is your platform to share ideas, collaborate, and drive the success of our college&apos;s biggest event.
          </p>
          <Button size="lg" className="rounded-full">
            RSVP Today
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
