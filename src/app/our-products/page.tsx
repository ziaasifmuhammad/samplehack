"use client";

import * as React from "react";
import { Heart, ShoppingCart, Star, Search, Grid, List } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Separator } from "../../components/ui/separator";
import { Slider } from "../../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import Link from "next/link";
import { client } from "../../sanity/lib/client";

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
  brand: string;
  category: string;
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
        tags,
        sizes,
        "imageUrl": image.asset->url,
        colors,
        brand,
        category,
      }
    `);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default function ShopPage() {
  const [view, setView] = React.useState<"grid" | "list">("list");
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = React.useState<string[]>([]);
  const [selectedRating, setSelectedRating] = React.useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState("best-match");
  const [perPage, setPerPage] = React.useState("15");
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesDiscount =
      selectedDiscounts.length === 0 ||
      selectedDiscounts.some((discount) => {
        if (discount === "20% Cashback") return product.discountPercentage >= 20;
        if (discount === "5% Cashback Offer") return product.discountPercentage >= 5;
        if (discount === "25% Discount Offer") return product.discountPercentage >= 25;
        return false;
      });
    const matchesRating = selectedRating ? product.rating >= parseInt(selectedRating) : true;
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesColor = selectedColors.length === 0 || selectedColors.some((color) => product.colors.includes(color));
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return (
      matchesBrand &&
      matchesDiscount &&
      matchesRating &&
      matchesCategory &&
      matchesColor &&
      matchesPrice
    );
  });

  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-low-high") return a.price - b.price;
      if (sortBy === "price-high-low") return b.price - a.price;
      return 0;
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="">
      {/* Page Header */}
      <div className="h-[286px] bg-[#F6F5FF] flex items-center py-16">
        <div className="container md:w-[1170px] mx-auto px-4">
          <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">Shop Left sidebar</h1>
          <div className="flex justify-center text-[#151875] md:justify-start items-center gap-2 text-sm">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/pages">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">Shop Left Sidebar</span>
          </div>
        </div>
      </div>

      <div className="flex md:w-[1170px] my-8 mx-auto flex-col md:flex-row gap-8 p-2">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-6 p-2 ">
          {/* Brand Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#151875] underline mb-4">Product Brand</h3>
            <div className="space-y-2 text-gray-400">
              {["Coaster Furniture", "Fusion Dot High Fashion", "Unique Furnitture Resto", "Dream Furnitture Flipping", "Young Repurposed", "Green DIY furniture"].map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBrands([...selectedBrands, brand]);
                      } else {
                        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                      }
                    }}
                  />
                  <Label htmlFor={brand}>{brand}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Discount Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#151875] underline mb-4">Discount Offer</h3>
            <div className="space-y-2 text-gray-400">
              {["20% Cashback", "5% Cashback Offer", "25% Discount Offer"].map((discount) => (
                <div key={discount} className="flex items-center space-x-2">
                  <Checkbox
                    id={discount}
                    checked={selectedDiscounts.includes(discount)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedDiscounts([...selectedDiscounts, discount]);
                      } else {
                        setSelectedDiscounts(selectedDiscounts.filter((d) => d !== discount));
                      }
                    }}
                  />
                  <Label htmlFor={discount}>{discount}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Rating Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#151875] underline mb-4">Rating Item</h3>
            <RadioGroup value={selectedRating || ""} onValueChange={setSelectedRating}>
              {[5, 4, 3].map((rating) => (
                <div key={rating} className="flex items-center text-gray-400 space-x-2">
                  <RadioGroupItem value={rating.toString()} id={`r${rating}`} />
                  <Label htmlFor={`r${rating}`} className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2">({rating === 5 ? "2345" : rating === 4 ? "1234" : "543"})</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Category Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#151875] underline mb-4">Categories</h3>
            <div className="space-y-2 text-gray-400">
              {["Chair" , "Sofa"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category]);
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category));
                      }
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#151875] underline mb-4">Price Filter</h3>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={10}
              className="w-[90%]"
            />
            <div className="mt-2 text-sm text-slate-800">
              ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>

          <Separator />

          {/* Color Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#151875] underline mb-4">Filter By Color</h3>
            <div className="flex flex-wrap gap-2">
              {["#FF8CB8", "#FFC93E", "#7C4AFF", "#41D37E", "#FB7DA9", "#6DCEF5"].map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedColors.includes(color) ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    if (selectedColors.includes(color)) {
                      setSelectedColors(selectedColors.filter((c) => c !== color));
                    } else {
                      setSelectedColors([...selectedColors, color]);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-sm text-[#151875]">Per Page:</span>
              <Select value={perPage} onValueChange={setPerPage}>
                <SelectTrigger className="md:w-[70px] border-gray-300 text-gray-400">
                  <SelectValue placeholder=" " />
                </SelectTrigger>
                <SelectContent>
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
                </SelectTrigger>
                <SelectContent>
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
                className={view === "list" ? "text-[#151875]" : "text-[#151875]"}
              >
                <List className="h-4 w-4 text-[#151875]" />
              </Button>
            </div>
          </div>

          {/* Product List */}
          <div className={`grid gap-6 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {sortedProducts.map((product) => (
              <Card key={product._id} className={`overflow-hidden w-full ${view === "list" ? "md:h-[230px]" : "md:h-[550px]"}`}>
                <Link href={`/product/${product._id}`}>
                <CardContent className={`p-0 ${view === "list" ? "flex" : ""}`}>
                  <div className={`${view === "grid" ? "flex justify-center items-center" : "md:w-2/6 h-full"}`}>
                    <div className={`${view === "list" ? "w-full h-full" : "w-[235px] h-auto"} bg-muted aspect-square overflow-hidden`}>
                      <img src={product.imageUrl} alt={product.name} className="object-cover" />
                    </div>
                  </div>
                  <div className={`${view === "list" ? "w-5/6" : "w-full"} p-4 md:space-y-4`}>
                    <div>
                      <div className="md:flex justify-between md:items-center md:w-[340px]">
                        <h3 className="md:text-xl text-[#151875] font-heading font-bold">{product.name}</h3>
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
                            className={`w-3 h-3 md:w-4 md:h-4 ${
                              i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="md:text-xl font-bold text-[#151875] font-heading">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm font-heading text-pink-500 line-through">
                        ${product.priceWithoutDiscount.toFixed(2)}
                      </span>
                    </div>
                    <p className={`text-muted-foreground ${view === "list" ? "hidden md:block" : ""}`}>
                      {product.description}
                    </p>
                    <div className="hidden md:flex md:gap-3 transition-all duration-300">
                      <Button className="h-8 w-8 rounded-full bg-white shadow-md text-[#151875] hover:bg-[#FB2E86] hover:text-white">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button className="h-8 w-8 rounded-full bg-white shadow-md text-[#151875] hover:bg-[#FB2E86] hover:text-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Link href={`/product/${product._id}`}>
                      <Button className="h-8 w-8 rounded-full bg-white shadow-md text-[#151875] hover:bg-[#FB2E86] hover:text-white">
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
    </div>
  );
}