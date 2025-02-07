// src/app/not-found.tsx
import React from 'react'
import { Button } from '@/components/ui/button' 
import Link from 'next/link'

function Error404() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className='w-full bg-[url("/heropic.png")] bg-cover bg-no-repeat bg-center py-12 md:py-20 lg:py-24'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center mb-4'>
              404
            </h1>
            <div className='text-sm md:text-base lg:text-lg flex gap-2 text-center justify-center'>
              <Link href="/" className='text-white hover:text-[#FF9F0D] transition-colors duration-300'>
                Home
              </Link>
              <span className='text-white'>/</span>
              <Link href="/404Error" className='text-[#FF9F0D]'>
                404
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="flex-1 bg-white px-4 md:px-8 py-12 md:py-20 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Message */}
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#FF9F0D] mb-4 md:mb-6">
            404
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
            Oops! Looks like something went wrong
          </p>
          <p className="text-base md:text-lg mb-3 md:mb-4">
            Page cannot be found! We&apos;ll have it figured out in no time.
          </p>
          <p className="text-base md:text-lg mb-6 md:mb-8">
            Meanwhile, check out these fresh ideas:
          </p>
          
          {/* Button */}
          <Link href="/">
            <Button className="bg-[#FF9F0D] text-white text-base md:text-lg font-bold px-6 py-3 rounded hover:bg-[#e8890b] transition-colors duration-300">
              Go Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Error404





