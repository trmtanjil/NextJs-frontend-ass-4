import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MedicinService from '@/services/medicine.service'

type PageProps = {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const { id } = params

  const { data: medicine, error } = await MedicinService.getMedicineById(id)
  console.log(medicine)

  if (error || !medicine) {
    return (
      <div className="container mx-auto p-6 max-w-5xl">
        <Link href="/shop" className="flex items-center gap-2 text-primary mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="bg-white p-8 rounded-3xl shadow-sm border text-center py-20">
          <p className="text-lg text-red-500">Unable to load medicine details.</p>
          <p className="text-sm text-gray-500 mt-2">{error ?? 'Not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <Link href="/shop" className="flex items-center gap-2 text-primary mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-3xl shadow-sm border">
        {/* বাম পাশ: ইমেজ */}
        <div className="h-80 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border">
          {medicine.image ? (
            <img src={medicine.image} alt={medicine.name} className="object-contain w-full h-full" />
          ) : (
            <span className="text-gray-400">No Image Available</span>
          )}
        </div>

        {/* ডান পাশ: তথ্য */}
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-gray-900">{medicine.name}</h1>
            <p className="text-amber-600 font-medium">Category ID: {String(medicine.categoryId)}</p>
          </div>

          <div className="text-3xl font-bold text-primary">${medicine.price}</div>
          
          <div className="py-4 border-y space-y-2">
            <p className="text-gray-600 leading-relaxed">
              {medicine.description ?? "No description provided for this medicine."}
            </p>
            <div className="flex gap-4 text-sm font-semibold">
              <span className={medicine.stock > 0 ? "text-green-600" : "text-red-600"}>
                Status: {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              <span className="text-gray-500">Available: {medicine.stock} units</span>
            </div>
          </div>

          <Button className="w-full md:w-max px-10 py-6 text-lg gap-3">
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
