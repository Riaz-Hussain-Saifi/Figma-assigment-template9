// src/componets/HomePages/AboutUs.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Great_Vibes } from "next/font/google";

const VibeFont = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const Aboutus = () => {
  const features = [
    "Lacus nisi, et ac dapibus sit eu velit in consequat.",
    "Quisque diam pellentesque bibendum non dui volutpat fringilla",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  ];

  return (
    <section className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
        <p className={`${VibeFont.className} text-[#FF9F0D] text-4xl mb-4 animate-fade-in`}>
            About us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-orange-500">We</span> Create the best foody product
          </h2>
          
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam 
            pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit 
            augue urna, vitae feugiat pretium donec id elementum. Ultrices 
            mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in 
            consequat.
          </p>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link 
            href="/menu" 
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full 
              hover:bg-orange-600 transition-colors"
          >
            See Menu
          </Link>
        </div>

        {/* Right Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Image
              src="/hero-egg.png"
              alt="Egg and avocado toast"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[300px]"
            />
          </div>
          <div>
            <Image
              src="/child1.png"
              alt="Grilled dish"
              width={280}
              height={200}
              className="rounded-lg object-cover w-full h-[200px]"
            />
          </div>
          <div>
            <Image
              src="/child2.png"
              alt="Sandwich"
              width={280}
              height={200}
              className="rounded-lg object-cover w-full h-[200px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;








