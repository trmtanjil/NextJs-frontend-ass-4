import { Route } from "@/types/routes.type";

export const adminRoutes: Route[] = [
  {
    title: "General",
    items: [
      {
        title: "Go to Website",
        url: "/",  
       },
    ],
  },
  {
    title: "",
    items: [
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Manage Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Manage Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
];