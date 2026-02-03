"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Shield, Truck } from "lucide-react"
import { useState } from "react"

export default function Heropage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=2000&q=80"
          alt="Pharmacy background with medicines"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Your Trusted{" "}
          <span className="text-green-400">Online Pharmacy</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Buy authentic medicines and healthcare products with fast delivery
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="flex items-center bg-white rounded-full shadow-lg p-1">
              <Search className="ml-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for medicines, health products..."
                className="flex-1 bg-transparent border-none px-4 py-3 text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
              >
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Two Key Features */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-3 rounded-full">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-left">
              <p className="text-xl font-semibold text-white">100% Genuine</p>
              <p className="text-gray-300">Verified Medicines</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-3 rounded-full">
              <Truck className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-left">
              <p className="text-xl font-semibold text-white">Fast Delivery</p>
              <p className="text-gray-300">Same Day Service</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full"
          >
            Shop Medicines Now
          </Button>
        </div>
      </div>
    </section>
  )
}