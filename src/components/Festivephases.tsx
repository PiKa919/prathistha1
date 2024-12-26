import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FestivalPhases = () => {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const phases = [
    {
      name: 'YUVA',
      description: 'A celebration of youth and vigor, YUVA kicks off our fest with high energy events and performances.',
      bgClass: 'from-indigo-500 to-purple-500',
      glowClass: 'shadow-indigo-500/50',
      imagePath: '/phases/yuva.webp',
      icon: '🌟'
    },
    {
      name: 'OLYMPUS',
      description: 'Channeling the spirit of ancient Greek games, OLYMPUS brings competitive sports and intellectual challenges.',
      bgClass: 'from-emerald-500 to-teal-500',
      glowClass: 'shadow-emerald-500/50',
      imagePath: '/phases/olympus.webp',
      icon: '🏆'
    },
    {
      name: 'AURUM',
      description: 'AURUM, our golden phase, showcases the pinnacle of talent and creativity across various disciplines.',
      bgClass: 'from-yellow-400 to-amber-500',
      glowClass: 'shadow-yellow-400/50',
      imagePath: '/phases/aurum.webp',
      icon: '✨'
    },
    {
      name: 'VERVE',
      description: 'The grand finale, VERVE, is a spectacular display of music, dance, and cultural extravaganza.',
      bgClass: 'from-rose-500 to-pink-500',
      glowClass: 'shadow-rose-500/50',
      imagePath: '/phases/verve.webp',
      icon: '🎭'
    }
  ];

  return (
    <div className="py-12 px-4 bg-black">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Festival Phases
      </h2>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.name}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${phase.bgClass} p-1 cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePhase(activePhase === index ? null : index)}
          >
            <div className="relative bg-gray-900 rounded-xl p-6 h-full">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">{phase.icon}</span>
                <h3 className="text-2xl font-bold text-white">{phase.name}</h3>
              </div>
              
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={phase.imagePath}
                  alt={`${phase.name} phase`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute inset-0 ${phase.bgClass} opacity-20`}></div>
              </div>

              <motion.div
                className="text-gray-300"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {phase.description}
              </motion.div>

              {activePhase === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-black/30 rounded-lg"
                >
                  <h4 className="text-lg font-semibold text-white mb-2">Highlights</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Special performances</li>
                    <li>Interactive workshops</li>
                    <li>Competitive events</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FestivalPhases;