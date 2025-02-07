"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  available: boolean;
  _createdAt: string;
}

const categories = [
  "All", "Sandwich", "Burger", "Chicken", "Drink", 
  "Pizza", "Dessert", "Main Course"
];

export function DashboardHeader() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const query = `*[_type == "food"]{
          _id,
          name,
          description,
          price,
          originalPrice,
          "image": image.asset->url,
          category,
          tags,
          available,
          _createdAt
        }`;
        const result = await client.fetch(query);
        setProducts(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Category Filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price Range Filter
    filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

    // Search Filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case "priceLowToHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime());
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, searchQuery, sortBy, products]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button>Export</Button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Category Filter Dropdown */}
        <Select onValueChange={(value) => setSelectedCategory(value)} value={selectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem className="bg-white text-black hover:text-blue-600" key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort By Dropdown */}
        <Select onValueChange={(value) => setSortBy(value)} value={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="bg-white text-black hover:text-blue-600" value="newest">Newest First</SelectItem>
            <SelectItem className="bg-white text-black hover:text-blue-600" value="oldest">Oldest First</SelectItem>
            <SelectItem className="bg-white text-black hover:text-blue-600" value="priceLowToHigh">Price Low to High</SelectItem>
            <SelectItem className="bg-white text-black hover:text-blue-600" value="priceHighToLow">Price High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Filtered Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.map(product => (
            <div key={product._id} className="p-4 bg-white rounded-lg shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
              <h4 className="text-lg font-semibold mt-2">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {pageNumbers.map(number => (
          <Button
            key={number}
            variant={currentPage === number ? "default" : "outline"}
            onClick={() => setCurrentPage(number)}
            className="mx-1"
          >
            {number}
          </Button>
        ))}
      </div>
    </div>
  );
}