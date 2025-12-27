import { getAllClients } from "@/services/api/clients";
import { useQuery } from "@tanstack/react-query";

export default function UseClients() {
  const { data: getClients } = useQuery({
    queryKey: ["Clients"],
    queryFn: getAllClients,
  });
  return { getClients };
}
