export interface IMedicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
 
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
export interface Medicine {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: string;
  category?: { id: string; name?: string };
  image?: string;
  createdAt: string;
  updatedAt: string;
}
