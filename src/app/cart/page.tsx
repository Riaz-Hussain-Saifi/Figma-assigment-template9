// // src/app/cart/page.tsx

// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useCart } from '@/context/CartContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Trash2 } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// export default function CartPage() {
//   const { state: { items, total }, removeFromCart, updateQuantity } = useCart();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleCheckout = async () => {
//     setLoading(true);
//     // Simulate checkout process
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     router.push('/checkout');
//   };

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//         <Link href="/shop">
//           <Button>Continue Shopping</Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="md:col-span-2">
//           {items.map((item) => (
//             <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-4">
//               <div className="relative h-24 w-24">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   fill
//                   className="object-cover rounded"
//                 />
//               </div>

//               <div className="flex-grow">
//                 <h3 className="font-semibold">{item.name}</h3>
//                 <p className="text-orange-500 font-bold">${item.price}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Input
//                   type="number"
//                   min="1"
//                   value={item.quantity}
//                   onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
//                   className="w-20 text-center"
//                 />
//                 <Button
//                   variant="ghost"
//                   onClick={() => removeFromCart(item.id)}
//                 >
//                   <Trash2 className="h-5 w-5 text-red-500" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow h-fit">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//           <div className="space-y-2 mb-4">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>Free</span>
//             </div>
//             <div className="border-t pt-2 font-bold">
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//           <Button
//             className="w-full"
//             onClick={handleCheckout}
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : 'Proceed to Checkout'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"

const DELIVERY_CHARGE = 5 // $5 delivery charge

export default function CartPage() {
  const router = useRouter()
  const {
    state: { items, total },
    removeFromCart,
    updateQuantity,
  } = useCart()
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    address: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, Math.max(1, newQuantity))
  }

  const handleRemoveItem = (id: number) => {
    removeFromCart(id)
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    // Store customer data in localStorage or state management solution
    localStorage.setItem("customerData", JSON.stringify(customerData))
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-4">
              <div className="relative h-24 w-24">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-orange-500 font-bold">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                  className="w-20 text-center"
                />
                <Button variant="ghost" onClick={() => handleRemoveItem(item.id)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>${DELIVERY_CHARGE.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 font-bold">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${(total + DELIVERY_CHARGE).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={customerData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={customerData.address} onChange={handleInputChange} required />
            </div>
            <Button type="submit" className="w-full">
              Proceed to Checkout
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

