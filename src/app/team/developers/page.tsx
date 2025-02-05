"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion,  useMotionValue} from "framer-motion"
import { FiInstagram, FiLinkedin } from "react-icons/fi"
import PixelTransition from '@/components/PixelTransition';
interface TeamMember {
  id: number
  title: string
  subheading: string
  image: string
  about: string
  instagram: string
  linkedin: string
  location: string
}

const teamsData = {
  heads: [
    {
      id: 1,
      title: "Mr. Ankit Das",
      subheading: "Web & App Secretary",
      image: "/team/webapp/ankit.webp",
      about: "Leading web and app development.",
      instagram: "ankit",
      linkedin: "ankitdas",
      location: "Juhu Beach",
    },
    {
      id: 2,
      title: "Mr. Pradnesh Revadekar",
      subheading: "Web & App Coordinator",
      image: "/team/webapp/profile-2.webp",
      about: "Hakuna Matata",
      instagram: "pradnesh_2504",
      linkedin: "pradnesh-revadekar",
      location: "Lalbaug",
    },
  ],
  developers: [
    {
      id: 1,
      title: "Mr. Deep Adak",
      subheading: "Developer",
      image: "/team/developers/Deep.webp",
      about: "From concept to execution, I breathe life into ideas through programming.",
      instagram: "_deep_5317",
      linkedin: "deep-adak",
      location: "Home, RCF"
    },
    {
      id: 2,
      title: "Mr. Dilipkumar Teli",
      subheading: "Developer",
      image: "/team/developers/Dilip.webp",
      about: "Debugging by day, coding by night, crafting the future byte by byte.",
      instagram: "dilip_1124",
      linkedin: "dilipkumarteli",
      location: "Kala Ghoda"
    },
  ]
}

const HeadsSection = ({ data }: { data: TeamMember[] }) => (
  <div className="mb-16" id="heads">
    <h2 className="text-4xl font-bold text-white text-center mb-10">Web & App Heads</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {data.map((card) => (
        <TiltCard key={card.id} {...card} />
      ))}
    </div>
  </div>
)

const Section = ({ title, data }: { title: string; data: TeamMember[] }) => {
  const sectionId = title.toLowerCase().replace(/[& ]/g, "-")

  return (
    <div className="mb-16" id={sectionId}>
      <h2 className="text-4xl font-bold text-white text-center mb-10">{title}</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {data.map((card) => (
          <TiltCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}

const Example = () => {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden px-4 py-12 sm:py-24">
      {/* Sparks effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[200px] h-[200px] bg-white opacity-10 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-purple-700 opacity-20 rounded-full blur-3xl bottom-10 right-20 animate-pulse" />
        <div className="absolute w-[150px] h-[150px] bg-blue-500 opacity-20 rounded-full blur-3xl bottom-20 left-20 animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto pt-8 relative z-10">
        <HeadsSection data={teamsData.heads} />
        <Section title="Developers Team" data={teamsData.developers} />
      </div>
    </div>
  )
}

interface TiltCardProps {
  title: string
  subheading: string
  image: string
  about: string
  instagram: string
  linkedin: string
  location: string
}

// const ROTATION_RANGE = 32.5


const TiltCard = ({ title, subheading, image, about, instagram, linkedin, location }: TiltCardProps) => {
  const [isLoading, setIsLoading] = useState(true)
  // const [isFlipped, setIsFlipped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  // const ySpring = useSpring(y, { stiffness: 300, damping: 30 })

  // const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        x.set(0)
        y.set(0)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [x, y])

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if (!ref.current || isFlipped || window.innerWidth < 640) return

  //   const rect = ref.current.getBoundingClientRect()

  //   const width = rect.width
  //   const height = rect.height

  //   const mouseX = e.clientX - rect.left
  //   const mouseY = e.clientY - rect.top

  //   const rX = (mouseY / height - 0.5) * ROTATION_RANGE * -1
  //   const rY = (mouseX / width - 0.5) * ROTATION_RANGE

  //   x.set(rX)
  //   y.set(rY)
  // }

  // const handleMouseLeave = () => {
  //   if (!isFlipped) {
  //     x.set(0)
  //     y.set(0)
  //   }
  // }

  // const toggleFlip = () => {
  //   setIsFlipped(!isFlipped)
  //   x.set(0)
  //   y.set(0)
  // }

  return (
    <div
      className="relative h-[28rem] w-[20rem]"
      style={{ perspective: "1000px" }}
      ref={ref}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          // transform: isFlipped ? "rotateY(180deg)" : transform,
        }}
        animate={{
          // rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50,
          duration: 0.8,
        }}
        className="w-full h-full"
      >



        <PixelTransition
          firstContent={
            <motion.div
                      className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 shadow-lg overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        border: "4px solid",
                        borderImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1%, transparent 1%) 1",
                        borderImageSlice: "1",
                        backgroundClip: "border-box",
                        boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                      }}
                    >
                      {/* Small Dots Animation */}
                      {isLoading && (
                        <motion.div
                          className="absolute inset-0"
                          initial={{ opacity: 1, scale: 1 }}
                          animate={{
                            opacity: [1, 0.5, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                          }}
                          onAnimationComplete={() => setIsLoading(false)}
                          style={{
                            background: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
                            backgroundSize: "16px 16px",
                          }}
                        />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${image}')` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoading ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-end p-4 text-white"
                        style={{
                          background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
                        }}
                      >
                        <h2 className="text-xl sm:text-2xl font-bold truncate">{title}</h2>
                        <p className="text-xs sm:text-sm opacity-90 truncate">{subheading}</p>
                      </div>
                    </motion.div>
          }
          secondContent={
            <motion.div
              className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 shadow-lg"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
                border: "4px solid",
                borderImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1%, transparent 1%) 1",
                borderImageSlice: "1",
                backgroundClip: "border-box",
                boxShadow: "0 0 8px rgba(255,255,255,0.5)",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] [background-size:16px_16px]" />
              <div className="relative h-full p-4 flex flex-col">
                <div className="flex-1 rounded-md bg-white/10 backdrop-blur-md p-4 shadow-lg border border-white/20">
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">About</h3>
                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed backdrop-blur-sm bg-white/10 rounded-lg p-2 shadow-inner overflow-hidden">
                      {about}
                    </p>
                    <div className="mt-4">
                      <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md">♥ 🗺 in Mumbai</h3>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed backdrop-blur-sm bg-white/10 rounded-lg p-2 shadow-inner mt-2 overflow-hidden">
                        {location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <motion.a
                      href={`https://instagram.com/${instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity shadow-lg text-xs sm:text-sm"
                    >
                      <FiInstagram className="text-base sm:text-lg" />
                      Instagram
                    </motion.a>
                    <motion.a
                      href={`https://linkedin.com/in/${linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity shadow-lg text-xs sm:text-sm"
                    >
                      <FiLinkedin className="text-base sm:text-lg" />
                      LinkedIn
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          gridSize={12}
          pixelColor='#ffffff'
          animationStepDuration={0.4}
          className="custom-pixel-card"
        />
        {/* Front of card */}


        {/* Back of card */}

      </motion.div>
    </div>
  )
}

export default Example
