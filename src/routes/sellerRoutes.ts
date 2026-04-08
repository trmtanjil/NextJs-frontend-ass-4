import { Route } from "@/types/routes.type";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Dashboard",
    items: [
      { title: "Profile", url: "/seller-dashboard/Sellerprofile" },
      { title: "Overview", url: "/seller-dashboard/overview" },
      { title: "My Products", url: "/seller-dashboard/products" },
      { title: "Orders", url: "/seller-dashboard/orders" },
    ],
  },
];
