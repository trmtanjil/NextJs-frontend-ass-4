import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
   
export default async function Home() {

   const {data} = await userService.getSession()
   console.log("session from ",data)
  
  return (
    <div className="flex   items-center   bg-zinc-50 font-sans dark:bg-black">
   <Button>click heare</Button>
    </div>
  );
}
