import { authAxios } from "@/services/axios";

export const getUserDetails = async () => {
  const res = await authAxios.get("/api/v1/user/me");
  return res.data;
};

export const updateUserDetails = async (payload) => {
  const res = await authAxios.put("/api/v1/user/me", payload);
  return res.data;
};
