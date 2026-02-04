// services/order.service.ts
export const orderService = {
  createOrder: async (orderData: { items: { medicineId: string, quantity: number }[] }) => {
    const API_URL = process.env.API_URL;
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  }



}