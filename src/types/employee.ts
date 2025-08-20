interface DepartmentDetail {
  _id: string;
  name: string;
  id: string;
}

interface PositionDetail {
  _id: string;
  name: string;
  id: string;
}

interface SkillDetail {
  _id: string;
  name: string;
}

interface ProjectDetail {
  // Define your project details structure here
  // Example:
  // _id: string;
  // name: string;
  // budget: number;
}

interface CompletionRate {
  // Define your completion rate structure here
  // Example:
  // projectId: string;
  // completionRate: number;
}

interface EmployeeProject {
  project?: string;
  budget?: number;
  installments?: Array<{
    amount: number;
    date: Date | string;
    addedBy: string;
  }>;
  currency?: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  departments: string[];
  positions: string[];
  skills: string[];
  projects: EmployeeProject[];
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
  departmentDetails: DepartmentDetail[];
  positionDetails: PositionDetail[];
  skillDetails: SkillDetail[];
  projectDetails: ProjectDetail[];
  completionRates: CompletionRate[];
}

// Export the interfaces for use in other files
export type {
  Employee,
  DepartmentDetail,
  PositionDetail,
  SkillDetail,
  EmployeeProject,
  ProjectDetail,
  CompletionRate,
};
