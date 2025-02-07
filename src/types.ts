export interface CartItem {
    id: number | string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
  }


  // src/types.ts
export interface Product {
    _id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    image: string
    category: string
    tags: string[]
    available: boolean
    _createdAt?: string
  }