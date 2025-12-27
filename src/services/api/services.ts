import axiosInstance from "@/lib/axios";

export const getServices = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get("services/", {
    params: { page, limit },
  });
  return response.data.data;
};
