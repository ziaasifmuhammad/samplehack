import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: Request) {
  try {
    const { cartItems, labelPrice, shippingRate, tax, orderId } = await request.json();

    // Validate cart items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required" },
        { status: 400 }
      );
    }

    // Validate additional costs
    if (
      typeof labelPrice !== "number" ||
      typeof shippingRate !== "number" ||
      typeof tax !== "number"
    ) {
      return NextResponse.json(
        { error: "Label price, shipping rate, and tax must be valid numbers" },
        { status: 400 }
      );
    }

    // Create line items for the Stripe Checkout Session
    const lineItems = [
      // Add cart items
      ...cartItems.map((item: any) => ({
        price_data: {
          currency: "usd", // Change to your preferred currency
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      // Add label price as a separate line item
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Label Price",
          },
          unit_amount: Math.round(labelPrice * 100), // Convert to cents
        },
        quantity: 1,
      },
      // Add shipping cost as a separate line item
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
          },
          unit_amount: Math.round(shippingRate * 100), // Convert to cents
        },
        quantity: 1,
      },
      // Add tax as a separate line item
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Tax",
          },
          unit_amount: Math.round(tax * 100), // Convert to cents
        },
        quantity: 1,
      },
    ];

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/order-completed?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
      metadata: {
        orderId,
      },
    });

    console.log("Stripe Session:", session);

    // Return the session ID and URL to the frontend
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe session" },
      { status: 500 }
    );
  }
}