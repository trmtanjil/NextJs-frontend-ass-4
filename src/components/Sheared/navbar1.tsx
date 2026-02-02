"use client";

import {   Menu,   } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
   NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
 } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "../layout/ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url:string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "/#" },
    {
      title: "About",
      url: "/about",
    
    },
    {
      title: "All Madicin",
      url: "/allmadicin",
    
    },
 
    {
      title: "Blog",
      url: "/blogs",
    },
    {
      title:"deshboard",
      url:"/deshboard/seller-deshboard"
    },
   
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <ModeToggle></ModeToggle>
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
 

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
       asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
      <Link href={item.url}> {item.title}</Link> 
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
 

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

 

export { Navbar };


































// "use client";

// import { Menu } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Accordion } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Link from "next/link";
// import { ModeToggle } from "../layout/ModeToggle";
// import { authClient } from "@/lib/auth-client"; // Better-Auth ক্লায়েন্ট ইমপোর্ট করো
// import { useRouter } from "next/navigation";

// interface MenuItem {
//   title: string;
//   url: string;
// }

// interface Navbar1Props {
//   className?: string;
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//     className?: string;
//   };
// }

// const Navbar = ({
//   logo = {
//     url: "/",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//     alt: "logo",
//     title: "MyStore",
//   },
//   className,
// }: Navbar1Props) => {
//   const router = useRouter();
//   const { data: session } = authClient.useSession(); // ইউজারের সেশন ডাটা নেওয়া হচ্ছে
//   const userRole = session?.user?.role; // রোল বের করা হচ্ছে
// console.log(userRole)
//   // ১. রোল অনুযায়ী ড্যাশবোর্ড ইউআরএল ঠিক করা
//   const getDashboardUrl = () => {
//     if (userRole === "admin") return "/admin-dashboard";
//     if (userRole === "seller") return "/seller-dashboard";
//     return "/customer-dashboard";
//   };

//   // ২. কমন মেনু আইটেম
//   const menu: MenuItem[] = [
//     { title: "Home", url: "/" },
//     { title: "About", url: "/about" },
//     { title: "Contact", url: "/contact" },
//     { title: "Blog", url: "/blogs" },
//   ];

//   // যদি লগইন থাকে, তবে মেনুতে ড্যাশবোর্ড লিঙ্ক যোগ করো
//   if (session) {
//     menu.push({ title: "Dashboard", url: getDashboardUrl() });
//   }

//   const handleLogout = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           router.push("/login");
//           router.refresh();
//         },
//       },
//     });
//   };

//   return (
//     <section className={cn("py-4 border-b bg-background", className)}>
//       <div className="container mx-auto px-4">
//         {/* Desktop Menu */}
//         <nav className="hidden items-center justify-between lg:flex">
//           <div className="flex items-center gap-6">
//             <Link href={logo.url} className="flex items-center gap-2">
//               <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
//               <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
//             </Link>
//             <div className="flex items-center">
//               <NavigationMenu>
//                 <NavigationMenuList>
//                   {menu.map((item) => renderMenuItem(item))}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <ModeToggle />
//             {session ? (
//               // লগইন থাকলে লগআউট বাটন
//               <Button onClick={handleLogout} variant="destructive" size="sm">
//                 Logout
//               </Button>
//             ) : (
//               // লগইন না থাকলে এই বাটনগুলো
//               <>
//                 <Button asChild variant="outline" size="sm">
//                   <Link href="/login">Login</Link>
//                 </Button>
//                 <Button asChild size="sm">
//                   <Link href="/register">Register</Link>
//                 </Button>
//               </>
//             )}
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             <Link href={logo.url} className="flex items-center gap-2">
//               <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
//             </Link>
//             <div className="flex items-center gap-2">
//               <ModeToggle />
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="icon">
//                     <Menu className="size-4" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="overflow-y-auto">
//                   <SheetHeader>
//                     <SheetTitle>Menu</SheetTitle>
//                   </SheetHeader>
//                   <div className="flex flex-col gap-6 p-4">
//                     <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
//                       {menu.map((item) => renderMobileMenuItem(item))}
//                     </Accordion>
//                     <div className="flex flex-col gap-3">
//                       {session ? (
//                         <Button onClick={handleLogout} variant="destructive">Logout</Button>
//                       ) : (
//                         <>
//                           <Button asChild variant="outline"><Link href="/login">Login</Link></Button>
//                           <Button asChild><Link href="/register">Register</Link></Button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const renderMenuItem = (item: MenuItem) => (
//   <NavigationMenuItem key={item.title}>
//     <NavigationMenuLink asChild className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
//       <Link href={item.url}>{item.title}</Link>
//     </NavigationMenuLink>
//   </NavigationMenuItem>
// );

// const renderMobileMenuItem = (item: MenuItem) => (
//   <Link key={item.title} href={item.url} className="text-md font-semibold py-2 border-b">
//     {item.title}
//   </Link>
// );

// export { Navbar };