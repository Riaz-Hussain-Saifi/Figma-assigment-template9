// src/components/product-form.tsx
"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/config/products";

export function ProductForm({ onSuccess, initialData }: any) {
  const [formData, setFormData] = useState<any>(initialData || {});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleImageUpload = async () => {
    if (!imageFile) return;
    
    setUploading(true);
    try {
      const asset = await client.assets.upload('image', imageFile);
      return asset.url;
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await handleImageUpload();
      }

      const productData = {
        _type: "food",
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        category: formData.category,
        tags: formData.tags?.split(",") || [],
        available: formData.available === "true",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageUrl?.split("-").pop()?.split(".")[0],
          },
        },
      };

      if (initialData?._id) {
        await client
          .patch(initialData._id)
          .set(productData)
          .commit();
      } else {
        await client.create(productData);
      }

      onSuccess();
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Product Name</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select
            value={formData.category || ""}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Price ($)</Label>
          <Input
            type="number"
            value={formData.price || ""}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Original Price ($)</Label>
          <Input
            type="number"
            value={formData.originalPrice || ""}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Tags (comma separated)</Label>
          <Input
            value={formData.tags?.join(",") || ""}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div>
          <Label>Availability</Label>
          <Select
            value={formData.available?.toString() || "true"}
            onValueChange={(value) => setFormData({ ...formData, available: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Product Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={uploading}>
        {uploading ? "Uploading..." : initialData?._id ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}