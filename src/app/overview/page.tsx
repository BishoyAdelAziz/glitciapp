"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  DoughnutController,
} from "chart.js";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  DoughnutController
);

interface Employee {
  id: number;
  name: string;
  department: string;
  completionRate: number;
}

interface Project {
  id: number;
  name: string;
  department: string;
  budget: number;
  installments: number;
  income: number;
}

interface DashboardData {
  employees: Employee[];
  projects: Project[];
}

const ManagementDashboard = () => {
  // Sample data - replace with your API calls
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    employees: [
      { id: 1, name: "John Doe", department: "marketing", completionRate: 85 },
      { id: 2, name: "Jane Smith", department: "software", completionRate: 92 },
      {
        id: 3,
        name: "Mike Johnson",
        department: "marketing",
        completionRate: 78,
      },
      {
        id: 4,
        name: "Sarah Wilson",
        department: "software",
        completionRate: 88,
      },
      { id: 5, name: "Tom Brown", department: "marketing", completionRate: 95 },
    ],
    projects: [
      {
        id: 1,
        name: "Website Redesign",
        department: "marketing",
        budget: 50000,
        installments: 35000,
        income: 35000,
      },
      {
        id: 2,
        name: "Mobile App",
        department: "software",
        budget: 80000,
        installments: 65000,
        income: 65000,
      },
      {
        id: 3,
        name: "SEO Campaign",
        department: "marketing",
        budget: 30000,
        installments: 25000,
        income: 25000,
      },
      {
        id: 4,
        name: "CRM System",
        department: "software",
        budget: 120000,
        installments: 90000,
        income: 90000,
      },
      {
        id: 5,
        name: "Social Media",
        department: "marketing",
        budget: 20000,
        installments: 18000,
        income: 18000,
      },
    ],
  });

  const chartRefs = {
    departmentCapacity: useRef<HTMLCanvasElement>(null),
    departmentIncome: useRef<HTMLCanvasElement>(null),
    employeeCompletion: useRef<HTMLCanvasElement>(null),
    projectCompletion: useRef<HTMLCanvasElement>(null),
  };

  const chartInstances = useRef<{ [key: string]: Chart | null }>({
    departmentCapacity: null,
    departmentIncome: null,
    employeeCompletion: null,
    projectCompletion: null,
  });

  // Brand colors
  const colors = {
    primary: "#be2726",
    secondary: "#575757",
    tertiary: "#727272",
    primaryRgba: "rgba(190, 39, 38, 0.8)",
    secondaryRgba: "rgba(87, 87, 87, 0.8)",
    tertiaryRgba: "rgba(114, 114, 114, 0.8)",
  };

  // Calculate metrics
  const calculateMetrics = () => {
    const { employees, projects } = dashboardData;

    // Department capacity
    const marketingProjects = projects.filter(
      (p) => p.department === "marketing"
    ).length;
    const softwareProjects = projects.filter(
      (p) => p.department === "software"
    ).length;

    // Department income
    const marketingIncome = projects
      .filter((p) => p.department === "marketing")
      .reduce((sum, p) => sum + p.income, 0);
    const softwareIncome = projects
      .filter((p) => p.department === "software")
      .reduce((sum, p) => sum + p.income, 0);

    // Employee completion rates
    const employeeRates = employees.map((emp) => ({
      name: emp.name,
      rate: emp.completionRate,
    }));

    // Project completion rates
    const projectRates = projects.map((proj) => ({
      name: proj.name,
      rate: (proj.installments / proj.budget) * 100,
      department: proj.department,
    }));

    return {
      departmentCapacity: {
        marketing: marketingProjects,
        software: softwareProjects,
      },
      departmentIncome: {
        marketing: marketingIncome,
        software: softwareIncome,
      },
      employeeRates,
      projectRates,
    };
  };

  const metrics = calculateMetrics();

  const destroyChart = (chartKey: string) => {
    if (chartInstances.current[chartKey]) {
      chartInstances.current[chartKey]?.destroy();
      chartInstances.current[chartKey] = null;
    }
  };

  const createCharts = () => {
    const currentMetrics = calculateMetrics();

    // Destroy existing charts
    Object.keys(chartInstances.current).forEach(destroyChart);

    // 1. Department Capacity (Projects Count)
    if (chartRefs.departmentCapacity.current) {
      chartInstances.current.departmentCapacity = new Chart(
        chartRefs.departmentCapacity.current,
        {
          type: "doughnut",
          data: {
            labels: ["Marketing", "Software"],
            datasets: [
              {
                data: [
                  currentMetrics.departmentCapacity.marketing,
                  currentMetrics.departmentCapacity.software,
                ],
                backgroundColor: [colors.primary, colors.secondary],
                borderWidth: 3,
                borderColor: "#fff",
                hoverBorderWidth: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 20,
                  font: { size: 12, weight: "bold" },
                },
              },
              tooltip: {
                callbacks: {
                  label: (context: any) =>
                    `${context.label}: ${context.parsed} projects`,
                },
              },
            },
          },
        }
      );
    }

    // 2. Department Income
    if (chartRefs.departmentIncome.current) {
      chartInstances.current.departmentIncome = new Chart(
        chartRefs.departmentIncome.current,
        {
          type: "bar",
          data: {
            labels: ["Marketing", "Software"],
            datasets: [
              {
                label: "Income ($)",
                data: [
                  currentMetrics.departmentIncome.marketing,
                  currentMetrics.departmentIncome.software,
                ],
                backgroundColor: [colors.primaryRgba, colors.secondaryRgba],
                borderColor: [colors.primary, colors.secondary],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context: any) =>
                    `Income: $${context.parsed.y.toLocaleString()}`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value: any) => "$" + value.toLocaleString(),
                  font: { size: 11 },
                },
                grid: { color: "rgba(0,0,0,0.1)" },
              },
              x: {
                ticks: { font: { size: 12, weight: "bold" } },
                grid: { display: false },
              },
            },
          },
        }
      );
    }

    // 3. Employee Completion Rates
    if (chartRefs.employeeCompletion.current) {
      chartInstances.current.employeeCompletion = new Chart(
        chartRefs.employeeCompletion.current,
        {
          type: "bar",
          data: {
            labels: metrics.employeeRates.map((emp) => emp.name.split(" ")[0]), // First name only
            datasets: [
              {
                label: "Completion Rate (%)",
                data: metrics.employeeRates.map((emp) => emp.rate),
                backgroundColor: metrics.employeeRates.map((emp) =>
                  emp.rate >= 90
                    ? colors.primary
                    : emp.rate >= 80
                    ? colors.tertiary
                    : colors.secondary
                ),
                borderColor: metrics.employeeRates.map((emp) =>
                  emp.rate >= 90
                    ? colors.primary
                    : emp.rate >= 80
                    ? colors.tertiary
                    : colors.secondary
                ),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context: any) => `Completion: ${context.parsed.y}%`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: (value: any) => value + "%",
                  font: { size: 11 },
                },
                grid: { color: "rgba(0,0,0,0.1)" },
              },
              x: {
                ticks: {
                  font: { size: 10 },
                  maxRotation: 45,
                },
                grid: { display: false },
              },
            },
          },
        }
      );
    }

    // 4. Project Completion Rates
    if (chartRefs.projectCompletion.current) {
      chartInstances.current.projectCompletion = new Chart(
        chartRefs.projectCompletion.current,
        {
          type: "line",
          data: {
            labels: metrics.projectRates.map(
              (proj) => proj.name.split(" ")[0] + "..."
            ), // Shortened names
            datasets: [
              {
                label: "Completion Rate (%)",
                data: metrics.projectRates.map((proj) => proj.rate),
                borderColor: colors.primary,
                backgroundColor: colors.primaryRgba,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: metrics.projectRates.map((proj) =>
                  proj.department === "marketing"
                    ? colors.primary
                    : colors.secondary
                ),
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context: any) =>
                    `Completion: ${context.parsed.y.toFixed(1)}%`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: (value: any) => value + "%",
                  font: { size: 11 },
                },
                grid: { color: "rgba(0,0,0,0.1)" },
              },
              x: {
                ticks: {
                  maxRotation: 45,
                  font: { size: 10 },
                },
                grid: { display: false },
              },
            },
          },
        }
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(createCharts, 100);
    return () => {
      clearTimeout(timer);
      if (chartInstances.current) {
        Object.keys(chartInstances.current).forEach(destroyChart);
      }
    };
  }, [dashboardData]);

  const refreshData = () => {
    // Replace with your actual API endpoints
    console.log("Refreshing data from API...");
    // Example API calls:
    // const employees = await fetch('/api/employees').then(res => res.json());
    // const projects = await fetch('/api/projects').then(res => res.json());
    // setDashboardData({ employees, projects });

    createCharts();
  };

  const totalProjects = dashboardData.projects.length;
  const totalIncome = dashboardData.projects.reduce(
    (sum, p) => sum + p.income,
    0
  );
  const dashboardMetrics = calculateMetrics();
  const avgCompletionRate =
    dashboardMetrics.projectRates.reduce((sum, p) => sum + p.rate, 0) /
    dashboardMetrics.projectRates.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4 lg:p-6">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-4xl text-red-700 font-bold mb-2 tracking-tight">
            Analysis Overview
          </h3>
          <div className="w-20 h-1 bg-red-700 rounded-full"></div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-700 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide">
              Total Projects
            </h3>
            <div className="text-3xl font-bold text-red-700">
              {totalProjects}
            </div>
            <div className="text-xs text-gray-500 mt-1">Active projects</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-700 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide">
              Total Income
            </h3>
            <div className="text-3xl font-bold text-red-700">
              ${totalIncome.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">Revenue generated</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-700 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide">
              Active Employees
            </h3>
            <div className="text-3xl font-bold text-red-700">
              {dashboardData.employees.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Team members</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-700 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide">
              Avg Completion
            </h3>
            <div className="text-3xl font-bold text-red-700">
              {avgCompletionRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Overall progress</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Projects Capacity by Department */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-2 h-2 bg-red-700 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Projects Capacity by Department
              </h3>
            </div>
            <div className="relative h-80">
              <canvas ref={chartRefs.departmentCapacity}></canvas>
            </div>
          </div>

          {/* Income by Department */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-2 h-2 bg-red-700 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Income by Department
              </h3>
            </div>
            <div className="relative h-80">
              <canvas ref={chartRefs.departmentIncome}></canvas>
            </div>
          </div>

          {/* Employee Completion Rates */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-2 h-2 bg-red-700 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Employee Completion Rates
              </h3>
            </div>
            <div className="relative h-80">
              <canvas ref={chartRefs.employeeCompletion}></canvas>
            </div>
          </div>

          {/* Project Completion Rates */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-2 h-2 bg-red-700 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Project Completion Rates
              </h3>
            </div>
            <div className="relative h-80">
              <canvas ref={chartRefs.projectCompletion}></canvas>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={refreshData}
          className="fixed top-6 right-6 bg-white hover:bg-gray-50 text-red-700 text-sm font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-red-700"
        >
          <span className="mr-2">🔄</span>
          Refresh Data
        </button>

        {/* Department Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <div className="w-2 h-2 bg-red-700 rounded-full mr-3"></div>
              Marketing Department
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projects:</span>
                <span className="font-semibold text-red-700">
                  {metrics.departmentCapacity.marketing}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Income:</span>
                <span className="font-semibold text-red-700">
                  ${metrics.departmentIncome.marketing.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-700 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (metrics.departmentIncome.marketing /
                        (metrics.departmentIncome.marketing +
                          metrics.departmentIncome.software)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
              Software Department
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projects:</span>
                <span className="font-semibold text-gray-700">
                  {metrics.departmentCapacity.software}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Income:</span>
                <span className="font-semibold text-gray-700">
                  ${metrics.departmentIncome.software.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (metrics.departmentIncome.software /
                        (metrics.departmentIncome.marketing +
                          metrics.departmentIncome.software)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
