"use client";
import DetailsCard from "@/components/details/Cards/DetailCard";
// import { getTotalProjects } from "@/services/api";
// import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // const { data, isError, error, isLoading } = useQuery({
  //   queryKey: ["Projects Count"],
  //   queryFn: getTotalProjects,
  // });

  return (
    <div>
      <div className="grid grid-cols-2 w-full lg:grid-cols-4 justify-center gap-4 ">
        <DetailsCard
          details="this is details"
          isError={false}
          title="this is title"
        />
      </div>
    </div>
  );
}
