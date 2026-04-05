import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Route } from "@/types/routes.type";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/customerRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import DashboardLogo from "../Sheared/DashboardLogo";
import { normalizeDashboardRole, type DashboardRole, Roles } from "@/constentse/roles";
  
export async function AppSidebar({
  user,
  sessionError = false,
  ...props
}: {
  user?: DashboardRole | string;
  sessionError?: boolean;
} & React.ComponentProps<typeof Sidebar>) {
  let routes: Route[] = [];

  const normalizedUser = normalizeDashboardRole(user);
  switch (normalizedUser) {
    case Roles.ADMIN:
      routes = adminRoutes;
      break;
    case Roles.CUSTOMER:
      routes = userRoutes;
      break;
    case Roles.SELLER:
      routes = sellerRoutes;
      break;
    default:
      routes = [];
  }

  return (
    <Sidebar {...props}>
      <DashboardLogo></DashboardLogo>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
             <SidebarGroupLabel>{item.title} </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {routes.length === 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="rounded-md border border-dashed px-3 py-3 text-sm text-muted-foreground">
                    {sessionError
                      ? "Session service is unavailable, so dashboard navigation could not be loaded."
                      : "No dashboard navigation is available for this account yet."}
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
