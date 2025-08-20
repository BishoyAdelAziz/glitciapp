import axiosInstance from "@/lib/axios";

// Departments
export const getDepartments = async () => {
  return axiosInstance.get("departments");
};

// Positions
export const getDepartmentPositions = async (departmentId: string) => {
  return axiosInstance.get(`positions/department/${departmentId}`);
};

// Skills
export const getPositionSkills = async (positionId: string) => {
  return axiosInstance.get(`skills/positions/${positionId}`);
};
// Create new Skill
export const createSkill = async (
  positionId: string,
  skillData: { name: string }
) => {
  return axiosInstance.post(`skills`, { ...skillData, positionId });
};
// Create Employee
export const createEmployee = async (employeeData: any) => {
  return axiosInstance.post("employees", employeeData);
};
