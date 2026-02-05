import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  id: string;
  name: string;
  itemCount?: number;
}

export function CategoryCard({ id, name, itemCount = 42 }: CategoryCardProps) {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-amber-500 to-orange-500",
    "from-violet-500 to-purple-500",
    "from-rose-500 to-pink-500",
  ];
  
  const colorIndex = name.charCodeAt(0) % colors.length;
  const gradientClass = colors[colorIndex];

  return (
    <Link href={`/shop/${id}`}>
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-gray-50/50">
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${gradientClass} transition-opacity duration-500`}></div>
        
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className={`absolute top-0 right-0 w-32 h-32 rotate-45 translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${gradientClass} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
        </div>

        <CardContent className="p-6 flex flex-col items-center justify-center h-full">
          {/* Icon Container with Gradient */}
          <div className={`relative mb-6 p-5 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
            <LayoutGrid className="w-8 h-8 text-white" />
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
          </div>

          {/* Category Name */}
          <h3 className="font-bold text-lg text-gray-900 text-center mb-2 group-hover:text-gray-800 transition-colors line-clamp-2">
            {name}
          </h3>

          {/* Item Count */}
          <p className="text-sm text-gray-500 mb-4">
            {itemCount}+ items
          </p>

          {/* View Button */}
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <span>Browse</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Hover Indicator Line */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-gradient-to-r ${gradientClass} group-hover:w-16 transition-all duration-500`}></div>
        </CardContent>
      </Card>
    </Link>
  );
}