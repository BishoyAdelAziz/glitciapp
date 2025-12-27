"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./services/api";
import Pagination from "@/components/Paginations/Pagination";
import { useState } from "react";
interface TEmployee {
  _id: string;
  name: string;
  email: string;
  departmentDetails: { _id: number; name: string; id: string }[];
  skillDetails: { _id: number; name: string; id: string }[];
  positionDetails: { _id: string; name: string; id: string }[];
  isActive: boolean;
}
export default function Employees() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const {
    data: employeesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees", page, limit],
    queryFn: () => getEmployees(page, limit),
    placeholderData: (previousData) => previousData,
  });
  console.log(employeesData);
  if (isLoading) {
    return (
      <main className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Employees</h3>
          <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg shadow-sm bg-gray-100 animate-pulse h-20"
            ></div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Employees</h3>
          <Link
            className="px-4 py-2 bg-accent rounded-md"
            href="/employees/add"
          >
            +
          </Link>
        </div>
        <div className="p-4 text-red-500 border border-red-300 rounded-lg bg-red-50">
          Error: {error.message}
        </div>
      </main>
    );
  }

  const { currentPage, pages, data: employees } = employeesData;

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Employees</h3>
        <Link
          className="px-4 py-2 text-white bg-accent rounded-md hover:bg-accent/90 transition-colors"
          href="/employees/add"
        >
          +
        </Link>
      </div>

      <section className="space-y-4 mb-8">
        {employees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No employees found. Add your first employee!
          </div>
        ) : (
          employees.map((employee: TEmployee) => (
            <div
              key={employee._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between h-full items-start">
                <div>
                  <h4 className="font-semibold">{employee.name}</h4>
                  <p className="text-gray-600">{employee.email}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    employee.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {employee.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {employee.departmentDetails?.map((dept) => (
                  <span
                    key={dept._id}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                  >
                    {dept.name}
                  </span>
                ))}
                {employee.positionDetails?.map((pos) => (
                  <span
                    key={pos._id}
                    className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
                  >
                    {pos.name}
                  </span>
                ))}
              </div>

              {employee.skillDetails?.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {employee.skillDetails.map((skill) => (
                      <span
                        key={skill._id}
                        className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={(newPage) => {
          setPage(newPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </main>
  );
}
