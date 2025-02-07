import { NextResponse } from "next/server"
import { headers } from "next/headers"
import stripe from "@/lib/stripe"
import { client } from "@/sanity/lib/client"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("Stripe-Signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as any
      const orderId = session.metadata.orderId

      if (orderId) {
        await client
          .patch(orderId)
          .set({
            status: "completed",
            paidAt: new Date().toISOString(),
            paymentIntentId: session.payment_intent,
          })
          .commit()
      }
      break

    case "payment_intent.payment_failed":
      const paymentIntent = event.data.object as any
      const failedOrderId = paymentIntent.metadata.orderId

      if (failedOrderId) {
        await client
          .patch(failedOrderId)
          .set({
            status: "failed",
            failedAt: new Date().toISOString(),
          })
          .commit()
      }
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

