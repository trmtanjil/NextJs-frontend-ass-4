import { userService } from '@/services/user.service'
import React from 'react'

export default async function AllMadicin() {
        const {data}= await userService.getSession()
     const userInfo = data?.user?.role
     console.log(userInfo)
  return (
    <div>AllMadicin</div>
  )
}
