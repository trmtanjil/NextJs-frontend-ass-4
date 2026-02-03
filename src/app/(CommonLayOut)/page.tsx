import { Button } from "@/components/ui/button";
 import { userService } from "@/services/user.service";
 import Heropage from "./heroSection/page";
import CategoryList from "./category/page";
    
export default async function Home() {

   const {data} = await userService.getSession()
   console.log("session from ",data)
  
  return (
    <div className="       bg-zinc-50 font-sans dark:bg-black">
      <div className="  mx-auto">
              <Heropage></Heropage>

      </div>
      <div>
        <CategoryList></CategoryList>
      </div>
   <Button>click heare</Button>
    </div>
  );
}
