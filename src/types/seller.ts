/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISellerRequestPayload {
  shopName: string;
  shopAddress: string;
  contactNumber: string;
  reason?: string;
}

export interface IApiResponse {
  success: boolean;
  message: string;
  data?: any;
}