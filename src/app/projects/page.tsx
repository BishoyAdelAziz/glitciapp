"use client";

import AddProjectModal from "@/components/features/addProjectModal";
import { useProjecs } from "@/hooks/useProjects";
import { Project } from "@/types/projects";
import { useState } from "react";
export default function ProjectsPage() {
  const [addProjectIsOpen, setAddProjectIsOpen] = useState(false);
  const { Projects } = useProjecs();

  if (!Projects || Projects.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-primary">Projects</h1>
        <p className="text-gray-500">No projects found.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">
        Projects{" "}
        <span
          className="cursor-pointer text-white p-1 rounded-full"
          onClick={() => setAddProjectIsOpen(true)}
        >
          +
        </span>
      </h1>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Gross Profit</th>
              <th>Net Profit</th>
              <th>Employees</th>
              <th>Services</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>

          <tbody>
            {Projects.map((project: Project) => (
              <tr key={project._id}>
                <td className="font-medium">{project.name}</td>
                <td>{project.client}</td>
                <td className="capitalize">{project.status}</td>
                <td>{project.budget.toLocaleString()}</td>
                <td>{project.grossProfit.toLocaleString()}</td>
                <td>{project.netProfitToDate.toLocaleString()}</td>
                <td>
                  {project.employees.map((emp) => (
                    <div key={emp.employee._id}>
                      {emp.employee.name} ({emp.role})
                    </div>
                  ))}
                </td>
                <td>
                  {project.services.map((s) => (
                    <div key={s._id}>{s.name}</div>
                  ))}
                </td>
                <td>{new Date(project.startDate).toLocaleDateString()}</td>
                <td>{new Date(project.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProjectModal
        isOpen={addProjectIsOpen}
        setIsOpen={setAddProjectIsOpen}
      />
    </main>
  );
}
