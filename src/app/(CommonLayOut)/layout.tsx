import { Navbar1 } from "@/components/Sheared/navbar1";

export default function CommonLayOut({children}:{children: React.ReactNode}) {
  return (
    <div>
        <Navbar1></Navbar1>
        {children}
    </div>
  )
}
