// routes/sellerRoutes.ts

import { Route } from "@/types/routes.type";

 
export const sellerRoutes: Route[] = [
  {
    title: "Seller Dashboard",
    items: [
        { title: "profile", url: "/seller-dashboard/profile" },
      { title: "Overview", url: "/seller-dashboard" },
      { title: "My Products", url: "/seller-dashboard/products" },
      { title: "Orders", url: "/seller-dashboard/orders" },
      
    ],
  },
];
