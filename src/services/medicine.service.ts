// মনে রাখবে: Client side থেকে এক্সেস করতে .env ফাইলে NEXT_PUBLIC_API_URL থাকতে হবে
const API_URL = process.env.API_URL;

const MedicinService = {
  // সব মেডিসিন আনার জন্য (ক্যাটাগরি ফিল্টারসহ)
  getAllMedicines: async (categoryId?: string) => {
    try {
      if (!API_URL) {
        throw new Error("API_URL is not defined in .env file");
      }

      // ক্যাটাগরি আইডি থাকলে URL-এ কুয়েরি স্ট্রিং যোগ হবে
      const url = categoryId 
        ? `${API_URL}/medicines?category=${categoryId}` 
        : `${API_URL}/medicines`;

      const res = await fetch(url, { 
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store" // সার্ভার কম্পোনেন্টের জন্য ফ্রেশ ডেটা নিশ্চিত করে
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: result?.message || "Failed to fetch medicines" }
        };
      }

      // তোমার ব্যাকএন্ড সার্ভিস প্যাটার্ন অনুযায়ী ডেটা রিটার্ন করা
      return {
        data: result.data || result,
        error: null
      };

    } catch (err) {
      return {
        data: null,
        error: { message:  "Something went wrong" }
      };
    }
  }
};

export default MedicinService;