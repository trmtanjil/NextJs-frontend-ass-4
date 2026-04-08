import { userService } from "@/services/user.service";
import { orderService } from "@/services/order.service";
import medicineService from "@/services/medicine.service";
import { cookies } from "next/headers";
import AdminOverview from "../AdminOverview/AdminOverview";

export default async function Page() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

  // সব ডাটা একসাথে ফেচ করা
  const [usersRes, ordersRes, medicinesRes] = await Promise.all([
    userService.getAllUsers(),
    orderService.getAllOrders(cookieHeader),
    medicineService.getAll()
  ]);

  // ডাটা ক্লিনিং লজিক: API রেসপন্স যেভাবেই আসুক, আমরা শুধু Array টুকু নিব
  const cleanUsers = usersRes?.data?.data || usersRes?.data || [];
  const cleanOrders = ordersRes?.data?.data || ordersRes?.data || [];
  const cleanMedicines = medicinesRes?.data || medicinesRes?.data || [];

  return (
    <AdminOverview
      users={cleanUsers} 
      orders={cleanOrders} 
      medicines={cleanMedicines}
    />
  );
}