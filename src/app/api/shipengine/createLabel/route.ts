import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { from, to, weight } = await request.json();

    const response = await axios.post(
      "https://api.shipengine.com/v1/labels",
      {
        shipment: {
          service_code: "usps_priority_mail", // Replace with actual service code
          ship_to: to,
          ship_from: from,
          packages: [
            {
              weight: {
                value: weight.value,
                unit: weight.unit,
              },
            },
          ],
        },
      },
      {
        headers: {
          "API-Key": process.env.NEXT_PUBLIC_SHIPENGINE_API_KEY,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("ShipEngine error:", error);
    return NextResponse.json(
      { error: "Failed to create shipping label" },
      { status: 500 }
    );
  }
}