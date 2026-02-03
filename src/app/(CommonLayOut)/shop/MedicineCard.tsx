 import { Button } from "@/components/ui/button";
import { Medicine } from "@/types/medicine.type";

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <div className="overflow-hidden">
      <div className="  bg-muted flex items-center justify-center">
        {/* এখানে মেডিসিনের ছবি থাকবে */}
        <span className="text-muted-foreground text-xs">No Image</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{medicine.name}</h3>
        <p className="text-primary font-semibold">${medicine.price}</p>
      </div>
      <div className="p-4 pt-0">
        <Button className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
}