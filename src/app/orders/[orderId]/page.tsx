// src/app/orders/[orderId]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface Order {
  _id: string;
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  status: string;
  orderDate: string;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const query = `*[_type == "order" && _id == "${params.orderId}"][0]{
        products,
        totalAmount,
        status,
        orderDate
      }`;
      const result = await client.fetch(query);
      setOrder(result);
    };
    fetchOrder();
  }, [params.orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order Details</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {order.products.map((product) => (
            <div key={product.productId} className="flex gap-4 border-b pb-4">
              <div className="relative w-20 h-20">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="pt-4">
            <p className="text-xl font-bold">
              Total: ${order.totalAmount.toFixed(2)}
            </p>
            <p>Status: <Badge>{order.status}</Badge></p>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}