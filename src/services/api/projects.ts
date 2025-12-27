import axiosInstance from "@/lib/axios";
export const getAllProjects = async () => {
  const response = await axiosInstance.get("projects");
  return response.data.data;
};
export const createProject = async (data) => {
  const response = await axiosInstance.post("projects", data);
  return response.data.data;
};
