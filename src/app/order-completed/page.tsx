"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import { BrandLogos } from "../../components/ui/brand-logos";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "../../sanity/lib/client"; 

// Define TypeScript types
interface OrderDetails {
  orderId: string;
  shippingAddress: string;
  deliveryStatus: string;
}

interface TrackingDetails {
  trackingNumber: string;
  estimatedDelivery: string;
  status: string;
  labelUrl: string;
}

interface OrderParamsHandlerProps {
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetails | null>>;
  setTrackingDetails: React.Dispatch<React.SetStateAction<TrackingDetails>>;
}

// Separate component for `useSearchParams()`
function OrderParamsHandler({ setOrderDetails, setTrackingDetails }: OrderParamsHandlerProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId") || "";

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderDetails = async () => {
      try {
        const order = await client.fetch<{
          _id: string;
          address: string;
          city: string;
          country: string;
          postalCode: string;
          trackingStatus?: { status?: string; estimatedDelivery?: string };
          shippingLabel?: { trackingNumber?: string; labelUrl?: string };
        }>(
          `*[_type == "order" && _id == $orderId][0]`,
          { orderId }
        );

        if (!order) {
          throw new Error("Order not found");
        }

        setOrderDetails({
          orderId: order._id,
          shippingAddress: `${order.address}, ${order.city}, ${order.country}, ${order.postalCode}`,
          deliveryStatus: order.trackingStatus?.status || "Processing",
        });

        setTrackingDetails({
          trackingNumber: order.shippingLabel?.trackingNumber || "",
          estimatedDelivery: order.trackingStatus?.estimatedDelivery || "",
          status: order.trackingStatus?.status || "",
          labelUrl: order.shippingLabel?.labelUrl || "",
        });

      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Failed to fetch order details. Please try again.");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return null; // This component only fetches data, no UI needed
}

export default function OrderCompletedPage() {
  const [trackingDetails, setTrackingDetails] = useState<TrackingDetails>({
    trackingNumber: "",
    estimatedDelivery: "",
    status: "",
    labelUrl: "",
  });

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="h-[286px] bg-[#F6F5FF] flex items-center py-16">
          <div className="container md:w-[1177px] mx-auto px-4">
            <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">
              Order Completed
            </h1>
          </div>
        </div>

        <div className="container md:w-[1177px] mx-auto md:py-[200px] px-4 py-16">
          <Suspense fallback={<p>Loading order details...</p>}>
            <OrderParamsHandler setOrderDetails={setOrderDetails} setTrackingDetails={setTrackingDetails} />
          </Suspense>

          {orderDetails && (
            <div className="text-center">
              <h2 className="text-[36px] font-bold text-[#151875] mb-8">
                Your Order Is Completed!
              </h2>
              <p className="text-[#8D92A7] text-base mb-8">
                Thank you for your order! Your order is being processed. You will receive an email confirmation when your order is completed.
              </p>
              <span className="block font-heading text-[#151875dc] mb-8">

              <p>Order ID: {orderDetails.orderId}</p>
              <p>Shipping Address: {orderDetails.shippingAddress}</p>
              <p>Delivery Status: {orderDetails.deliveryStatus}</p>
              

              {trackingDetails.trackingNumber && <p>Tracking Number: {trackingDetails.trackingNumber}</p>}
              {trackingDetails.estimatedDelivery && <p>Estimated Delivery: {trackingDetails.estimatedDelivery}</p>}
              {trackingDetails.status && <p>Status: {trackingDetails.status}</p>}

              {/* {trackingDetails.labelUrl && (
                <Button asChild className="bg-[#FF1788] text-white px-8 h-12 rounded-sm">
                  <a href={trackingDetails.labelUrl} download="shipping_label.pdf">
                    Download Shipping Label
                  </a>
                </Button>
              )} */}
                </span>
              <Button asChild className="bg-[#FF1788] text-white px-8 h-12 rounded-sm">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          )}
        </div>

        <BrandLogos />
      </main>
    </div>
  );
}
