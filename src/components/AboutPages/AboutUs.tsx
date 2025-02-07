// src/components/Aboutus.tsx
import React from "react";
import { Great_Vibes } from "next/font/google";
import { Inter } from "next/font/google";
import { IoPlayOutline } from "react-icons/io5";
import Image from "next/image";
import { Button } from '@/components/ui/button';

const InterFont = Inter({ subsets: ["latin"] });
const VibeFont = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

export default function Aboutus() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* First Section: Content and Images */}
      <section className="body-font">
        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left side images */}
            <div className="lg:w-1/2 w-full flex flex-col sm:flex-row gap-6">
              {/* Large image */}
              <div className="w-full sm:w-1/2">
                <div className="relative h-[536px] w-full">
                  <Image
                    className="rounded-xl object-cover shadow-md"
                    alt="Tacos with vegetables"
                    src="/aboutus.png"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </div>
              </div>
              {/* Two smaller images */}
              <div className="w-full sm:w-1/2 flex flex-col gap-6">
                <div className="relative h-[271px] w-full">
                  <Image
                    className="rounded-xl object-cover shadow-md"
                    alt="Fried food with dipping sauce"
                    src="/about4.png"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="relative h-[271px] w-full">
                  <Image
                    className="rounded-xl object-cover shadow-md"
                    alt="Fresh salad"
                    src="/about3.png"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>

            {/* Text Content and Buttons */}
            <div className="lg:w-1/2 w-full space-y-8 pt-4 lg:pt-12">
              <div className="space-y-2">
                <h2 className={`${VibeFont.className} text-base md:text-lg text-yellow-400 italic`}>
                  About us <span className="inline-block w-12 h-[1px] bg-yellow-400 ml-2 align-middle"></span>
                </h2>
                <h1 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Food is an important part of a balanced Diet
                </h1>
              </div>
              <p className={`${InterFont.className} text-base sm:text-lg text-gray-600 leading-relaxed`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
                pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit
                augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis
                vitae mus risus.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button 
                  className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-6 h-auto text-base font-medium"
                >
                  Show More
                </Button>
                <Button 
                  className="text-gray-800  hover:bg-orange-400 hover:text-white px-6 h-auto text-base font-medium"
                >
                  <IoPlayOutline className="mr-2 text-2xl" />
                  Watch video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-black text-3xl sm:text-4xl font-bold mb-6">
              Why Choose Us
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
              pellentesque bibendum non dui volutpat fringilla bibendum.
            </p>
          </div>
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden">
            <Image
              className="object-cover"
              alt="Restaurant ambiance"
              src="/about.png"
              fill
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Third Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Card 1 */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-24 h-24 mb-6">
                <Image
                  src="/Student.png"
                  fill
                  alt="Best Chef"
                  className="object-contain"
                />
              </div>
              <h3 className="text-black text-xl font-bold mb-4">BEST CHEF</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
                pellentesque bibendum non dui volutpat
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-24 h-24 mb-6">
                <Image
                  src="/Coffee.png"
                  fill
                  alt="Food Items"
                  className="object-contain"
                />
              </div>
              <h3 className="text-black text-xl font-bold mb-4">120 Item food</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
                pellentesque bibendum non dui volutpat
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-24 h-24 mb-6">
                <Image
                  src="/man.png"
                  fill
                  alt="Clean Environment"
                  className="object-contain"
                />
              </div>
              <h3 className="text-black text-xl font-bold mb-4">Clean Environment</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
                pellentesque bibendum non dui volutpat
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}











