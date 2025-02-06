"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Heart, Shuffle } from "lucide-react"

export default function SingerReveal() {
  const [progress] = useState(34)

  return (
    <div className="bg-[#c7443a] flex flex-col justify-end gap-3 rounded-[10px] w-[500px] h-[625px] relative overflow-hidden">
      <Image
        src="/assets/images/Singer.jpg"
        alt="Singer"
        width={900}
        height={1600}
        className="absolute top-0 left-0 w-full h-full object-cover "
      />
      <div className="relative z-10 p-8 bg-gradient-to-t from-[#c7443a] to-transparent">
        <h1 className="text-4xl font-bold text-white">Ananya Sharma</h1>
        <p className="text-sm text-white mt-1">Pratistha `25</p>
        <div className="flex items-center justify-start w-full gap-3 mt-4">
          <div className="relative flex-1 h-2 bg-white rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-gray-400 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-gray-300 rounded-full -top-1"
              style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
            ></div>
          </div>
          <Play className="text-white w-8 h-8 flex-shrink-0" />
        </div>
        <p className="text-sm text-white mt-2">1:36 / 4:45</p>
        <div className="flex w-full justify-start gap-4 mt-6">
          <div className="bg-white/30 text-white p-3 rounded-full">
            <Heart size={24} />
          </div>
          <div className="bg-white/30 text-white p-3 rounded-full">
            <Shuffle size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

