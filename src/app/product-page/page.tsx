"use client"

import * as React from "react"
import { useEffect } from "react"
import { Heart, ShoppingCart, Star, Search, Grid, List } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import Link from "next/link"
import { client } from "../../sanity/lib/client"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  priceWithoutDiscount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  sizes: string[];
  imageUrl: string;
  colors: string[];
}


async function getProducts() {
  try {
    const products = await client.fetch(`
      *[_type == "product"]{
        _id,
        name,
        description,
        price,
        discountPercentage, 
        "priceWithoutDiscount": price * (1 - discountPercentage / 100),
        rating,
        ratingCount,
        colors, 
        tags,
        sizes,
        "imageUrl": image.asset->url
      }[15...21]
    `);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default function ShopPage() {
  const [view, setView] = React.useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = React.useState("best-match")
  const [perPage, setPerPage] = React.useState("15")
  const [products, setProducts] = React.useState<Product[]>([])
  
   useEffect(() => {
    async function fetchData() {
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
    }
    fetchData()
  }, [])


  

  return (
    <div className="">
      {/* Page Header */}
      <div className=" h-[286px] bg-[#F6F5FF] flex items-center py-16">
        <div className="container md:w-[1177px] mx-auto px-4">
          <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">Shop List</h1>
          <div className="flex justify-center text-[#151875] md:justify-start items-center gap-2 text-sm">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/pages">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">Shop List</span>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 container md:w-[1170px]  mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-sm text-[#151875]">Per Page:</span>
            <Select value={perPage} onValueChange={setPerPage}>
              <SelectTrigger className="md:w-[70px]  border-gray-300 text-gray-400">
                <SelectValue placeholder=" " />
              </SelectTrigger>
              <SelectContent  className="bg-white text-[#151875]">
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="45">45</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center ml-2 gap-2 md:gap-4">
            <span className="text-sm text-[#151875]">Sort By:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="md:w-[180px] border-gray-300 text-gray-400">
                <SelectValue placeholder="" />
              </SelectTrigger >
              <SelectContent className="bg-white text-[#151875]">
                <SelectItem value="best-match">Best Match</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("grid")}
              className={view === "grid" ? "text-[#151875]" : "text-[#151875]"}
            >
              <Grid className="h-4 w-4 text-[#151875]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("list")}
              className={view === "list" ? "text-primary" : "text-muted-foreground"}
            >
              <List className="h-4 w-4 text-[#151875]" />
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {products.map((product) => (
            <Card key={product._id} className={`overflow-hidden w-full ${view === "list" ? "md:h-[230px]" : " md:h-[550px] "}`}>
              <Link href={`/product/${product._id}`}>
              <CardContent className={`p-0 ${view === "list" ? "flex" : " "}`}>
                <div className={`${view === "grid" ? "flex justify-center items-center" : " md:w-2/6"}`}>
                  <div className={`${view === "list" ? "  md:w-[200px] mx-auto" : "w-[235px] h-auto"} bg-muted aspect-square overflow-hidden`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className=" object-cover"
                    />
                  </div>
                </div>
                <div className={`${view === "list" ? "w-5/6" : "w-full"} p-4 md:space-y-4`}>
                  <div>
                    <div className="md:flex justify-between md:items-center md:w-[340px]">
                      <h3 className="md:text-xl text-[#151875] font-semibold line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2 md:mt-2 mr-3">
                        {product.colors.map((color) => (
                          <div
                            key={color}
                            className="w-2 h-2 md:w-4 md:h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 ${i < 5
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="md:text-xl font-bold font-heading text-[#151875]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-pink-500 font-heading line-through">
                      ${product.priceWithoutDiscount.toFixed(2)}
                    </span>
                  </div>
                  <p className={`text-muted-foreground ${view === "list" ? "hidden md:block " : " "} `}>{product.description}</p>
                  <div className="flex md:gap-3 transition-all duration-300 ">
                    <Button

                      className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-[#FB2E86] text-[#151875] hover:text-white"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button

                      className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-[#FB2E86] text-[#151875] hover:text-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Link href={`/product/${product._id}`}>
                    <Button

                      className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-[#FB2E86] text-[#151875] hover:text-white"

                    >

                      <Search className="h-4 w-4" />

                    </Button>
                    </Link>
                  </div>

                </div>
              </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>

  )
}

