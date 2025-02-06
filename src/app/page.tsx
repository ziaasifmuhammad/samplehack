import Hero  from "../components/hero"
import {FeaturedProducts } from "../components/featured-products"
import { LatestProducts } from "../components/latest-products"
import  { WhatShopexOffers}  from "../components/what-shopex-offers"
import { DiscountSection } from "../components/discount-section"
import { TrendingProducts } from "../components/ui/trending-products"
import { TopCategories } from "../components/top-categories"
import  {NewsletterSection } from "../components/newsletter-section"
import { Button } from "../components/ui/button"
import { SectionHeader } from "../components/ui/section-header"


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <FeaturedProducts />
        <LatestProducts />
        <WhatShopexOffers />
        
      {/* Unique Features */}
      <section className="py-16 bg-gray-100">
        <div className="container md:w-[1177px] mx-auto flex justify-center px-6 ">
          <div className="grid gap-8  justify-center lg:grid-cols-2">
            <div className="relative">
              <img
                src="/images/sofa-b.png"
                alt="Featured Chair"
                className="w-full rounded-full p-8"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold text-[#151875]">
                Unique Features Of leatest & Trending Products
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#F52B70]" />
                  All frames constructed with hardwood solids and laminates
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#2B2BF5]" />
                  Reinforced with double wood dowels, glue, screw - nails corner blocks
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#2BF5CC]" />
                  Arms, backs and seats are structurally reinforced
                </li>
              </ul>
              <div className="mt-8 space-x-4">
                <Button className="bg-[#FB2E86] hover:bg-[#FB2E86]/90">
                  Add To Cart
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
        <DiscountSection />
        <TrendingProducts />
        <TopCategories />
        <NewsletterSection />
       {/* Latest Blog */}
<section className="py-16">
  <div className="container px-4 mx-auto max-w-[1177px]">
    <SectionHeader title="Latest Blog" />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((blog) => (
        <div key={blog} className="group cursor-pointer">
          <img
            src={`/images/blog-p1.png`}
            alt={`Blog ${blog}`}
            className="mb-4 w-full rounded-lg"
          />
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>By Admin</span>
              <span>December 12, 2023</span>
            </div>
            <h3 className="text-lg font-bold text-[#151875] group-hover:text-[#FB2E86]">
              Top essential Trends in 2023
            </h3>
            <p className="text-gray-600">
              More off this less hello samlande lied much over tightly circa
              horse taped mightly
            </p>
            <Button variant="link" className="p-0 text-[#FB2E86]">
              Read More
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      </main>
    </div>
  )
}

