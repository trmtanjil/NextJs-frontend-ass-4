 import { getAllUsersAction } from "@/action/user.actions";
import { UsersTable } from "../users-table";

interface PageProps {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
  };
}

export default async function UsersPage({ searchParams }: PageProps) {
  const page = await Number(searchParams?.page ?? 1);
  const limit = await Number(searchParams?.limit ?? 10);

  const { data, error } = await getAllUsersAction({
    page,
    limit,
  });

  if (error || !data) {
    return <div className="text-red-500">Failed to load users</div>;
  }

  return <UsersTable users={data.data} meta={data.meta} />;
}
