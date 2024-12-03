"use client"

import { motion } from "framer-motion"

export function Stats() {
  const stats = [
    { number: "60+", label: "Competitions" },
    { number: "2000+", label: "Participants" },
    { number: "12+", label: "Countries" },
    { number: "14+", label: "Partners" },
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
              <div className="text-4xl font-bold text-primary">{stat.number}</div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

