// // src/app/shop/shop.tsx
// "use client";
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Select } from '@/components/ui/select';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { client } from '@/sanity/lib/client';
// import Link from 'next/link';

// interface Product {
// name: string;
// description: string;
// ratingCount: number;
// price: number;
// rating: number;
// priceWithoutDiscount: number;
// tags: string[];
// image: string;
// discountPercentage: number;
// sizes: string[];
// }

//  function ShopProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<{id: string, label: string}[]>([
//     { id: 'sandwiches', label: 'Sandwiches' },
//     { id: 'burger', label: 'Burger' },
//     { id: 'chicken', label: 'Chicken Chup' },
//     { id: 'drink', label: 'Drink' },
//     { id: 'pizza', label: 'Pizza' },
//     { id: 'nonveg', label: 'Non Veg' },
//     { id: 'uncategorized', label: 'Uncategorized' }
//   ]);

//   useEffect(() => {
//     async function getProducts() {
//       const query = await client.fetch(`*[_type == 'food'][]{
//   category, "image":image.asset->url, 
//   available, description, tags[],
//   price, originalPrice, name, _id
// }`);

//       setProducts(query);
//       return query;
//     }
//     getProducts();
//   }, []);

//   const renderProductGrid = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {products.map((item, index) => (
//         <Link href={`/shop/?${item.name}&${item.priceWithoutDiscount}&${item.price}&${item.image}&${item.description}&${item.tags}&${item.sizes}&${item.discountPercentage}`}>
//            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
//          <div className="relative h-48 w-full">
//            <Image
//              src={item.image}
//              alt={item.name}
//              fill
//              className="object-cover"
//            />
//          </div>
//          <div className="p-4">
//            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
//            <div className="flex items-center justify-between">
//              <div className="flex items-center gap-2">
//                <span className="text-[#FF9F0D] text-xl font-bold">${item.price}.00</span>
//                <span className="text-gray-400 line-through">${item.priceWithoutDiscount}.00</span>
//              </div>
//              <Button 
//                className="bg-[#FF9F0D] hover:bg-[#e68906]"
//              >
//                Add to Cart
//              </Button>
//            </div>
//          </div>
//        </div>  
//         </Link>
//       ))}
//     </div>
//   );

//   const renderPagination = () => (
//     <div className="flex justify-center mt-12">
//       <nav className="flex items-center gap-2">
//         <Button variant="outline" className="p-2">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
//           </svg>
//         </Button>
//         {[1, 2, 3].map((page) => (
//           <Button
//             key={page}
//             variant={page === 2 ? "default" : "outline"}
//             className={page === 2 ? "bg-[#FF9F0D]" : ""}
//           >
//             {page}
//           </Button>
//         ))}
//         <Button variant="outline" className="p-2">
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
//           </svg>
//         </Button>
//       </nav>
//     </div>
//   );

//   const renderSidebar = () => (
//     <div className="w-full lg:w-1/4 space-y-8">
//       {/* Search */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <div className="flex gap-2">
//           <Input
//             type="text"
//             placeholder="Search Products..."
//             className="flex-grow bg-gray-50"
//           />
//           <Button className="bg-[#FF9F0D] hover:bg-[#e68906] px-6">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </Button>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-xl font-bold mb-4">Categories</h2>
//         <div className="space-y-3">
//           {categories.map(({ id, label }) => (
//             <div key={id} className="flex items-center gap-3">
//               <Input
//                 type="checkbox"
//                 id={id}
//                 className="w-4 h-4 text-[#FF9F0D] rounded"
//               />
//               <label htmlFor={id} className="text-gray-700 hover:text-[#FF9F0D] cursor-pointer">
//                 {label}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price Filter */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-xl font-bold mb-4">Filter by Price</h2>
//         <div className="space-y-4">
//           <Input
//             type="range"
//             min="0"
//             max="8000"
//             className="w-full"
//           />
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>$0</span>
//             <span>$8000</span>
//           </div>
//           <Button className="w-full bg-[#FF9F0D] hover:bg-[#e68906]">
//             Apply Filter
//           </Button>
//         </div>
//       </div>

//       {/* Latest Products */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-xl font-bold mb-4">Latest Products</h2>
//         <div className="space-y-4">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div key={i} className="flex gap-4 items-center">
//               <div className="relative h-16 w-16 flex-shrink-0">
//                 <Image
//                   src="/shop-detail/latestProduct.png"
//                   alt="Latest Product"
//                   fill
//                   className="object-cover rounded"
//                 />
//               </div>
//               <div>
//                 <h3 className="font-medium">Premium Pizza</h3>
//                 <div className="flex items-center space-x-1">
//                   {[...Array(3)].map((_, i) => (
//                     <svg key={i} className="w-4 h-4" fill="#FF9F0D" viewBox="0 0 24 24">
//                       <path d="M12 17.27l-6.18 3.41 1.64-7.03-5.52-4.78 7.19-.61L12 2l2.87 7.27 7.19.61-5.52 4.78 1.64 7.03L12 17.27z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <p className="text-[#FF9F0D] font-semibold">$45.00</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
//   return (
//     <div className="bg-gray-50 min-h-screen py-8">
//       <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
//         <div className="w-full lg:w-3/4">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
//             <div className="flex items-center gap-4 mb-4 sm:mb-0">
//               <span className="text-lg font-medium">Sort By:</span>
//               <Select>
//                 <option>Newest</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//               </Select>
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="text-lg font-medium">Show:</span>
//               <Select>
//                 <option>12 Items</option>
//                 <option>24 Items</option>
//                 <option>36 Items</option>
//               </Select>
//             </div>
//           </div>
//           {renderProductGrid()}
//           {renderPagination()}
//         </div>
//         {renderSidebar()}
//       </div>
//     </div>
//   );
// }

// export default ShopProducts;










