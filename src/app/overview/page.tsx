"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "./services/api";
export default function Overview() {
  const { data, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  console.log(error);
  console.log(data);
  console.log(isError);
  return <div>OverView Page</div>;
}
