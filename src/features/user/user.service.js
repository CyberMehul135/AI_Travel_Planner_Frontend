import { authAxios } from "@/services/axios";

export const getUserDetails = async () => {
  const res = await authAxios.get("/api/v1/user/me");
  return res.data;
};
