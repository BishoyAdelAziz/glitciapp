import { createProject, getAllProjects } from "@/services/api/projects";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProjecs = () => {
  const { data: Projects } = useQuery({
    queryKey: ["Projects"],
    queryFn: getAllProjects,
  });
  const {
    mutate: createProjectMutation,
    error: createProjectError,
    isError: createProjectIsError,
    isPending: createProjectIsPending,
  } = useMutation({
    mutationKey: ["createProject"],
    mutationFn: createProject,
  });
  return {
    Projects,
    createProjectError,
    createProjectMutation,
    createProjectIsError,
    createProjectIsPending,
  };
};
