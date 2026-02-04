import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  medicineId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (id: string) => void; // এখানে এটি অ্যাড করা হয়েছে
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set) => ({
      items: [] as CartItem[],

      // আইটেম অ্যাড করা
      addToCart: (newItem: CartItem) => set((state) => {
        const existing = state.items.find((i) => i.medicineId === newItem.medicineId);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.medicineId === newItem.medicineId ? { ...i, quantity: i.quantity + 1 } : i
            )
          };
        }
        return { items: [...state.items, newItem] };
      }),

      // আইটেম রিমুভ করা
      removeItem: (id: string) => set((state) => ({
        items: state.items.filter((i) => i.medicineId !== id)
      })),

      // পুরো কার্ট খালি করা
      clearCart: () => set({ items: [] }),
    }),
    { name: 'medicine-cart' }
  )
);