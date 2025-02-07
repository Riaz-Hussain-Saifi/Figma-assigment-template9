// src/componets/HomePages/OurChefs.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import { Button } from "@/components/ui/button";

const InterFont = Inter({ subsets: ["latin"] });
const VibeFont = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

const chefs = [
  { name: "Tahmina Rumi", role: "Chef", image: "/chef1.png" },
  { name: "Jorina Begum", role: "Chef", image: "/chef2.png" },
  { name: "M. Mohammad", role: "Chef", image: "/chef3.png" },
  { name: "Munna Kathy", role: "Chef", image: "/chef4.png" },
];

const OurChefs = () => {
  return (
    <div className="bg-black min-h-screen w-full">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1
            className={`${VibeFont.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#FF9F0D] font-bold text-center mb-4 sm:mb-6`}
          >
            Chefs
          </h1>
          <div className="text-base font-bold text-white sm:text-lg md:text-[48px] flex gap-2 text-center justify-center">
            <p>
              <span className="text-[#FF9F0D]">Me</span>et our Chef
            </p>
          </div>
        </div>
      </div>

      {/* Chefs Grid */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chefs.map((chef, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-gray-800 hover:border-[#FF9F0D] group"
            >
              <div className="relative aspect-w-4 aspect-h-3">
                <Image
                  src={chef.image}
                  alt={chef.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900/90 p-4 text-white transform transition-transform duration-300 group-hover:translate-y-0">
                  <h3
                    className={`${InterFont.className} text-lg font-bold text-[#FF9F0D]`}
                  >
                    {chef.name}
                  </h3>
                  <p className="text-sm text-gray-300">{chef.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href='./chefs'><Button 
            className={`
            ${InterFont.className} 
            px-8 py-3 
            rounded-full 
            border-2 
            border-[#FF9F0D] 
            text-white 
            text-lg 
            transition-all 
            duration-300 
            hover:bg-[#FF9F0D] 
            hover:text-black 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#FF9F0D] 
            focus:ring-opacity-50
          `}
          >
            See More
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurChefs;









