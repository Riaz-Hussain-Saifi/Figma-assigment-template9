// src/app/page.tsx
import React from "react";
import HomePage from "@/components/HomePages/HomeHero";
import FoodCategory from "@/components/HomePages/FoodCatagery";
import OurChefs from "@/components/HomePages/OurChefs";
import ChooseFromMenu from "@/components/HomePages/HomeMenu";
import Aboutus from "@/components/HomePages/AboutUs";
import TestimonialsSection from "@/components/HomePages/Testimonial";
import BlogPost from "@/components/HomePages/BlogPosts";

const Home = () => {
  return (
    <div>
      {/* Header component for the top section of the page */}
      <HomePage />

      {/* About component to display about us section */}
      <Aboutus />

      {/* Categories component to display various categories */}
      <FoodCategory />

      {/* Choose from menu component to display menu items */}
      <ChooseFromMenu />

      {/* Our Chefs component to display the chefs */}
      <OurChefs />

      {/* Testimonial component to display testimonial section */}
      <TestimonialsSection />

      {/* Blog post component to display blog posts */}
      <BlogPost />
    </div>
  );
};

export default Home;
