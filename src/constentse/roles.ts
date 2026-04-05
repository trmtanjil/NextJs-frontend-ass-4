export const Roles = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
} as const;

export type DashboardRole = (typeof Roles)[keyof typeof Roles];

export const normalizeDashboardRole = (
  role?: string | null
): DashboardRole | null => {
  const normalizedRole = role?.trim().toLowerCase();

  switch (normalizedRole) {
    case "admin":
      return Roles.ADMIN;
    case "seller":
      return Roles.SELLER;
    case "user":
    case "customer":
      return Roles.CUSTOMER;
    default:
      return null;
  }
};
