import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
   
export default async function Home() {

  const cookeiStore = await cookies()
 
  const res = await fetch("http://localhost:5000/api/auth/get-session",{
    headers:{
      cookie: cookeiStore.toString()
    },
    cache:"no-store"
  })

  const session = await res.json()
  console.log(session)
   
  return (
    <div className="flex   items-center   bg-zinc-50 font-sans dark:bg-black">
   <Button>click heare</Button>
    </div>
  );
}
