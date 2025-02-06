// app/api/order/route.ts
import { NextResponse } from "next/server";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false, // Set to true for production
});

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // Add _type field to orderData and nested objects
    const dataToSave = {
      _type: 'order', // Add _type for the order document
      ...orderData,
      cartItems: orderData.cartItems.map((item: any) => ({
        _type: 'cartItem', // Add _type for each cart item
        ...item,
      })),
      shippingRate: {
        _type: 'shippingRate', // Add _type for shippingRate
        ...orderData.shippingRate,
      },
      trackingStatus: {
        _type: 'trackingStatus', // Add _type for trackingStatus
        ...orderData.trackingStatus,
      },
      paymentDetails: {
        _type: 'paymentDetails', // Add _type for paymentDetails
        ...orderData.paymentDetails,
      },
    };

    // Save order data to Sanity
    const result = await client.create(dataToSave);

    return NextResponse.json({ orderId: result._id });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json(
      { error: "Failed to save order", details: error },
      { status: 500 }
    );
  }
}