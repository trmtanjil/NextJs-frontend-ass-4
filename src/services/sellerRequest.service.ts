/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createSellerRequestService = async (
  payload: {
    shopName: FormDataEntryValue | null;
    shopAddress: FormDataEntryValue | null;
    contactNumber: FormDataEntryValue | null;
    reason: FormDataEntryValue | null;
  },
  token: string
) => {
  const response = await axios.post(
    `${API_URL}/seller/apply-seller`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return response.data;
};