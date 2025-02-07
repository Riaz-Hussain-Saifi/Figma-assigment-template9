// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { client } from "@/sanity/lib/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Slider } from "@/components/ui/slider";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   category: string;
//   tags: string[];
//   available: boolean;
// }

// const categories = [
//   "All",
//   "Sandwich",
//   "Burger",
//   "Chicken",
//   "Drink",
//   "Pizza",
//   "Dessert",
//   "Main Course",
// ];

// export default function ShopPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState([0, 100]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;

//   useEffect(() => {
//     async function fetchProducts() {
//       setLoading(true);
//       try {
//         const query = `*[_type == "food"]{
//           id,
//           name,
//           description,
//           price,
//           originalPrice,
//           "image": image.asset->url,
//           category,
//           tags,
//           available
//         }`;
//         const result = await client.fetch(query);
//         setProducts(result);
//         setFilteredProducts(result);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = [...products];

//     if (selectedCategory !== "All") {
//       filtered = filtered.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     filtered = filtered.filter(
//       (product) =>
//         product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     switch (sortBy) {
//       case "priceLowToHigh":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "priceHighToLow":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//     }

//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [selectedCategory, priceRange, searchQuery, sortBy, products]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="md:col-span-1 space-y-6">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-xl font-bold mb-4">Categories</h3>
//             <div className="space-y-2">
//               {categories.map((category) => (
//                 <Button
//                   key={category}
//                   variant={selectedCategory === category ? "default" : "outline"}
//                   onClick={() => setSelectedCategory(category)}
//                   className="w-full justify-start"
//                 >
//                   {category}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-xl font-bold mb-4">Price Range</h3>
//             <Slider
//               defaultValue={priceRange}
//               max={100}
//               step={1}
//               onValueChange={(value) => setPriceRange(value as [number, number])}
//               className="w-full"
//             />
//             <div className="flex justify-between mt-2 text-sm">
//               <span>${priceRange[0]}</span>
//               <span>${priceRange[1]}</span>
//             </div>
//           </div>
//         </div>

//         <div className="md:col-span-3">
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <Input
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-grow"
//             />
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="newest">Newest</SelectItem>
//                 <SelectItem value="priceLowToHigh">Low to High</SelectItem>
//                 <SelectItem value="priceHighToLow">High to Low</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentProducts.map((product) => (
//               <Link 
//                 key={product.id}
//                 href={`/shop/${product.id}`}
//                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <div className="relative h-48 w-full">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">{product.name}</h3>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-xl font-bold text-orange-500">
//                       ${product.price}
//                     </span>
//                     <Badge variant={product.available ? "default" : "destructive"}>
//                       {product.available ? "In Stock" : "Out of Stock"}
//                     </Badge>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           <div className="flex flex-wrap justify-center gap-2 mt-8">
//             <Button
//               variant="outline"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//             >
//               Previous
//             </Button>

//             {pageNumbers
//               .slice(Math.max(0, currentPage - 2), currentPage + 1)
//               .map((number) => (
//                 <Button
//                   key={number}
//                   variant={currentPage === number ? "default" : "outline"}
//                   onClick={() => setCurrentPage(number)}
//                 >
//                   {number}
//                 </Button>
//               ))}

//             <Button
//               variant="outline"
//               disabled={currentPage === pageNumbers.length}
//               onClick={() => setCurrentPage(currentPage + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// src/app/shop/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  available: boolean;
}

const categories = [
  "All",
  "Sandwich",
  "Burger",
  "Chicken",
  "Drink",
  "Pizza",
  "Dessert",
  "Main Course",
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
          id,
          name,
          description,
          price,
          originalPrice,
          "image": image.asset->url,
          category,
          tags,
          available
        }`;
        const result = await client.fetch(query);
        setProducts(result);
        setFilteredProducts(result);
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

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case "priceLowToHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, searchQuery, sortBy, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="w-full justify-start"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Price Range</h3>
            <Slider
              defaultValue={priceRange}
              max={100}
              step={1}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="priceLowToHigh">Low to High</SelectItem>
                <SelectItem value="priceHighToLow">High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <Link 
                key={product.id}
                href={`/shop/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold text-orange-500">
                      ${product.price}
                    </span>
                    <Badge variant={product.available ? "default" : "destructive"}>
                      {product.available ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>

            {pageNumbers
              .slice(Math.max(0, currentPage - 2), currentPage + 1)
              .map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Button>
              ))}

            <Button
              variant="outline"
              disabled={currentPage === pageNumbers.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}