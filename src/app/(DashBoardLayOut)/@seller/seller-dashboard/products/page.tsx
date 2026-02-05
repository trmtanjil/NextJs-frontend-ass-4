import MedicinService from "@/services/medicine.service";
import MedicineTable from "./productTable";

export default async function AllProductpage() {
  const response = await MedicinService.getAllMedicines();

  // 🔥 Axios হলে সবসময় .data.data দেখো
  const medicines = response?.data?.data ?? [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm text-black">
      <h1 className="text-2xl font-bold mb-4">All Medicines</h1>

      {medicines.length > 0 ? (
        <MedicineTable medicines={medicines} />
      ) : (
        <div className="text-center py-20 text-gray-400 border rounded-md">
          No medicines found.
        </div>
      )}
    </div>
  );
}
