"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from "../../../components/ui/StarRating";
import CartProvider, { useCart } from "../../../components/ui/CartProvider";
import ReviewForm from "../../../components/ui/ReviewForm";
import { BrandLogos } from "../../../components/ui/brand-logos";
import { client } from "../../../sanity/lib/client";
import { useWishlist } from "../../../components/ui/WishListProvide";
import { ProductGallery } from "../../../components/ui/product-gallery";
import { Button } from "../../../components/ui/button";
import { ProductCard } from "../../../components/ui/product-card-home";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  priceWithoutDiscount: number;
  stockLevel: number;
  imageUrl: string;
  tags: string[];
  sizes: string[];
  colors: string[];
  category: string;
  isFeaturedProduct: boolean;
  additionalImages?: string[]; // Add this line
  additionalDescription?: string; // Add this line
  additionalInfo?: string; // Add this line
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = product ? isInWishlist(product._id) : false;
  const [reviews, setReviews] = useState<Review[]>([]);


  // Fetch reviews from Sanity
  const fetchReviews = async () => {
    const reviewData = await client.fetch(
      `*[_type == "review" && productId._ref == $id]{
        _id,
        name,
        rating,
        comment,
        date
      }`,
      { id: params.id }
    );
    setReviews(reviewData);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      if (product) {
        removeFromWishlist(product._id);
        toast.info(`${product.name} has been removed from your wishlist.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else if (product) {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        color: product.colors[0], // Use the first color as default
        size: product.sizes[0], // Use the first size as default
      });
      toast.success(`${product.name} has been added to your wishlist.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      const stockLevel = product.stockLevel || 0;

      if (stockLevel < quantity) {
        toast.error(`Only ${stockLevel} items available in stock.`);
        
        // Automatically add to wishlist if out of stock
        if (!isWishlisted) {
          addToWishlist({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            color: product.colors[0], // Use the first color as default
            size: product.sizes[0], // Use the first size as default
          });
          toast.info(`${product.name} has been added to your wishlist because it is out of stock.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return;
      }

      try {
        await client
          .patch(product._id)
          .set({ stockLevel: stockLevel - quantity })
          .commit();

        addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.imageUrl,
          color: product.colors[0], // Use the first color as default
          size: product.sizes[0], // Use the first size as default
        });

        toast.success(`${quantity} x ${product.name} has been added to your cart.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error('Failed to update stock level:', error);
        toast.error('Failed to update stock level. Please try again.');
      }
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  useEffect(() => {
    const fetchData = async () => {
      const productData = await client.fetch(
        `*[_type == "product" && _id == $id][0]{
          _id, 
          name, 
          description, 
          price, 
          discountPercentage, 
          "priceWithoutDiscount": price * (1 - discountPercentage / 100),
          stockLevel, 
          "imageUrl": image.asset->url, 
          "additionalImages": additionalImages[].asset->url,
           additionalDescription,
           additionalInfo,
          tags, 
          sizes, 
          colors, 
          category, 
          isFeaturedProduct
        }`,
        { id: params.id }
      );
      setProduct(productData);

      const relatedData = await client.fetch(
        `*[_type == "product" && _id != $id][4...8]{
          _id, name,"priceWithoutDiscount": price * (1 - discountPercentage / 100), "imageUrl": image.asset->url
        }`,
        { id: params.id }
      );
      setRelatedProducts(relatedData);
       // Fetch reviews
       fetchReviews();
    };
    fetchData();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <div>
        <ToastContainer />
        <div className="bg-[#F6F5FF] py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Product Details</h1>
            <div className="flex items-center gap-2 text-sm">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">Product Details</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 py-16 " >
          <div className="grid gap-8 md:grid-cols-2 ">
          <ProductGallery images={[product.imageUrl, ...(product.additionalImages || [])]} />

            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-[#151875]">{product.name}</h1>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
                <span className="ml-2 text-gray-500">(5)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-[#151875]">
                  ${product.priceWithoutDiscount.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                )}
              </div>
              <p className="text-gray-600">{product.description}</p>
              <div>
                <label className="font-bold text-[#151875]">Color</label>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className="h-6 w-6 rounded-full border-2 focus:border-green-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="h-10 w-8 border border-r-0 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    className="h-10 w-12 border text-center"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-8 border border-l-0 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <Button onClick={handleAddToCart} className="bg-[#FB2E86] text-white rounded-xl hover:bg-pink-600">
                  Add To Cart
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlist}
                  className="rounded-full bg-pink-100  text-[#FB2E86] "
                >
                  <Heart className={` h-4 w-4 ${isWishlisted ? 'fill-[#f80202] text-[#ff1e1e]' : 'text-[#FB2E86]'}`} />
                  
                </Button>
              </div>
              <div className="space-y-2 text-gray-500  border-t pt-6  capitalize">
                <p >
                  <span className="font-bold text-[#151875] font-heading mr-2">Categories:</span> {product.category}
                </p>
                <p >
                  <span className="font-bold text-[#151875] font-heading mr-2 capitalize">Tags:</span> {product.tags.join("  ,  ")}
                </p>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="border-b space-x-4 text-[#151875] ">
                <TabsTrigger value="description"className="focus:bg-gray-100 px-3 mb-2 rounded">Description</TabsTrigger>
                <TabsTrigger value="additional"className="focus:bg-gray-100 px-3 mb-2 rounded">Additional Info</TabsTrigger>
                <TabsTrigger value="reviews"className="focus:bg-gray-100 px-3 mb-2 rounded">Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="video"className="focus:bg-gray-100 px-3 mb-2 rounded">Video</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-8">
                <div className="prose max-w-none">
                  <h3 className="font-heading text-2xl text-[#151875] mb-[8] font-bold ">Additional Description </h3>
                  <p className=" text-gray-500 text-lg">
                   {product.additionalDescription }
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="additional" className="mt-8">
              <div className="prose max-w-none bg-pink-100 border-l-4  p-4 border-pink-500">
                  <h3 className="font-heading text-2xl text-[#151875] mb-[8] font-bold ">Additional Information </h3>
                  <p className=" text-gray-500 text-lg">
                   {product.additionalInfo }
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-6">
                  <ReviewForm productId={product._id} onReviewSubmit={fetchReviews} />
                  <div className="space-y-4">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review._id} className="border p-4 rounded-lg bg-background">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-secondary">{review.name}</span>
                            <StarRating rating={review.rating} editable={false} />
                            <span className="text-gray-500 text-sm">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="font-heading text-[#151875] text-lg">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="video" className="mt-8">
                <p className="font-heading text-[#151875] text-lg">No video available.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="mb-8 text-3xl font-bold text-[#151875]">
              Related Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  _id={product._id} 
                  name={product.name} 
                  price={product.price} 
                  imageUrl={product.imageUrl} 
                />
              ))}
            </div>
          </div>

          {/* Brand Logos */}
          <BrandLogos />
        </div>
      </div>
    </CartProvider>
  );
}