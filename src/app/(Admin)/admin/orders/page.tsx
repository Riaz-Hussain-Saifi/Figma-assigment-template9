"use client"
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  interface Order {
    id: number;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: { id: number; productName: string; quantity: number }[];
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth/signin');
        return;
      }

      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <Button onClick={() => router.push('/products')}>
          Continue Shopping
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">You have no orders yet.</p>
          <Button 
            className="mt-4" 
            onClick={() => router.push('/products')}
          >
            Shop Now
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between">
                    <span>Order #{order.id}</span>
                    <span>{order.status}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <strong>Total Amount:</strong> 
                    ${order.totalAmount.toFixed(2)}
                  </div>
                  <div>
                    <strong>Order Date:</strong> 
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Items:</strong>
                    {order.items.map(item => (
                      <div key={item.id}>
                        {item.productName} (x{item.quantity})
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}