import axiosInstance from "@/lib/axios";

export const getProjects = async () => {
  const response = await axiosInstance.get("projects");
  return response.data;
};
