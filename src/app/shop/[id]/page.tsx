// // app/shop/[id]/page.tsx

// "use client"
// import { useState, useEffect, JSX } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useParams, useRouter } from 'next/navigation';
// import { client } from '@/sanity/lib/client';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { ShoppingCart, Star, Trash } from 'lucide-react';
// import { useUser } from '@clerk/nextjs';
// import { useCart } from '@/context/CartContext';

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   tags: string[];
//   available: boolean;
// }

// interface Review {
//   _id: string;
//   userId: string;
//   userName: string;
//   rating: number;
//   comment: string;
//   _createdAt: string;
// }

// export default function ProductDetailPage(): JSX.Element {
//   const params = useParams();
//   const router = useRouter();
//   const { user } = useUser();
//   const { addToCart } = useCart();
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [newReview, setNewReview] = useState({
//     rating: 0,
//     comment: ''
//   });
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const productQuery = `*[_type == "food" && id == ${params.id}][0]{
//           id, name, description, price, "image": image.asset->url,
//           category, tags, available
//         }`;
//         const productData = await client.fetch(productQuery);
//         setProduct(productData);

//         if (productData) {
//           const relatedQuery = `*[_type == "food" && category == "${productData.category}" && id != ${params.id}][0...4]{
//             id, name, price, "image": image.asset->url, available
//           }`;
//           const relatedData = await client.fetch(relatedQuery);
//           setRelatedProducts(relatedData);
//         }

//         const reviewsQuery = `*[_type == "review" && productId == "${params.id}"] | order(_createdAt desc)`;
//         const reviewsData = await client.fetch(reviewsQuery);
//         setReviews(reviewsData);
//       } catch (error) {
//         console.error('Error:', error);
//         setError('Failed to load product data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.id) fetchProductData();
//   }, [params.id]);

//   const handleReviewSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSubmitting(true);

//     if (!user || !product) {
//       router.push('/sign-in');
//       return;
//     }

//     try {
//       const reviewDoc = {
//         _type: 'review',
//         productId: product.id.toString(),
//         userId: user.id,
//         userName: user.fullName || user.username || 'Anonymous',
//         rating: newReview.rating,
//         comment: newReview.comment,
//         _createdAt: new Date().toISOString()
//       };

//       const response = await client.create(reviewDoc);
//       setReviews([{ ...reviewDoc, _id: response._id }, ...reviews]);
//       setNewReview({ rating: 0, comment: '' });
//       setIsReviewModalOpen(false);
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       setError('Failed to submit review. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteReview = async (reviewId: string) => {
//     if (!user || !window.confirm('Are you sure you want to delete this review?')) return;
    
//     try {
//       await client.delete(reviewId);
//       setReviews(reviews.filter(review => review._id !== reviewId));
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       setError('Failed to delete review');
//     }
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
//     </div>
//   );

//   if (!product) return (
//     <div className="container mx-auto px-4 py-8 text-center">
//       <h1 className="text-2xl font-bold mb-4">Product not found</h1>
//       <Link href="/shop">
//         <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
//           Return to Shop
//         </Button>
//       </Link>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
//           {error}
//         </div>
//       )}

//       {/* Product Details */}
//       <div className="grid md:grid-cols-2 gap-8 mb-12">
//         <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg">
//           <Image
//             src={product.image}
//             alt={product.name}
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, 50vw"
//             priority
//           />
//         </div>

//         <div className="space-y-6">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
//             <p className="text-gray-600 text-lg">{product.description}</p>
//           </div>

//           <div className="flex items-center gap-4">
//             <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               ${product.price}
//             </span>
//             <Badge className={`${product.available ? 'bg-green-600' : 'bg-red-600'} text-white`}>
//               {product.available ? "In Stock" : "Out of Stock"}
//             </Badge>
//           </div>

//           <div className="flex items-center gap-4">
//             <Button
//               variant="outline"
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-12 w-12 text-xl"
//             >
//               -
//             </Button>
//             <Input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
//               className="w-20 text-center border-2 border-blue-600 h-12 text-xl"
//             />
//             <Button
//               variant="outline"
//               onClick={() => setQuantity(quantity + 1)}
//               className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-12 w-12 text-xl"
//             >
//               +
//             </Button>
//           </div>

//           <Button
//             onClick={() => user ? addToCart({
//               id: product.id,
//               name: product.name,
//               price: product.price,
//               image: product.image,
//               quantity
//             }) : router.push('/sign-in')}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 text-lg"
//           >
//             <ShoppingCart className="w-6 h-6 mr-2" />
//             Add to Cart
//           </Button>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mb-12">
//         <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
//           <h2 className="text-3xl font-bold text-gray-900">
//             Customer Reviews ({reviews.length})
//           </h2>
//           <Button 
//             onClick={() => user ? setIsReviewModalOpen(true) : router.push('/sign-in')}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
//           >
//             {user ? 'Write a Review' : 'Sign in to Review'}
//           </Button>
//         </div>

//         <div className="space-y-6">
//           {reviews.map((review) => (
//             <div key={review._id} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h4 className="font-bold text-gray-900 text-lg">{review.userName}</h4>
//                   <div className="flex gap-1 mt-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-6 h-6 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <span className="text-sm text-gray-500">
//                   {new Date(review._createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//               <p className="text-gray-700 mb-4">{review.comment}</p>
//               {user?.id === review.userId && (
//                 <button
//                   onClick={() => handleDeleteReview(review._id)}
//                   className="text-red-500 hover:text-red-600 flex items-center gap-1"
//                 >
//                   <Trash className="w-5 h-5" />
//                   <span className="text-sm">Delete</span>
//                 </button>
//               )}
//             </div>
//           ))}

//           {reviews.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-500 text-lg">
//                 No reviews yet. Be the first to review this product! 🌟
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <div className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((relatedProduct) => (
//               <Link
//                 key={relatedProduct.id}
//                 href={`/shop/${relatedProduct.id}`}
//                 className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
//               >
//                 <div className="relative aspect-square bg-gray-100">
//                   <Image
//                     src={relatedProduct.image}
//                     alt={relatedProduct.name}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 text-lg mb-2">
//                     {relatedProduct.name}
//                   </h3>
//                   <div className="flex justify-between items-center">
//                     <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                       ${relatedProduct.price}
//                     </span>
//                     <Badge className={`${relatedProduct.available ? 'bg-green-600' : 'bg-red-600'} text-white`}>
//                       {relatedProduct.available ? "In Stock" : "Out"}
//                     </Badge>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Review Modal */}
//       <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
//         <DialogContent className="sm:max-w-[500px] rounded-xl bg-gradient-to-br from-blue-50 to-purple-50">
//           <DialogHeader>
//             <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Write a Review
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleReviewSubmit} className="space-y-6">
//             <div className="flex gap-2 justify-center">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Button
//                   key={star}
//                   type="button"
//                   variant="ghost"
//                   onClick={() => setNewReview({ ...newReview, rating: star })}
//                   className={`p-0 w-14 h-14 rounded-full ${newReview.rating >= star ? 'bg-yellow-100' : 'bg-gray-100'} hover:bg-yellow-100`}
//                 >
//                   <Star
//                     className={`w-8 h-8 ${newReview.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
//                   />
//                 </Button>
//               ))}
//             </div>
//             <Textarea
//               placeholder="Share your experience with this product..."
//               value={newReview.comment}
//               onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//               className="min-h-[150px] text-lg border-2 border-blue-200 focus:border-blue-600"
//               required
//             />
//             <Button 
//               type="submit" 
//               className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
//               disabled={submitting || newReview.rating === 0}
//             >
//               {submitting ? 'Submitting...' : 'Submit Review ✨'}
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }






"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShoppingCart, Star, Edit, Trash } from "lucide-react"
import { useCart } from "@/context/CartContext"
import Link from "next/link"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  tags: string[]
  available: boolean
}

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

// Simulated user authentication
const currentUserId = "user123" // In a real app, this would come from your auth system

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    comment: "",
  })
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productQuery = `*[_type == "food" && id == ${params.id}][0]{
          id, name, description, price, "image": image.asset->url,
          category, tags, available
        }`
        const productData = await client.fetch(productQuery)
        setProduct(productData)

        if (productData) {
          const relatedQuery = `*[_type == "food" && category == "${productData.category}" && id != ${params.id}][0...4]{
            id, name, price, "image": image.asset->url, available
          }`
          const relatedData = await client.fetch(relatedQuery)
          setRelatedProducts(relatedData)
        }

        // Load reviews from local storage
        const storedReviews = localStorage.getItem(`reviews-${params.id}`)
        if (storedReviews) {
          setReviews(JSON.parse(storedReviews))
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProductData()
    }
  }, [params.id])

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const reviewToSave: Review = editingReview
      ? {
          ...editingReview,
          userName: newReview.userName || editingReview.userName,
          rating: newReview.rating || editingReview.rating,
          comment: newReview.comment || editingReview.comment,
        }
      : {
          id: Date.now().toString(),
          userId: currentUserId,
          userName: newReview.userName || "Anonymous",
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: new Date().toISOString(),
        }

    const updatedReviews = editingReview
      ? reviews.map((r) => (r.id === editingReview.id ? reviewToSave : r))
      : [reviewToSave, ...reviews]

    setReviews(updatedReviews)

    // Save to local storage
    localStorage.setItem(`reviews-${params.id}`, JSON.stringify(updatedReviews))

    setNewReview({ userName: "", rating: 0, comment: "" })
    setIsReviewModalOpen(false)
    setEditingReview(null)
    setSubmitting(false)
  }

  const handleEditReview = (review: Review) => {
    setEditingReview(review)
    setNewReview({
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
    })
    setIsReviewModalOpen(true)
  }

  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = reviews.filter((r) => r.id !== reviewId)
    setReviews(updatedReviews)
    localStorage.setItem(`reviews-${params.id}`, JSON.stringify(updatedReviews))
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      })
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-orange-600">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-orange-500">${product.price}</span>
            <Badge variant={product.available ? "default" : "destructive"} className="text-lg py-1 px-3">
              {product.available ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-orange-500 border-orange-500 hover:bg-orange-100"
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value)))}
              className="w-20 text-center"
            />
            <Button
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
              className="text-orange-500 border-orange-500 hover:bg-orange-100"
            >
              +
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!product.available}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-orange-600">Customer Reviews</h2>
          <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                {editingReview ? "Edit Review" : "Write a Review"}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-orange-50">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-orange-600">
                  {editingReview ? "Edit Your Review" : "Write a Review"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  className="border-orange-300 focus:border-orange-500"
                />
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      variant={newReview.rating >= star ? "default" : "outline"}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className={
                        newReview.rating >= star ? "bg-orange-500 text-white" : "text-orange-500 border-orange-500"
                      }
                    >
                      <Star className="w-6 h-6" />
                    </Button>
                  ))}
                </div>
                <Textarea
                  placeholder="Write your review here..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                  className="border-orange-300 focus:border-orange-500"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {submitting ? "Submitting..." : editingReview ? "Update Review" : "Submit Review"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-orange-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-orange-600 text-lg">{review.userName}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                {review.userId === currentUserId && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleEditReview(review)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()} at {new Date(review.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/shop/${relatedProduct.id}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-orange-500">${relatedProduct.price}</span>
                    <Badge variant={relatedProduct.available ? "default" : "destructive"}>
                      {relatedProduct.available ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

