"use client";

import { adminUpdateUserStatusAction } from "@/action/user.actions";
import { useTransition } from "react";
import { toast } from "sonner";

export function UserRoleAction({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: string) => {
    startTransition(async () => {
      // এখানে পরিবর্তন করা হয়েছে: সরাসরি newRole না পাঠিয়ে { status: newRole } পাঠানো হয়েছে
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
      className="bg-slate-50 border border-slate-200 rounded-md text-xs p-1 font-semibold text-black outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
    >
      <option value="user">User</option>
      <option value="seller">Seller</option>
      <option value="admin">Admin</option>
    </select>
  );
}