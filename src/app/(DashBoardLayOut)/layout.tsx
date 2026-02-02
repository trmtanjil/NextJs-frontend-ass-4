
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constentse/roles";
import { userService } from "@/services/user.service";
  
export default async function DashboardLayout({
  children,
  admin,
  customer,
  seller
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
    customer: React.ReactNode;
      seller: React.ReactNode;
}) {
    const {data}= await userService.getSession()
 const userInfo = data?.user?.role
 console.log(userInfo)
  return (
    <SidebarProvider>
      <Sidebar   />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
 
        </header>
           <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
{userInfo?.role === Roles.admin
  ? admin
  : userInfo?.role === Roles.customer
  ? customer
  : userInfo?.role === Roles.seller
  ? seller
  : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}