// app/payment/[orderId]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { client } from "@/sanity/lib/client"

export default function PaymentPage() {
  const router = useRouter()
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    phoneNumber: ''
  })
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await client.fetch(`*[_type == "order" && _id == $orderId][0]`, { orderId })
        setOrder(orderData)
      } catch (err) {
        console.error("Error fetching order:", err)
        setError("Failed to load order details")
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError('')

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Update order status in Sanity
      await client
        .patch(orderId)
        .set({ status: 'completed' })
        .commit()

      // Redirect to thank you page
      router.push(`/thank-you?orderId=${orderId}`)
    } catch (err) {
      console.error("Payment error:", err)
      setError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!order) {
    return <div className="container mx-auto px-4 py-8">Loading order details...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-600">Payment</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="capitalize">{order.paymentMethod}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
          
          {/* Payment Method Selector */}
          <div className="flex gap-4 mb-6">
            <Button
              type="button"
              variant={selectedMethod === 'card' ? 'default' : 'outline'}
              onClick={() => setSelectedMethod('card')}
              className="flex-1"
            >
              Credit Card
            </Button>
            <Button
              type="button"
              variant={selectedMethod === 'jazzcash' ? 'default' : 'outline'}
              onClick={() => setSelectedMethod('jazzcash')}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              JazzCash
            </Button>
            <Button
              type="button"
              variant={selectedMethod === 'easypesa' ? 'default' : 'outline'}
              onClick={() => setSelectedMethod('easypesa')}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              EasyPesa
            </Button>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            {selectedMethod === 'card' ? (
              <>
                <Input
                  placeholder="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/YY"
                    value={paymentDetails.expiry}
                    onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="CVC"
                    value={paymentDetails.cvc}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cvc: e.target.value})}
                    required
                  />
                </div>
              </>
            ) : (
              <Input
                placeholder="Phone Number"
                value={paymentDetails.phoneNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, phoneNumber: e.target.value})}
                required
              />
            )}

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isProcessing ? 'Processing Payment...' : 'Pay Now'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}