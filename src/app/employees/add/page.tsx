"use client";

import EmployeeForm from "./components/EmployeeForm";

export default function AddEmployee() {
  return (
    <main>
      <h1 className="text-2xl my-[5vh] md:text-3xl text-primary font-[700] text-center">
        Add Employee
      </h1>
      <EmployeeForm />
    </main>
  );
}
