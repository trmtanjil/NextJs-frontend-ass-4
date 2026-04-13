"use client";

import { createSellerRequestAction } from "@/action/sellerAction";
import { Store, Send, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ApplySellerPage() {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await createSellerRequestAction(formData);

      if (result.success) {
        toast.success(result.message);
        setIsSuccess(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-black text-gray-900">অপেক্ষায় থাকুন!</h2>
        <p className="text-gray-500 max-w-xs mt-3 leading-relaxed">
          আপনার দোকানের তথ্য সফলভাবে জমা দেওয়া হয়েছে। অ্যাডমিন রিকোয়েস্টটি এপ্রুভ করলে আপনি সেলার ড্যাশবোর্ড এক্সেস করতে পারবেন।
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-[2.5rem] shadow-2xl shadow-green-100/30 border border-gray-50">
      <div className="flex items-center gap-5 mb-10 border-b pb-6">
        <div className="p-4 bg-green-600 text-white rounded-2xl">
          <Store size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 leading-none">Become a Seller</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">আপনার দোকানের তথ্য দিয়ে আবেদন করুন</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Shop Name</label>
          <input name="shopName" required className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 text-gray-900" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Contact Number</label>
          <input name="contactNumber" required className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 text-gray-900" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Shop Address</label>
          <textarea name="shopAddress" required rows={2} className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 resize-none text-gray-900" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Reason (Optional)</label>
          <textarea name="reason" rows={3} className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 resize-none text-gray-900" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-5 bg-green-600 text-white font-black text-lg rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-600/30 flex items-center justify-center gap-3 active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Submit Application</>}
        </button>
      </form>
    </div>
  );
}