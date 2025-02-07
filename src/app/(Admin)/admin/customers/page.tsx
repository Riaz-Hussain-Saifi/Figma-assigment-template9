// src/app/admin/customers/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Customer {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  profileImage: string;
  orders: { _id: string }[];
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && (user?.publicMetadata as any)?.role !== "admin") {
      router.push("/");
    }
  }, [user, isLoaded]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const query = `*[_type == "userProfile"]{
        _id,
        username,
        email,
        fullName,
        "profileImage": profileImage.asset->url,
        "orders": count(orders)
      }`;
      const result = await client.fetch(query);
      setCustomers(result);
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Customers</h1>
        <Input
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer._id}>
            <CardHeader>
              <CardTitle>{customer.fullName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <img
                src={customer.profileImage}
                alt={customer.fullName}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <p className="text-center">{customer.email}</p>
              <p className="text-center text-sm text-gray-500">
                @{customer.username}
              </p>
              <div className="text-center mt-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {customer.orders} Orders
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}