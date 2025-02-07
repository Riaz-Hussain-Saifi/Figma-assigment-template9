// src/app/orders/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';

interface Order {
  _id: string;
  orderId: string;
  totalAmount: number;
  status: string;
  orderDate: string;
}

export default function OrderHistoryPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        const query = `*[_type == "order" && userId == "${user.id}"] | order(orderDate desc){
          _id,
          orderId,
          totalAmount,
          status,
          orderDate
        }`;
        const result = await client.fetch(query);
        setOrders(result);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order #{order.orderId}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
                <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                  {order.status}
                </Badge>
              </div>
            </div>
            <Link href={`/orders/${order._id}`} className="mt-2 inline-block">
              <Button variant="link">View Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}