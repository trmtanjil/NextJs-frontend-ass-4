import { getAllUsersAction } from "@/action/user.actions";
import { UsersTable } from "../users-table";

export default async function UsersPage() {
  const { data, error } = await getAllUsersAction();

  // console.log-এ চেক করুন ডাটা আসলে কেমন আসছে
  console.log("Action Data:", data);

  if (error || !data) {
    return <div className="text-red-500">Failed to load users:  </div>;
  }

  // যদি আপনার API রেসপন্স সরাসরি ডাটা এবং মেটা পাঠায়
  return (
    <span className="text-black">
      {/* এখানে data.data না লিখে শুধু data.data অথবা structure অনুযায়ী লিখুন */}
      <UsersTable users={data.data || []} meta={data.meta} />
    </span>
  );
}