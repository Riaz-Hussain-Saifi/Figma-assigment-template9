// // src/components/Navbar.tsx
// 'use client';

// import { useState } from 'react'
// import Link from "next/link"
// import { Menu, X, Search, ShoppingCart, User } from 'lucide-react'
// import { Button } from './ui/button';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const menuItems = [
//     { name: "Home", href: "/", active: true },
//     { name: "Menu", href: "/menu"},
//     { name: "Blog", href: "/blog" },
//     { name: "Pages", href: "/pages" },
//     { name: "About", href: "/about" },
//     { name: "Shop", href: "/shop" },
//     { name: "Contact", href: "/contact" },
//   ]

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

//   return (
//     <header className="z-50 w-full bg-[#0D0D0D] sticky top-0 px-4 sm:px-6 lg:px-[15.62%] py-4 lg:py-7">
//       <nav className="flex items-center justify-between relative">
//         {/* Logo */}
//         <Link
//           href="/src/app/favicon.ico"
//           className="text-[20px] sm:text-[24px] leading-[32px] font-bold text-white z-50"
//         >
//           Food<span className="text-[#FF9F0D]">tuck</span>
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <Button
//           variant="ghost"
//           className="lg:hidden hover:text-white text-white z-50"
//           onClick={toggleMenu}
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </Button>

//         {/* Navigation Links */}
//         <div className={`
//           fixed inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center gap-6
//           lg:static lg:flex-row lg:bg-transparent lg:gap-[32px]
//           transition-all duration-300 ease-in-out
//           ${isMenuOpen 
//             ? 'opacity-100 visible translate-x-0' 
//             : 'opacity-0 invisible translate-x-full lg:translate-x-0 lg:opacity-100 lg:visible'}
//           absolute top-0 left-0 w-full h-screen lg:h-auto
//         `}>
//           <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-[32px]">
//             {menuItems.map((item) => (
//               <li key={item.name} className="w-full lg:w-auto text-center">
//                 <Link
//                   href={item.href}
//                   className={`block w-full lg:w-auto text-[16px] leading-6 ${
//                     item.active ? "text-[#FF9F0D] font-bold" : "text-white"
//                   } font-inter hover:text-[#FF9F0D] transition-colors`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Icons */}
//           <div className="lg:hidden flex items-center gap-4 mt-6">
//             <Link href="#" className="text-white hover:text-[#FF9F0D] transition-colors" aria-label="Search">
//               <Search size={24} />
//             </Link>
//             <Link href="/signup" className="text-white hover:text-[#FF9F0D] transition-colors" aria-label="User Profile">
//               <User size={24} />
//             </Link>
//             <Link href="/cart" className="text-white hover:text-[#FF9F0D] transition-colors" aria-label="Shopping Cart">
//               <ShoppingCart size={24} />
//             </Link>
//           </div>
//         </div>

//         {/* Desktop Icons */}
//         <div className="hidden lg:flex items-center gap-4">
//           <Link href="#" className="text-white hover:text-[#FF9F0D] transition-colors" aria-label="Search">
//             <Search size={24} />
//           </Link>
//           <Link href="/signup" className="text-white hover:text-[#FF9F0D] transition-colors" aria-label="User Profile">
//             <User size={24} />
//           </Link>
//           <Link href="/cart" className="text-white hover:text-[#FF9F0D] transition-colors" aria-label="Shopping Cart">
//             <ShoppingCart size={24} />
//           </Link>
//         </div>
//       </nav>
//     </header>
//   )
// }






// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Menu, X, Search as SearchIcon, ShoppingCart } from 'lucide-react';
// import { Button } from './ui/button';
// import { UserButton, useUser } from '@clerk/nextjs';
// import { useCart } from '@/context/CartContext';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const router = useRouter();
//   const { isSignedIn } = useUser();
//   const { state: { items } } = useCart();
//   const itemCount = items.length;

//   const menuItems = [
//     { name: 'Home', href: '/', active: true },
//     { name: 'Menu', href: '/menu' },
//     { name: 'Blog', href: '/blog' },
//     { name: 'About', href: '/about' },
//     { name: 'Shop', href: '/shop' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.trim()) {
//       router.push(`/search?q=${encodeURIComponent(query)}`);
//     }
//   };

//   const handleAuthAction = (path: string) => {
//     if (!isSignedIn) {
//       router.push('/sign-in');
//       return;
//     }
//     router.push(path);
//   };

//   return (
//     <header
//       className={`z-50 w-full sticky top-0 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-[#0D0D0D]/95 backdrop-blur-sm shadow-lg py-2'
//           : 'bg-gradient-to-r from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] py-4 lg:py-6'
//       }`}
//     >
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="text-2xl sm:text-3xl font-bold text-white z-50 
//                      hover:scale-105 transition-transform duration-300 
//                      bg-gradient-to-r from-white via-[#FF9F0D] to-white 
//                      bg-clip-text text-transparent"
//           >
//             Food<span className="text-[#FF9F0D]">tuck</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-8">
//             {menuItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`text-[16px] font-medium ${
//                   item.active
//                     ? 'text-[#FF9F0D] font-bold'
//                     : 'text-white'
//                 } hover:text-[#FF9F0D] transition-all duration-300 
//                   hover:scale-110 relative after:content-[''] 
//                   after:absolute after:w-0 after:h-0.5 after:bg-[#FF9F0D] 
//                   after:left-0 after:-bottom-1 after:transition-all 
//                   hover:after:w-full`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Search and Icons */}
//           <div className="hidden lg:flex items-center gap-6">
//             {/* Search Bar */}
//             <div className="relative group">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className="px-4 py-2 rounded-full bg-gray-800 text-white 
//                          border border-gray-700 focus:outline-none 
//                          focus:border-[#FF9F0D] w-48 transition-all 
//                          duration-300 focus:w-64 group-hover:border-[#FF9F0D]"
//               />
//               <SearchIcon
//                 size={20}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 
//                          text-gray-400 group-hover:text-[#FF9F0D] 
//                          transition-colors duration-300"
//               />
//             </div>

//             {/* Cart Icon */}
//             <button
//               onClick={() => handleAuthAction('/cart')}
//               className="relative group"
//               aria-label="Shopping Cart"
//             >
//               <ShoppingCart
//                 size={24}
//                 className="text-white transition-all duration-300 
//                          group-hover:text-[#FF9F0D] group-hover:scale-110"
//               />
//               {itemCount > 0 && (
//                 <span className="absolute -top-3 -right-3 bg-[#FF9F0D] 
//                                text-white text-xs font-bold rounded-full 
//                                h-5 w-5 flex items-center justify-center 
//                                transform group-hover:scale-110 
//                                transition-transform duration-300">
//                   {itemCount}
//                 </span>
//               )}
//             </button>

//             {/* User Profile */}
//             <div className="pl-4 border-l border-gray-700">
//               {isSignedIn ? (
//                 <UserButton
//                   afterSignOutUrl="/"
//                   appearance={{
//                     elements: {
//                       avatarBox: "h-9 w-9 hover:scale-110 transition-transform duration-300"
//                     }
//                   }}
//                 />
//               ) : (
//                 <Button
//                   onClick={() => router.push('/sign-in')}
//                   className="bg-[#FF9F0D] hover:bg-[#ff9f0dd3] text-white"
//                 >
//                   Sign In
//                 </Button>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex lg:hidden items-center gap-4">
//             {/* Mobile Cart Icon */}
//             <button
//               onClick={() => handleAuthAction('/cart')}
//               className="relative"
//               aria-label="Shopping Cart"
//             >
//               <ShoppingCart size={24} className="text-white" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-3 -right-3 bg-[#FF9F0D] 
//                                text-white text-xs font-bold rounded-full 
//                                h-5 w-5 flex items-center justify-center">
//                   {itemCount}
//                 </span>
//               )}
//             </button>

//             <Button
//               variant="ghost"
//               className="text-white hover:text-[#FF9F0D] p-2"
//               onClick={toggleMenu}
//               aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden absolute top-16 left-0 w-full 
//                          bg-[#0D0D0D] border-t border-gray-800 
//                          shadow-xl rounded-b-2xl">
//             <div className="px-4 pt-2 pb-6 space-y-4">
//               {/* Mobile Search */}
//               <div className="relative mt-4 mb-6">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={handleSearch}
//                   className="w-full px-4 py-2 rounded-full bg-gray-800 
//                            text-white border border-gray-700 
//                            focus:outline-none focus:border-[#FF9F0D]"
//                 />
//                 <SearchIcon
//                   size={20}
//                   className="absolute right-3 top-1/2 transform 
//                            -translate-y-1/2 text-gray-400"
//                 />
//               </div>

//               {/* Mobile Navigation Links */}
//               <div className="space-y-4">
//                 {menuItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`block py-2 text-center ${
//                       item.active
//                         ? 'text-[#FF9F0D] font-bold'
//                         : 'text-white'
//                     } hover:text-[#FF9F0D] transition-colors`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>

//               {/* Mobile User Profile */}
//               <div className="flex justify-center pt-4 border-t border-gray-800">
//                 {isSignedIn ? (
//                   <UserButton afterSignOutUrl="/" />
//                 ) : (
//                   <Button
//                     onClick={() => router.push('/sign-in')}
//                     className="bg-[#FF9F0D] hover:bg-[#ff9f0dd3] text-white"
//                   >
//                     Sign In
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }






// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Search as SearchIcon, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { state: { items } } = useCart();
  const itemCount = items.length;

  const menuItems = [
    { name: 'Home', href: '/', active: true },
    { name: 'Menu', href: '/menu' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleAuthAction = (path: string) => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    router.push(path);
  };

  return (
    <header
      className={`z-50 w-full sticky top-0 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-sm shadow-lg py-2'
          : 'bg-gradient-to-r from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] py-4 lg:py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-white z-50 
                     hover:scale-105 transition-transform duration-300 
                     bg-gradient-to-r from-white via-[#FF9F0D] to-white 
                     bg-clip-text text-transparent"
          >
            Food<span className="text-[#FF9F0D]">tuck</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[16px] font-medium ${
                  item.active
                    ? 'text-[#FF9F0D] font-bold'
                    : 'text-white'
                } hover:text-[#FF9F0D] transition-all duration-300 
                  hover:scale-110 relative after:content-[''] 
                  after:absolute after:w-0 after:h-0.5 after:bg-[#FF9F0D] 
                  after:left-0 after:-bottom-1 after:transition-all 
                  hover:after:w-full`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Search and Icons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 rounded-full bg-gray-800 text-white 
                         border border-gray-700 focus:outline-none 
                         focus:border-[#FF9F0D] w-48 transition-all 
                         duration-300 focus:w-64 group-hover:border-[#FF9F0D]"
              />
              <SearchIcon
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         text-gray-400 group-hover:text-[#FF9F0D] 
                         transition-colors duration-300"
              />
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => handleAuthAction('/cart')}
              className="relative group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart
                size={24}
                className="text-white transition-all duration-300 
                         group-hover:text-[#FF9F0D] group-hover:scale-110"
              />
              {itemCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-[#FF9F0D] 
                               text-white text-xs font-bold rounded-full 
                               h-5 w-5 flex items-center justify-center 
                               transform group-hover:scale-110 
                               transition-transform duration-300">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="pl-4 border-l border-gray-700">
              {isSignedIn ? (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 hover:scale-110 transition-transform duration-300"
                    }
                  }}
                />
              ) : (
                <Button
                  onClick={() => router.push('/sign-in')}
                  className="bg-[#FF9F0D] hover:bg-[#ff9f0dd3] text-white"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            {/* Mobile Cart Icon */}
            <button
              onClick={() => handleAuthAction('/cart')}
              className="relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={24} className="text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-[#FF9F0D] 
                               text-white text-xs font-bold rounded-full 
                               h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <Button
              variant="ghost"
              className="text-white hover:text-[#FF9F0D] p-2"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full 
                         bg-[#0D0D0D] border-t border-gray-800 
                         shadow-xl rounded-b-2xl">
            <div className="px-4 pt-2 pb-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative mt-4 mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 rounded-full bg-gray-800 
                           text-white border border-gray-700 
                           focus:outline-none focus:border-[#FF9F0D]"
                />
                <SearchIcon
                  size={20}
                  className="absolute right-3 top-1/2 transform 
                           -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block py-2 text-center ${
                      item.active
                        ? 'text-[#FF9F0D] font-bold'
                        : 'text-white'
                    } hover:text-[#FF9F0D] transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile User Profile */}
              <div className="flex justify-center pt-4 border-t border-gray-800">
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <Button
                    onClick={() => router.push('/sign-in')}
                    className="bg-[#FF9F0D] hover:bg-[#ff9f0dd3] text-white"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

