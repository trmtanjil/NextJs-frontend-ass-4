"use client";

import { adminUpdateUserStatusAction } from "@/action/user.actions";
import { useTransition } from "react";
import { toast } from "sonner";

// ১. ইউজারের জন্য ইন্টারফেস ডিফাইন করো
export interface UserProps {
  id: string;
  role: "user" | "seller" | "admin"; // নির্দিষ্ট রোলগুলো ডিফাইন করে দেওয়া ভালো
  name?: string;
  email?: string;
}

// ২. কম্পোনেন্টের প্রপস টাইপ সেট করো
export function UserRoleAction({ user }: { user: UserProps }) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: string) => {
    startTransition(async () => {
      // এপিআই কল
      const result = await adminUpdateUserStatusAction(user.id, { status: newRole });
      
      if (result?.error) {
        toast.error("Role update failed!");
      } else {
        toast.success(`User is now an ${newRole}`);
      }
    });
  };

  return (
    <select
      disabled={isPending}
      defaultValue={user.role}
      onChange={(e) => handleRoleChange(e.target.value)}
      className="bg-slate-50 border border-slate-200 rounded-md text-xs p-1 font-semibold text-black outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 cursor-pointer"
    >
      <option value="user">User</option>
      <option value="seller">Seller</option>
      <option value="admin">Admin</option>
    </select>
  );
}