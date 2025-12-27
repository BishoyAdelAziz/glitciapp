import { getEmployees } from "@/services/api/employees";
import { getEmployeesByDepartment } from "@/services/api/employees";
import { useQuery } from "@tanstack/react-query";
interface Props {
  departmentId: string;
  page?: number;
  limit?: number;
}
export default function useEmployees({
  departmentId = "1",
  page = 1,
  limit = 10,
}: Props) {
  const {
    data: EmployeesByDepartment,
    isPending: employeesIsPending,
    isError: employeesIsError,
    error: employeesError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployeesByDepartment(departmentId, page, limit),
    enabled: !!departmentId,
  });
  const {
    data: allEmployees,
    isPending: allEmployeesIsPending,
    isError: allEmployeesIsError,
    error: allEmployeesError,
  } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: () => getEmployees(page, limit),
  });
  return {
    EmployeesByDepartment,
    employeesIsPending,
    employeesIsError,
    employeesError,
    allEmployees,
    allEmployeesIsPending,
    allEmployeesIsError,
    allEmployeesError,
  };
}
