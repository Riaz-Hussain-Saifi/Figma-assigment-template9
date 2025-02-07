// src/app/admin/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/admindashbord/product-grid"; // Corrected import path
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/product-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Corrected import path

// Product Management Page
export default function ProductsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    if (isLoaded && (user?.publicMetadata as any)?.role !== "admin") {
      router.push("/");
    }
  }, [user, isLoaded, router]); // Added router to dependency array

  const fetchProducts = async () => {
    const query = `*[_type == "food"] | order(_createdAt desc) {
      _id,
      name,
      description,
      price,
      originalPrice,
      "image": image.asset->url,
      category,
      tags,
      available,
      _createdAt
    }`;
    const result = await client.fetch(query);
    setProducts(result);
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await client.delete(id);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Product Management</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64"
          />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={() => { setSelectedProduct(null); setIsOpen(true); }}>Add New Product</Button> {/* Ensure dialog opens */}
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct ? "Edit Product" : "Create New Product"}
                </DialogTitle>
              </DialogHeader>
              <ProductForm
                initialData={selectedProduct}
                onSuccess={() => {
                  setIsOpen(false);
                  fetchProducts();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Available Products</h3>
          <p className="text-3xl font-bold">
            {products.filter(p => p.available).length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <p className="text-3xl font-bold">
            {[...new Set(products.map(p => p.category))].length}
          </p>
        </Card>
      </div>

      <ProductGrid
        products={filteredProducts}
        onDelete={deleteProduct}
        onEdit={(product) => {
          setSelectedProduct(product);
          setIsOpen(true);
        }}
      />
    </div>
  );
}