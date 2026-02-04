import { Route } from "@/types/routes.type";

 
export const userRoutes: Route[] = [
  {
    title: "Blog Management",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
      },
    ],
  },
];
