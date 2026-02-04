"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Medicine {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: {
    name: string;
  };
}

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted">
      {/* মেডিসিন ইমেজ সেকশন */}
      <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
        {medicine.image ? (
          <img
            src={medicine.image}
            alt={medicine.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <ShoppingCart className="w-12 h-12 text-muted-foreground/40" />
        )}
        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
          {medicine.category?.name || "Medicine"}
        </div>
      </div>

      {/* মেডিসিন ইনফো */}
      <CardContent className="p-4">
        <h3 className="font-bold text-lg truncate" title={medicine.name}>
          {medicine.name}
        </h3>
        <p className="text-2xl font-bold text-primary mt-2">
          ${medicine.price}
        </p>
      </CardContent>

      {/* অ্যাকশন বাটন */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/shop/${medicine.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full flex gap-2">
            <Eye className="w-4 h-4" /> Details
          </Button>
        </Link>
        <Button size="sm" className="flex-1 flex gap-2">
          <ShoppingCart className="w-4 h-4" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
}