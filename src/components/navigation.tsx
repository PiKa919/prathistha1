"use client"

import dynamic from 'next/dynamic'
import Link from "next/link"
import { Suspense } from 'react'

const LoadingIcon = () => <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />

const Icons = {
  HomeIcon: dynamic(() => import('lucide-react').then(mod => mod.HomeIcon), {
    ssr: false,
    loading: LoadingIcon
  }),
  InfoIcon: dynamic(() => import('lucide-react').then(mod => mod.InfoIcon), {
    ssr: false,
    loading: LoadingIcon
  }),
  BookOpenIcon: dynamic(() => import('lucide-react').then(mod => mod.BookOpenIcon), {
    ssr: false,
    loading: LoadingIcon
  }),
  PhoneIcon: dynamic(() => import('lucide-react').then(mod => mod.PhoneIcon), {
    ssr: false,
    loading: LoadingIcon
  })
}

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container flex h-16 items-center">
        <div className="flex gap-6 mx-auto">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Icons.HomeIcon className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link href="/about" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Icons.InfoIcon className="h-4 w-4" />
            <span>About</span>
          </Link>
          <Link href="/events" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Icons.BookOpenIcon className="h-4 w-4" />
            <span>Events</span>
          </Link>
          <Link href="/contact" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Icons.PhoneIcon className="h-4 w-4" />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

