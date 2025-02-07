// src/app/admin/statistics/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Order {
  _id: string;
  totalAmount: number;
  orderDate: string;
  status: string;
}

export default function StatisticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && (user?.publicMetadata as any)?.role !== "admin") {
      router.push("/");
    }
  }, [user, isLoaded]);

  useEffect(() => {
    const fetchOrders = async () => {
      const query = `*[_type == "order"]{
        _id,
        totalAmount,
        orderDate,
        status
      }`;
      const result = await client.fetch(query);
      setOrders(result);
    };
    fetchOrders();
  }, []);

  const processData = (data: Order[], groupBy: (date: Date) => string | number) => {
    return Object.entries(
      data.reduce((acc, order) => {
        const key = groupBy(new Date(order.orderDate));
        acc[key] = (acc[key] || 0) + order.totalAmount;
        return acc;
      }, {} as { [key: string | number]: number })
    ).map(([name, value]) => ({ name, value }));
  };

  const monthlySales = processData(orders, (date) =>
    date.toLocaleString('default', { month: 'long' })
  );

  const dailySales = processData(orders, (date) =>
    date.toLocaleDateString()
  );

  const yearlySales = processData(orders, (date) =>
    date.getFullYear()
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Sales Statistics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Sales</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySales}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Yearly Sales</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlySales}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}