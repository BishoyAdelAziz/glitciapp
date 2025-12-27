import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/services/api/services";
export default function useServices() {
  const {
    data: services,
    isPending: servicesIsPending,
    isError: servicesIsError,
    error: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(),
  });
  return {
    services,
    servicesIsPending,
    servicesIsError,
    servicesError,
  };
}
