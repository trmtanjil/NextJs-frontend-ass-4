 import { cookies } from "next/headers"


// const AUTH_URL= env.AUTH_URL

export const userService ={
getSession: async function () {
   try {
       const cookieStore =await cookies()
  //      console.log(cookieStore)
  // console.log("cokie store",cookieStore.toString())
 
  const res = await fetch(`https://prisma-beckend-side-ass-4.vercel.app/get-session`,{
    headers:{
      Cookie:cookieStore.toString()
    },
    cache:"no-store"
  })
  const session =await res.json()

  if(session===null){
    return{
        data:null, error:{message:"session is missing"}
    }
  }
  return {
    data:session, error:null
  }

   }
   catch (err) {
  console.error(err);
  return { data: null, error: { message: "Something went wrong" } }; // Return kora dorkar
}
}
}