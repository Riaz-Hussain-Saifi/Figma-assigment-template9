'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import Image from "next/image"

const initialCartItems = [
  { name: "Burger", price: 10.99, quantity: 2, image: "/cart1.png" },
  { name: "Fresh Lime", price: 3.49, quantity: 1, image: "/cart2.png" },
  { name: "Pizza", price: 9.99, quantity: 4, image: "/cart3.png" },
  { name: "Chocolate Muffin", price: 4.49, quantity: 1, image: "/cart4.png" },
  { name: "Cheese Butter", price: 11.99, quantity: 3, image: "/cart5.png" },
];

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCharges = 30.0;
  const totalAmount = cartSubtotal - cartSubtotal * discount + shippingCharges;

  return (
    <div className="bg-white font-sans">
      <header className="bg-cover bg-center h-48 flex items-center justify-center" style={{ backgroundImage: 'url(/path/to/header-bg.jpg)' }}>
        <h1 className="text-5xl font-bold text-white tracking-wide">Shopping Cart</h1>
      </header>
      <main className="py-12 px-6 md:px-16 lg:px-28">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold">Product</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Quantity</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 flex items-center">
                  <Image src={item.image} alt={item.name}
                  width={16} height={16} className="w-16 h-16 object-cover rounded mr-4" />
                  <span>{item.name}</span>
                </td>
                <td className="p-4">${item.price.toFixed(2)}</td>
                <td className="p-4">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                    className="w-16 border rounded px-2 py-1 text-center"
                    min="0"
                  />
                </td>
                <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="p-4 text-red-500 cursor-pointer" onClick={() => handleRemoveItem(index)}>
                  &times;
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-10">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold mb-2">Coupon Code</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter your code"
                className="flex-grow border rounded-l px-4 py-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-orange-500 text-white px-6 py-2 rounded-r font-semibold"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex justify-between mb-4">
                <span>Cart Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Discount</span>
                <span>${(cartSubtotal * discount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping Charges</span>
                <span>${shippingCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <button className="w-full bg-orange-500 text-white mt-4 py-3 rounded font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;