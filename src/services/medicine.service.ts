// মনে রাখবে: Client side থেকে এক্সেস করতে .env ফাইলে NEXT_PUBLIC_API_URL থাকতে হবে

const MedicinService = {
  // category-wise medicines fetch
  getCetegoryMedicines: async (categoryId?: string) => {
    try {
      const API_URL = process.env.API_URL;

      if (!API_URL) {
        throw new Error("API URL is not defined");
      }

      const url = categoryId
        ? `${API_URL}/medicines?category=${categoryId}`
        : `${API_URL}/medicines`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: [],
          error: result?.message || "Failed to fetch medicines",
        };
      }

      return {
        data: result?.data ?? [],
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        error: "Something went wrong while fetching medicines",
      };
    }
  },


  getMedicineById: async (id: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/medicines/${id}`, {
        cache: "no-store", //  update data 
      });
      const result = await res.json();
      return { data: result?.data || result, error: null };
    } catch (error) {
      return { data: null, error: "Failed to load medicine details" };
    }
  },
};




export default MedicinService;
