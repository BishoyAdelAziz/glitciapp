import axiosInstance from "@/lib/axios";
export const getAllClients = async () => {
  const response = await axiosInstance.get("clients");
  return response.data.data;
};
