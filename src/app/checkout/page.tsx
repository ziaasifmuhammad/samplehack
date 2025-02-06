"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../components/ui/CartProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the form schema using Zod
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  saveInfo: z.boolean().default(false),
});

export default function CheckoutPage() {
  const { cart, subtotal, total } = useCart();
  
  type Rate = {
    rate_id: string;
    service_type: string;
    shipping_amount: { amount: number };
    estimated_delivery_date: string;
  };

  const [rates, setRates] = React.useState<Rate[]>([]);
  const [selectedRate, setSelectedRate] = React.useState<Rate | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      apartment: "",
      city: "",
      country: "",
      postalCode: "",
      saveInfo: false,
    },
  });

  const fetchShippingRates = async () => {
    setIsLoading(true);
    try {
      const carrierIds = [
        process.env.NEXT_PUBLIC_SHIPENGINE_FIRST_CARRIER_ID?.trim()?.replace(/['"]+/g, ""),
        process.env.NEXT_PUBLIC_SHIPENGINE_SECOND_CARRIER_ID?.trim()?.replace(/['"]+/g, ""),
        process.env.NEXT_PUBLIC_SHIPENGINE_THIRD_CARRIER_ID?.trim()?.replace(/['"]+/g, ""),
        process.env.NEXT_PUBLIC_SHIPENGINE_FOURTH_CARRIER_ID?.trim()?.replace(/['"]+/g, ""),
      ].filter(Boolean);

      if (carrierIds.length === 0) {
        toast.error("No valid carrier IDs found.");
        return;
      }

      // Add from, to, and weight details
      const from = {
        name: "Yusra Saleem",
        phone: "+92 3102983718",
        address_line1: "123 Main St",
        city_locality: "Austin",
        state_province: "TX",
        postal_code: "78756",
        country_code: "US",
      };

      const to = {
        name: "Jane Doe",
        phone: "0987654321",
        address_line1: "456 Elm St",
        city_locality: "New York",
        state_province: "NY",
        postal_code: "10001",
        country_code: "US",
      };

      const weight = 1; // Example weight in pounds

      const response = await fetch("/api/shipengine/getRates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          weight,
          rate_options: { carrier_ids: carrierIds },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch shipping rates");
      }

      const data = await response.json();
      console.log("ShipEngine Response:", data);

      if (!data.rate_response?.rates) {
        throw new Error("Invalid response format");
      }

      setRates(data.rate_response.rates);
    } catch (error) {
      console.error("Error fetching shipping rates:", error);
      toast.error(error instanceof Error ? error.message : "Failed to fetch shipping rates.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!selectedRate) {
      toast.error("Please select a shipping rate.");
      return;
    }
  
    const labelPrice = 5.0;
    const shippingRate = selectedRate.shipping_amount.amount;
    const tax = 3.5;
    const totalAmount = subtotal + shippingRate + tax + labelPrice;
  
    try {
      const orderData = {
        firstName: form.getValues("firstName"),
        lastName: form.getValues("lastName"),
        email: form.getValues("email"),
        address: form.getValues("address"),
        apartment: form.getValues("apartment"),
        city: form.getValues("city"),
        country: form.getValues("country"),
        postalCode: form.getValues("postalCode"),
        saveInfo: form.getValues("saveInfo"),
        cartItems: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: subtotal,
        total: totalAmount,
        shippingRate: {
          rateId: selectedRate.rate_id,
          serviceType: selectedRate.service_type,
          cost: selectedRate.shipping_amount.amount,
          estimatedDelivery: selectedRate.estimated_delivery_date,
        },
        shippingLabel: {
          labelId: "label_123", // Add actual label ID
          trackingNumber: "TRKxxxxxxxx", // Add actual tracking number
          labelUrl: "https://example.com/label/123", // Add actual label URL
          labelPrice: 5.0, // Add actual label price
          tax: 3.5, // Add actual tax
          service_type: "UPS", // Add actual service type
          info_date: new Date().toISOString(), // Add actual info date
          shop_fit_owner: "Yusra Saleem", // Add actual shop/fit owner
          translate: false, // Add actual translate value
          validate_to_stress: "No", // Add actual validate to stress value
        },
        trackingStatus: {
          status: "Processing", // Add actual status
          lastUpdated: new Date().toISOString(), // Add actual last updated time
          location: "New York", // Add actual location
          estimatedDelivery: selectedRate.estimated_delivery_date, // Add actual estimated delivery
        },
        paymentDetails: {
          paymentId: "pay_123", // Add actual payment ID
          paymentStatus: "Pending", // Add actual payment status
          paymentMethod: "Credit Card", // Add actual payment method
          amountPaid: totalAmount, // Add actual amount paid
        },
      };
  
      console.log("Order Data to Save:", orderData); // Debugging
  
      // Save order data to Sanity
      const saveOrderResponse = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      if (!saveOrderResponse.ok) {
        throw new Error("Failed to save order.");
      }
  
      const { orderId } = await saveOrderResponse.json();
  
      // Create Stripe session
      const payload = {
        cartItems: orderData.cartItems,
        orderId,
        labelPrice: 5.0,
        shippingRate: selectedRate.shipping_amount.amount,
        tax: 3.5,
      };
  
      console.log("Sending payload to Stripe API:", payload); // Debugging
  
      const stripeResponse = await fetch("/api/checkout-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!stripeResponse.ok) {
        throw new Error("Failed to create Stripe session.");
      }
  
      const { id } = await stripeResponse.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to process checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="h-[286px] bg-[#F6F5FF] flex items-center py-16">
        <div className="container md:w-[1177px] mx-auto px-4">
          <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">
            Hekto Demo
          </h1>
        </div>
      </div>

      <main className="container md:w-[1177px] mx-auto px-4 py-16 sm:px-2 sm:py-8">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-[#101750] md:text-xl">
            Hekto Demo
          </h1>
          <h2 className="mt-4 text-[#101750]">
            Cart/ Information/ Shipping/ Payment
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3 grid-cols-1">
          {/* Shipping Form */}
          <div className="space-y-8 bg-gray-100 lg:col-span-2 px-6 py-16 rounded-[4px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCheckout)}
                className="space-y-8"
              >
                {/* Form Fields */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="border-b-[3px] border-gray-300">
                      <FormControl>
                        <Input
                          placeholder="Email"
                          className="border-none text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="saveInfo"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-600">
                      Keep me up to date on news and excluive offers
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <div>
                  <h2 className="mb-8 text-xl font-bold text-[#101750] sm:text-lg">
                    Shipping Address
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2  ">
                    <FormField
                      control={form.control}
                      name="firstName"
                     
                      render={({ field }) => (
                        <FormItem className="border-b-[3px] border-gray-300 mb-[15px] md:mb-[30px] mt-[8px]">
                          <FormControl>
                            <Input
                              placeholder="First Name"
                              className="border-none text-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="border-b-[3px] border-gray-300 mb-[15px] md:mb-[30px] mt-[8px]">
                          <FormControl>
                            <Input
                              placeholder="Last Name"
                              className="border-none text-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="border-b-[3px] border-gray-300  mb-[15px] md:mb-[30px] mt-[8px]">
                        <FormControl>
                          <Input
                            placeholder="Address"
                            className="border-none text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apartment"
                    render={({ field }) => (
                      <FormItem className="border-b-[3px] border-gray-300 mb-[15px] md:mb-[30px] mt-[8px]">
                        <FormControl>
                          <Input
                            placeholder="Apartment, suite, etc. (optional)"
                            className="border-none text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="border-b-[3px] border-gray-300 mb-[15px] md:mb-[30px] mt-[8px]">
                        <FormControl>
                          <Input
                            placeholder="City"
                            className="border-none text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem className="border-b-[3px] border-gray-300 mb-[15px] md:mb-[30px] mt-[8px]">
                          <FormControl>
                            <Input
                              placeholder="Postal Code"
                              className="border-none text-gray-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="border-b-[3px] border-gray-300  mb-[15px] md:mb-[30px] mt-[8px]">
                          <FormControl>
                            <Input
                              placeholder="Country"
                              className="border-none text-gray-400 "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {/* Shipping Rates */}
                <div>
                  <h2 className="mb-4 text-xl font-bold text-[#101750] sm:text-lg">
                    Shipping Rates
                  </h2>
                  <button
                    type="button"
                    onClick={fetchShippingRates}
                    className="mb-4 bg-pink-500 text-white px-4 py-2 rounded"
                  >
                    Get Shipping Rates
                  </button>
                  {rates.length > 0 && (
                    <div className="space-y-4 grid md:grid-cols-3 gap-4 items-center">
                      {rates.map((rate) => (
                        <div
                          key={rate.rate_id}
                          onClick={() => setSelectedRate(rate)}
                          className={`p-[3px] border rounded cursor-pointer text-center  ${
                            selectedRate?.rate_id === rate.rate_id ? "border-green-500 border-[4px] duration-300 " : "border-gray-300"
                          }`}
                        >
                          <p>{rate.service_type}</p>
                          <p>${rate.shipping_amount.amount}</p>
                          <p>Estimated Delivery: {rate.estimated_delivery_date}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Checkout Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-500 rounded-[6px] font-semibold text-white hover:bg-green-800/90"
                  disabled={!form.formState.isValid || !selectedRate}
                  onClick={handleCheckout}
                >
                  {isLoading ? "Processing..." : "Proceed To Payment"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Cart Summary */}
          <div className="p-8">
            <div className="mb-14 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex border-b pb-4 sm:flex-row items-start sm:items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg bg-white object-cover p-2"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size}, Color: {item.color}
                    </p>
                  </div>
                  <p className="font-medium text-[#101750]">${item.price}</p>
                </div>
              ))}
            </div>

            {/* Cart Totals */}
            <div className="rounded-xl bg-[#F4F4FC] p-6">
              <div className="space-y-4">
                <div className="flex justify-between border-b py-4 text-[#151875] font-heading">
                  <span>Subtotals:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b py-4 text-[#151875] font-heading">
                  <span>Totals:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 py-2">
                 ✅ Shipping & taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}