
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Roles } from "@/constentse/roles";
import { userService } from "@/services/user.service";
import { AppSidebar } from "@/components/layout/app-sidebar";
import DashboardLogo from "@/components/Sheared/DashboardLogo";

export const dynamic = 'force-dynamic';
  
export default async function DashboardLayout({
  
  admin,
  customer,
  seller
}: {
  
  admin: React.ReactNode;
    customer: React.ReactNode;
      seller: React.ReactNode;
    }) {
      const userData = await userService.getSession();
      const userRole = userData?.data?.user?.role;
      return (
        <>
    <SidebarProvider>
      <AppSidebar user={userRole} />
      <SidebarInset>
        <header  className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
            />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Health is first priority
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Stay Healthy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
           <div className="flex flex-1 flex-col gap-4 p-4">
{userRole=== Roles.admin
  ? admin
  : userRole === Roles.customer
  ? customer
  : userRole === Roles.seller
  ? seller
  : null}
        </div>
  
      </SidebarInset>
    </SidebarProvider>
</>
  );
}