// app/api/shipengine/getRates/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { from, to, weight, rate_options } = await request.json();

    // Debug: Log the incoming request body
    console.log("Request Body:", { from, to, weight, rate_options });

    // Validate required fields
    if (!from || !to || !weight) {
      return NextResponse.json(
        { error: "from, to, and weight are required" },
        { status: 400 }
      );
    }

    // Validate rate_options and carrier_ids
    if (!rate_options || !rate_options.carrier_ids) {
      return NextResponse.json(
        { error: "rate_options with carrier_ids are required" },
        { status: 400 }
      );
    }

    // Validate ShipEngine API key
    if (!process.env.NEXT_PUBLIC_SHIPENGINE_API_KEY) {
      return NextResponse.json(
        { error: "ShipEngine API key is missing" },
        { status: 500 }
      );
    }

    // Make API call to ShipEngine
    const response = await axios.post(
      "https://api.shipengine.com/v1/rates",
      {
        shipment: {
          service_code: rate_options.service_code || "usps_priority_mail", // Dynamic or default
          ship_to: to,
          ship_from: from,
          packages: [
            {
              weight: {
                value: weight,
                unit: "pound",
              },
            },
          ],
        },
        rate_options, // Include rate_options
      },
      {
        headers: {
          "API-Key": process.env.NEXT_PUBLIC_SHIPENGINE_API_KEY, // Use NEXT_PUBLIC_ prefix
        },
      }
    );

    // Debug: Log the ShipEngine API response
    console.log("ShipEngine API Response:", response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    // Debug: Log the error
    console.error("ShipEngine API Error:", error);

    if (axios.isAxiosError(error)) {
      console.error("ShipEngine API Error Details:", error.response?.data || error.message);
      return NextResponse.json(
        { error: "Failed to fetch shipping rates", details: error.response?.data },
        { status: 500 }
      );
    } else {
      const err = error as Error;
      return NextResponse.json(
        { error: "Failed to fetch shipping rates", details: err.message },
        { status: 500 }
      );
    }
  }
}