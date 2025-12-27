import axiosInstance from "@/lib/axios";
export const getEmployeesByDepartment = async (
  departmentId: string,
  page = 1,
  limit = 10
) => {
  const response = await axiosInstance.get(
    `employees/department/${departmentId}`,
    {
      params: { page, limit },
    }
  );
  return response.data;
};
export const getEmployees = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get("employees/", {
    params: { page, limit },
  });
  return response.data.data;
};
