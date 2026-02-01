import { Navbar } from "@/components/Sheared/navbar1";

 
 
export default function CommonLayOut({children}:{children: React.ReactNode}) {
  return (
    <div>
           <Navbar></Navbar>
        {children}
    </div>
  )
}
