import axiosInstance from "@/lib/axios";

export const getMyProfile = async () => {
  return await axiosInstance("auth/me");
};
