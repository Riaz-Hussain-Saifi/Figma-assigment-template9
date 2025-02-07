// app/thank-you/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { client } from "@/sanity/lib/client"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const orderData = await client.fetch(`*[_type == "order" && _id == $orderId][0]`, { orderId })
          setOrder(orderData)
        } catch (error) {
          console.error("Error fetching order:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-orange-600">
            Thank You for Your Order!
          </h1>
          
          {order ? (
            <>
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="text-left mb-8">
                <h2 className="text-xl font-bold mb-2">Order Details</h2>
                <div className="space-y-2">
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </div>
              </div>

              <p className="mb-8">
                Your order has been successfully placed. We've sent a confirmation to your email.
              </p>
            </>
          ) : (
            <div className="text-red-500">
              <p>Unable to load order details. Please contact support.</p>
            </div>
          )}

          <Button 
            onClick={() => window.location.href = "/shop"}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}