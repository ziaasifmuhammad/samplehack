"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

import { BrandLogos } from "@/components/ui/brand-logos";


export default function AccountPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#F6F5FF] h-[289px] flex items-center justify-center md:justiify-start py-16">
        <div className="container   lg:w-[1177px] mx-auto px-4">
          <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">My Account</h1>
          <div className="flex justify-center text-[#151875] md:justify-start items-center gap-2 text-sm">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/pages">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">My Account</span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="container  mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border bg-white p-8 shadow-md">
            <h2 className="text-2xl font-bold text-[#151875] mb-4">Login</h2>
            <p className="text-gray-600 mb-6">
              Please login using account detail bellow.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email Address"
                required
                className="bg-white"
              />
              <Input
                type="password"
                placeholder="Password"
                required
                className="bg-white"
              />
              <div className="flex items-center justify-between">
                <Link
                  href="/account/forgot-password"
                  className="text-sm text-gray-600 hover:text-[#FB2E86]"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FB2E86] text-white hover:bg-[#FB2E86]/90"
              >
                Sign In
              </Button>
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don&apos;t have an Account?{" "}
                  <Link
                    href="/account/register"
                    className="text-[#FB2E86] hover:underline"
                  >
                    Create account
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <BrandLogos />
    </div>
  )
}

