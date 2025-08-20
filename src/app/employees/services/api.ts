import axiosInstance from "@/lib/axios";

export const getEmployees = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get("employees/", {
    params: { page, limit },
  });
  return response.data;
};
