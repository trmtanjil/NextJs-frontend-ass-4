export interface User {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (row: User) => <span className="font-mono text-xs">{row.id?.slice(0, 8)}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (row: User) => row.name || "—",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (row: User) => row.email || "—",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (row: User) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        row.role === "admin"
          ? "bg-red-100 text-red-700"
          : row.role === "seller"
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-700"
      }`}>
        {row.role || "—"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (row: User) => {
      if (!row.createdAt) return "—";
      return new Date(row.createdAt).toLocaleDateString();
    },
  },
];
