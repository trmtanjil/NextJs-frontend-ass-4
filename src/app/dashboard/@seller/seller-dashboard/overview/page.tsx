import React from 'react';
import { Package, PlusCircle, ShoppingBag, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MedicinService from '@/services/medicine.service';

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  // সার্ভিস থেকে কিছু ডাটা নিয়ে আসা (কাউন্ট দেখানোর জন্য)
  const { data: medicines } = await MedicinService.getAll();
  const totalMedicines = medicines?.length || 0;

  const stats = [
    { title: "Total Medicines", value: totalMedicines, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Active Orders", value: "12", icon: ShoppingBag, color: "text-green-600", bg: "bg-green-50" },
    { title: "Total Sales", value: "$4,250", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="p-6 space-y-8 bg-white min-h-screen text-black">
      {/* হেডার এবং কুইক অ্যাকশন */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Seller Overview</h1>
          <p className="text-gray-500">Welcome back! Here is whats happening today.</p>
        </div>
        <Link href="/seller-dashboard/add-product">
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <PlusCircle className="w-4 h-4" /> Add New Medicine
          </Button>
        </Link>
      </div>

      {/* স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 border rounded-2xl shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* কুইক নেভিগেশন সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 border rounded-3xl space-y-4">
          <h3 className="text-xl font-bold">Inventory Management</h3>
          <p className="text-sm text-gray-500">View, search, edit or delete your listed medicines.</p>
          <Link href="/seller-dashboard/products" className="inline-block">
            <Button variant="outline" className="border-primary text-primary">Manage Products</Button>
          </Link>
        </div>

        <div className="p-6 border rounded-3xl space-y-4">
          <h3 className="text-xl font-bold">Order History</h3>
          <p className="text-sm text-gray-500">Check your recent customer orders and update shipping status.</p>
          <Link href="/seller-dashboard/orders" className="inline-block">
            <Button variant="outline" className="border-primary text-primary">View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}