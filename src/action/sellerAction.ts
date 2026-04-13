"use server";

import { cookies } from "next/headers";
import { createSellerRequestService } from "@/services/sellerRequest.service";

export const createSellerRequestAction = async (formData: FormData) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Authentication failed. Please login again.",
      };
    }

    const payload = {
      shopName: formData.get("shopName"),
      shopAddress: formData.get("shopAddress"),
      contactNumber: formData.get("contactNumber"),
      reason: formData.get("reason"),
    };

    const result = await createSellerRequestService(payload, token);

    return {
      success: true,
      message: result.message || "Seller request submitted successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to send seller request",
    };
  }
};