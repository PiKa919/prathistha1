"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: "/placeholder.svg?height=600&width=1600",
      alt: "Summer Sale",
      title: "Summer Sale",
      description: "Up to 50% off on selected items",
    },
    {
      image: "/placeholder.svg?height=600&width=1600",
      alt: "New Arrivals",
      title: "New Arrivals",
      description: "Check out our latest collection",
    },
    {
      image: "/placeholder.svg?height=600&width=1600",
      alt: "Free Shipping",
      title: "Free Shipping",
      description: "On orders over $50",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link className="text-2xl font-bold" href="#">
            YourStore
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input className="pl-8" placeholder="Search products" type="search" />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <section className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="relative">
                  <img
                    alt={slide.alt}
                    className="w-full h-[600px] object-cover"
                    height="600"
                    src={slide.image}
                    style={{
                      aspectRatio: "1600/600",
                      objectFit: "cover",
                    }}
                    width="1600"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
                      <p className="text-xl text-white mb-8">{slide.description}</p>
                      <Button size="lg">Shop Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
            onClick={prevSlide}
            size="icon"
            variant="secondary"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
            onClick={nextSlide}
            size="icon"
            variant="secondary"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </section>
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Electronics",
                "Fashion",
                "Home & Kitchen",
                "Books",
              ].map((category) => (
                <Card key={category}>
                  <CardContent className="p-4">
                    <img
                      alt={category}
                      className="w-full h-40 object-cover mb-4 rounded"
                      height="160"
                      src={`/placeholder.svg?height=160&width=320`}
                      style={{
                        aspectRatio: "320/160",
                        objectFit: "cover",
                      }}
                      width="320"
                    />
                    <h3 className="text-xl font-semibold mb-2">{category}</h3>
                    <Button variant="link">Shop now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Trending Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Product 1",
                "Product 2",
                "Product 3",
                "Product 4",
              ].map((product) => (
                <Card key={product}>
                  <CardContent className="p-4">
                    <img
                      alt={product}
                      className="w-full h-48 object-cover mb-4 rounded"
                      height="192"
                      src={`/placeholder.svg?height=192&width=256`}
                      style={{
                        aspectRatio: "256/192",
                        objectFit: "cover",
                      }}
                      width="256"
                    />
                    <h3 className="text-lg font-semibold mb-2">{product}</h3>
                    <p className="text-muted-foreground mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <Button>Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 YourStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}