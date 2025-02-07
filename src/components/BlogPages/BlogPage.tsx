// src/components/BlogPages/BlogPage.tsx
import React from "react";
import BlogCard from "./BlogCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiPixelfed } from "react-icons/si";

const HeroPage = () => {
  const filterMenu = [
    {
      id: 1,
      image: "/Blog/Filtermanu1.jpeg",
      title: "Chicken Fry",
      available: "26",
    },
    {
      id: 2,
      image: "/Blog/Filtermanu2.jpeg",
      title: "Burger Food",
      available: "46",
    },
    {
      id: 3,
      image: "/Blog/Filtermanu3.jpeg",
      title: "Pizza",
      available: "16",
    },
    {
      id: 4,
      image: "/Blog/Filtermenu4.jpeg",
      title: "Fresh Fruits",
      available: "36",
    },
    {
      id: 5,
      image: "/Blog/Filtermanu5.jpeg",
      title: "Vegetables",
      available: "16",
    },
  ];

  const recentPosts = [
    { image: "/Blog/recentpost1.jpeg", date: "June 22, 2020" },
    { image: "/Blog/recentpost2.jpeg", date: "June 23, 2020" },
    { image: "/Blog/recentpost3.jpeg", date: "June 24, 2020" },
    { image: "/Blog/recentpost4.jpeg", date: "June 25, 2020" }
  ];

  const galleryImages = ["gal1.png", "gal2.png", "gal3.png", "gal4.png", "gal5.png", "gal3.png"];

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Blog Cards Column */}
          <div className="flex-1 space-y-6 md:space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <BlogCard key={i} imageSrc={`/Blog/recentpost${i}.jpeg`} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[425px] space-y-6 md:space-y-8">
            {/* Search Bar */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search Your Keyword"
                className="w-full h-14 md:h-[70px] pl-6 pr-16 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#FF9F0D] focus:border-transparent"
              />
              <Button className="absolute right-0 top-0 h-full w-16 bg-[#FF9F0D] rounded-r-lg hover:bg-[#e88f0c] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            </div>

            {/* Profile Card */}
            <div className="bg-gray-800 p-6 md:p-8 rounded-lg text-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6">
                <Image
                  src="/Blog/whiteman.png"
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                Prince Miyako
              </h3>
              <div className="flex justify-center text-[#FF9F0D] mb-4">
                {"★".repeat(5)}
                <span className="text-gray-400 ml-2">(1 Review)</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm md:text-base">
                This is a sample paragraph text describing the user or any
                additional details you want to include.
              </p>
              <div className="flex justify-center space-x-3 md:space-x-4">
                {[FaFacebook, FaTwitter, FaInstagram].map((Icon, index) => (
                  <Button
                    key={index}
                    className="p-2 md:p-3 bg-gray-700 rounded-full hover:bg-[#FF9F0D] transition-colors duration-300"
                  >
                    <Icon className="text-white text-lg md:text-xl" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white border border-gray-300 p-4 md:p-6 rounded-lg">
              <h2 className="font-bold text-lg md:text-xl mb-4">Recent Posts</h2>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                      <Image
                        src={`${post.image}`}
                        alt="Post"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">{post.date}</p>
                      <p className="text-sm md:text-base">
                        Lorem ipsum dolor sit cing elit, sed do.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter By Menu */}
            <div className="bg-white border border-gray-300 p-4 md:p-6 rounded-lg">
              <h3 className="text-lg md:text-xl font-bold mb-4">Filter By Menu</h3>
              <div className="space-y-4">
                {filterMenu.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 md:w-24 md:h-24">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <h4 className="text-sm md:text-base font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.available}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white border border-gray-300 p-4 md:p-6 rounded-lg">
              <h2 className="font-bold text-lg md:text-xl mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {["Burger", "Pizza", "Sandwich", "Pasta", "Fries", "Shake", "Salad", "Soup", "Tacos", "Burrito", "Nachos", "Wrap"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-amber-500 rounded-md cursor-pointer hover:bg-amber-400 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white border border-gray-300 p-4 md:p-6 rounded-lg">
              <h2 className="font-bold text-lg md:text-xl mb-4">Photo Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={`/Blog/${image}`}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white border border-gray-300 p-4 md:p-6 rounded-lg text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Follow Us</h2>
              <div className="flex justify-center gap-4">
                {[
                  { Icon: FaFacebook, bg: "bg-[#C4C4C4]" },
                  { Icon: FaYoutube, bg: "bg-[#C4C4C4]" },
                  { Icon: FaInstagram, bg: "bg-[#FF9F0D]" },
                  { Icon: SiPixelfed, bg: "bg-[#C4C4C4]" },
                  { Icon: FaTwitter, bg: "bg-[#C4C4C4]" }
                ].map(({ Icon, bg }, index) => (
                  <div key={index} className={`${bg} p-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity`}>
                    <Icon className="text-xl md:text-2xl" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;








