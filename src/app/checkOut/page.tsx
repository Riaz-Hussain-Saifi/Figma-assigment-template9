// "use client";

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/CartContext';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
// import Image from 'next/image';
// import { loadStripe } from '@stripe/stripe-js';
// import { client } from '@/sanity/lib/client';
// import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "./action";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { state: cartState, clearCart } = useCart();
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [showPayment, setShowPayment] = useState(false);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [formData, setFormData] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//   });

//   const validateForm = () => {
//     const newErrors: Partial<FormData> = {};

//     if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
//     if (!/^\d{11}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = '11 digit valid phone number is required';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.city.trim()) newErrors.city = 'City is required';
//     if (!formData.state.trim()) newErrors.state = 'State is required';
//     if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) newErrors.zipCode = 'Valid ZIP code is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name as keyof FormData]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleCustomerDetailsSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setShowPayment(true);

//     // Create Payment Intent
//     const { clientSecret } = await createPaymentIntent({
//       items: cartState.items,
//       totalAmount: cartState.total * 1.1,
//     });
//     setClientSecret(clientSecret);
//   };

//   const handlePayment = async () => {
//     setIsLoading(true);

//     try {
//       // Create order in Sanity
//       const order = {
//         _id: `order-${new Date().getTime()}`, // Generate a unique ID
//         _type: 'order',
//         customer: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           city: formData.city,
//           state: formData.state,
//           zipCode: formData.zipCode,
//         },
//         items: cartState.items.map(item => ({
//           productId: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//         })),
//         totalAmount: cartState.total * 1.1, // Including tax
//         status: 'pending',
//       };

//       await client.createOrReplace(order);

//       // Redirect to Stripe Checkout
//       const stripe = await stripePromise;
//       if (stripe && clientSecret) {
//         const { error } = await stripe.confirmPayment({
//           elements: stripe.elements(),
//           confirmParams: {
//             return_url: `${window.location.origin}/thank-you`,
//           },
//         });

//         if (error) {
//           console.error('Payment failed:', error);
//           setIsLoading(false);
//         }
//       }
//     } catch (error) {
//       console.error('Payment failed:', error);
//       setIsLoading(false);
//     }
//   };

//   if (cartState.items.length === 0) {
//     router.push('/cart');
//     return null;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Order Summary */}
//         <div className="lg:col-span-1">
//           <Card>
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//               <CardDescription>
//                 {cartState.items.length} items in your cart
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {cartState.items.map((item) => (
//                   <div key={item.id} className="flex gap-4">
//                     <div className="relative w-16 h-16">
//                       <Image
//                         src={item.image}
//                         alt={item.name}
//                         fill
//                         className="rounded object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                       <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <Separator />
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Subtotal</span>
//                     <span>${cartState.total.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Shipping</span>
//                     <span>Free</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Tax</span>
//                     <span>${(cartState.total * 0.1).toFixed(2)}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-bold">
//                     <span>Total</span>
//                     <span>${(cartState.total * 1.1).toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Checkout Form */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>{showPayment ? 'Payment Information' : 'Shipping Information'}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {!showPayment ? (
//                 <form onSubmit={handleCustomerDetailsSubmit} className="space-y-6">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="firstName">First Name</Label>
//                       <Input
//                         id="firstName"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                         className={errors.firstName ? 'border-red-500' : ''}
//                       />
//                       {errors.firstName && (
//                         <p className="text-sm text-red-500">{errors.firstName}</p>
//                       )}
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="lastName">Last Name</Label>
//                       <Input
//                         id="lastName"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         className={errors.lastName ? 'border-red-500' : ''}
//                       />
//                       {errors.lastName && (
//                         <p className="text-sm text-red-500">{errors.lastName}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className={errors.email ? 'border-red-500' : ''}
//                       />
//                       {errors.email && (
//                         <p className="text-sm text-red-500">{errors.email}</p>
//                       )}
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Phone</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className={errors.phone ? 'border-red-500' : ''}
//                       />
//                       {errors.phone && (
//                         <p className="text-sm text-red-500">{errors.phone}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="address">Address</Label>
//                     <Input
//                       id="address"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className={errors.address ? 'border-red-500' : ''}
//                     />
//                     {errors.address && (
//                       <p className="text-sm text-red-500">{errors.address}</p>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="city">City</Label>
//                       <Input
//                         id="city"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         className={errors.city ? 'border-red-500' : ''}
//                       />
//                       {errors.city && (
//                         <p className="text-sm text-red-500">{errors.city}</p>
//                       )}
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="state">State</Label>
//                       <Input
//                         id="state"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         className={errors.state ? 'border-red-500' : ''}
//                       />
//                       {errors.state && (
//                         <p className="text-sm text-red-500">{errors.state}</p>
//                       )}
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="zipCode">ZIP Code</Label>
//                       <Input
//                         id="zipCode"
//                         name="zipCode"
//                         value={formData.zipCode}
//                         onChange={handleInputChange}
//                         className={errors.zipCode ? 'border-red-500' : ''}
//                       />
//                       {errors.zipCode && (
//                         <p className="text-sm text-red-500">{errors.zipCode}</p>
//                       )}
//                     </div>
//                   </div>
//                   <Button
//                     type="submit"
//                     className="w-full bg-[#FF9F0D] hover:bg-[#e68906]"
//                     disabled={isLoading}
//                   >
//                     Proceed to Payment
//                   </Button>
//                 </form>
//               ) : (
//                 <Elements stripe={stripePromise} options={{ clientSecret }}>
//                   <PaymentForm />
//                 </Elements>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PaymentForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setIsProcessing(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/thank-you`,
//       },
//     });

//     if (error) {
//       setErrorMessage(error.message || "An unknown error occurred");
//       setIsProcessing(false);
//     } else {
//       setErrorMessage(null);
//       alert("Payment successful!");
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe || isProcessing}>
//         {isProcessing ? "Processing..." : "Pay Now"}
//       </button>
//       {errorMessage && <div style={{ color: "red", marginTop: 8 }}>{errorMessage}</div>}
//     </form>
//   );
// }













"use client"

import React, {useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { loadStripe } from "@stripe/stripe-js"
import { client } from "@/sanity/lib/client"
import { Route } from "lucide-react"
import order from "@/sanity/schemaTypes/order"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const DELIVERY_CHARGE = 5

export default function CheckoutPage() {
  const router = useRouter()
  const {
    state: { items, total },
    clearCart,
  } = useCart()
  const [customerData, setCustomerData] = useState({ name: "", email: "", address: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const storedCustomerData = localStorage.getItem("customerData")
    if (storedCustomerData) {
      setCustomerData(JSON.parse(storedCustomerData))
    }
  }, [])

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Create order in Sanity
      const order = await client.create({
        _type: "order",
        customer: customerData,
        items: items.map((item) => ({
          _type: "orderItem",
          product: { _type: "reference", _ref: item.id.toString() },
          quantity: item.quantity,
          price: item.price,
        })),
        total: total + DELIVERY_CHARGE,
        deliveryCharge: DELIVERY_CHARGE,
        status: "pending",
        createdAt: new Date().toISOString(),
      })

      // Redirect to Stripe payment page
      router.push(`/payment/${order._id}`)
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
              </div>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p className="text-orange-500 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>${DELIVERY_CHARGE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(total + DELIVERY_CHARGE).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">{customerData.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">{customerData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">
                {customerData.address}
              </p>
            </div>
          </div>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            
            className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </div>
    </div>
  )
}
