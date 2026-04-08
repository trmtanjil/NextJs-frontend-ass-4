import { Route } from "@/types/routes.type";

 
export const userRoutes: Route[] = [
  
  {
    
    title: "Customer Dashboard",
    items: [
  
      {
        title: "Profile",
        url: "/profile",
      },
      {
        title: "Orders",
        url: "/orders",
      },
        { title: "Card", url: "/card" },
        { title: "Apply For Seller", url: "/applyseller" },
    ],
  },
];
