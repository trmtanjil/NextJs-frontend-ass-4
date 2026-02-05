"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart, Star, Package } from "lucide-react";
import Link from "next/link";

interface Medicine {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: {
    name: string;
  };
  discount?: number;
  rating?: number;
}

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  const hasDiscount = medicine.discount && medicine.discount > 0;
  const discountedPrice = hasDiscount 
    ? medicine.price - (medicine.price * medicine.discount!) / 100 
    : medicine.price;

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50/50">
      {/* Image Section with Overlay */}
      <div className="relative h-56 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
        {medicine.image ? (
          <>
            <img
              src={medicine.image}
              alt={medicine.name}
              className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <Package className="w-16 h-16 text-blue-200" />
              <ShoppingCart className="w-8 h-8 text-blue-400 absolute -bottom-2 -right-2" />
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            {medicine.category?.name || "Medicine"}
          </span>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              -{medicine.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-5">
        {/* Medicine Name */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3rem]" title={medicine.name}>
          {medicine.name}
        </h3>

        {/* Rating (Optional) */}
        {medicine.rating && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(medicine.rating!)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({medicine.rating})</span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  ${medicine.price.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Per unit</p>
          </div>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="p-5 pt-0 flex gap-3">
        <Link href={`/shop/${medicine.id}`} className="flex-1">
          <Button 
            variant="outline" 
            className="w-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 group/btn transition-all duration-300"
          >
            <Eye className="w-4 h-4 mr-2 group-hover/btn:text-blue-600 transition-colors" />
            <span className="font-semibold">View Details</span>
          </Button>
        </Link>
        <Button 
          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          <span className="font-semibold">Add to Cart</span>
        </Button>
      </CardFooter>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
    </Card>
  );
}