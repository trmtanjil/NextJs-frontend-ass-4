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
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist<CartState>(
        (set) => ({
            items: [] as CartItem[],
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
      clearCart: () => set({ items: [] }),
    }),
    { name: 'medicine-cart' } // ব্রাউজার রিফ্রেশ দিলেও ডাটা থাকবে
  )
);