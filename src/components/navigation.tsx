"use client"

import Link from "next/link"
import { HomeIcon, InfoIcon, BookOpenIcon, PhoneIcon } from 'lucide-react'

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container flex h-16 items-center">
        <div className="flex gap-6 mx-auto">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <HomeIcon className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link href="/about" className="flex items-center gap-2 hover:text-primary transition-colors">
            <InfoIcon className="h-4 w-4" />
            <span>About</span>
          </Link>
          <Link href="/events" className="flex items-center gap-2 hover:text-primary transition-colors">
            <BookOpenIcon className="h-4 w-4" />
            <span>Events</span>
          </Link>
          <Link href="/contact" className="flex items-center gap-2 hover:text-primary transition-colors">
            <PhoneIcon className="h-4 w-4" />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

