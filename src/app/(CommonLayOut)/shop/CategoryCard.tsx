import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react"; // একটি আইকন ব্যবহারের জন্য
import Link from "next/link";

interface CategoryCardProps {
  id: string;
  name: string;
}

export function CategoryCard({ id, name }: CategoryCardProps) {
  return (
    <Link href={`/shop?category=${id}`}>
      <Card className="hover:shadow-md transition-all duration-300 border-2 hover:border-primary group cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors mb-4">
            <LayoutGrid className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-center capitalize">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}