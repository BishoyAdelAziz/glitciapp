export const getFirstLetter = (fullName: string) => {
  const firstName = fullName.split(" ")[0]; // Get the first word (assumed to be the first name)
  return firstName.charAt(0).toUpperCase(); // Return the first letter, capitalized
};
interface RawEmployee {
  _id: string;
  name: string;
  isActive: boolean;
}

export interface SelectOption {
  id: string;
  name: string;
}
interface RawService {
  _id: string;
  name: string;
}
export const transformEmployeesForSelect = (
  employees: RawEmployee[] | undefined
): SelectOption[] => {
  if (!employees || !Array.isArray(employees)) return [];

  return employees
    .filter((employee) => employee.isActive)
    .map(({ _id, name }) => ({
      id: _id,
      name: name,
    }));
};
export const transformServicesForSelect = (
  services: RawService[] | undefined
): SelectOption[] => {
  if (!services || !Array.isArray(services)) return [];

  return services.map(({ _id, name }) => ({
    id: _id,
    name: name,
  }));
};
