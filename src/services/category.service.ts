export interface Category {
  id: string;
  name: string;
}

export interface ServiceResult<T> {
  data: T | null;
  error: { message: string } | null;
}

// মনে রাখবে: Client side থেকে এক্সেস করতে .env ফাইলে NEXT_PUBLIC_API_URL থাকতে হবে
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const categoryService = {
  getAllCategories: async (): Promise<ServiceResult<Category[]>> => {
    try {
      // ১. API_URL চেক করা
      if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is missing in .env file");
      }

      const url = `${API_URL}/categories`;

      // ২. Fetch কল করা
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // সবসময় লেটেস্ট ডাটা পাওয়ার জন্য
      });

      // ৩. রেসপন্স চেক করা
      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: result?.message || "Failed to load categories" },
        };
      }

      // তোমার ব্যাকএন্ড যদি { data: [...] } ফরমেটে পাঠায়
      return {
        data: result.data || result, 
        error: null,
      };

    } catch (err) {
      console.error("Category Fetch Error:", err);
      return {
        data: null,
        error: { message:   "Something went wrong while fetching categories" },
      };
    }
  },
};

export default categoryService;