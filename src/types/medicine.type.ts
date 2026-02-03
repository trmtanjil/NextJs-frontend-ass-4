export interface Medicine {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  categoryId?: string;
  stock?: number;
  category?:string

}
