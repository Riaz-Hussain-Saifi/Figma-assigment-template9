// src/componets/HomePages/BlogPosts.tsx
import React from 'react';
import { Great_Vibes } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';

const VibeFont = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

const BlogPost = () => {
  const blogPosts = [
    { id: 1, image: "/card1.png", date: "10 February 2022" },
    { id: 2, image: "/card2.png", date: "10 February 2022" },
    { id: 3, image: "/card3.png", date: "10 February 2022" },
  ];

  return (
    <div className="min-h-screen bg-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h4 className={`${VibeFont.className} text-white text-3xl sm:text-4xl mb-2`}>
            Blog Post
          </h4>
          <h4 className="text-white text-3xl sm:text-5xl font-bold">
            <span className="text-[#FF9F0D]">La</span>test News & Blog
          </h4>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-black border border-white/20 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-64 sm:h-72">
                <Image
                  src={post.image}
                  alt={`Blog post ${post.id}`}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-[#FF9F0D] text-sm font-medium">
                  {post.date}
                </p>
                <p className="text-white text-lg font-semibold line-clamp-2">
                  Pellentesque Non Efficitur Mi Aliquam Convallis Mi Quis
                </p>
                <Link 
                  href="#" 
                  className="inline-block text-white text-sm font-medium hover:text-[#FF9F0D] transition-colors duration-300"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;






