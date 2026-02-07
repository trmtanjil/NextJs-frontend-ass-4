import MedicinService from "@/services/medicine.service";
import MedicineTable from "./productTable";

export default async function AllProductpage() {
  const { data, error } = await MedicinService.getAll();

  // যদি ডাটা না থাকে বা এরর হয়
  if (error) return <div className="text-red-500">Error:</div>;

  // সার্ভিস এখন নিশ্চিত করছে 'data' একটি অ্যারে
  const medicines = data || []; 

  return (
    <div className="p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">All Medicines</h1>
      
      {medicines.length > 0 ? (
        <MedicineTable medicines={medicines} />
      ) : (
        <p>No medicines found.</p>
      )}
    </div>
  );
}