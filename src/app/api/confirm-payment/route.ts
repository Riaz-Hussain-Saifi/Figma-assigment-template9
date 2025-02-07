// src/app/api/confirm-payment/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { client } from "@/sanity/lib/client"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const paymentIntentId = searchParams.get("payment_intent")

  if (!paymentIntentId) {
    return NextResponse.json({ error: "Missing payment_intent" }, { status: 400 })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const orderId = paymentIntent.metadata.orderId

    if (orderId) {
      if (paymentIntent.status === "succeeded") {
        await client.patch(orderId).set({ status: "completed", paidAt: new Date().toISOString() }).commit()

        return NextResponse.json({ success: true })
      } else {
        await client.patch(orderId).set({ status: "failed", failedAt: new Date().toISOString() }).commit()

        return NextResponse.json({ success: false, error: "Payment failed" })
      }
    }

    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  } catch (error) {
    console.error("Error confirming payment:", error)
    return NextResponse.json({ error: "Error confirming payment" }, { status: 500 })
  }
}




