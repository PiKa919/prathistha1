"use client"

import { motion } from "framer-motion"
import { FaUniversity, FaUsers, FaChalkboardTeacher, FaHashtag } from "react-icons/fa"

export function Stats() {
  const stats = [
    { number: "50+", label: "Participating Colleges", icon: <FaUniversity className="text-4xl" /> },
    { number: "150+", label: " Contingent Leaders", icon: <FaUsers className="text-4xl" /> },
    { number: "10+", label: "Interactive Workshops", icon: <FaChalkboardTeacher className="text-4xl" /> },
    { number: "500+", label: "Social Media Mentions", icon: <FaHashtag className="text-4xl" /> },
  ]

  return (
    <section className="py-12 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 text-primary">
                {stat.icon}
                <div className="text-4xl font-bold">{stat.number}</div>
              </div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

