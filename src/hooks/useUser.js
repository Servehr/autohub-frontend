import { fetchProfile } from "@/apis/user";
import { useQuery } from "react-query";

export default function useUser() {
  const token = localStorage.getItem("token");

  return useQuery("user", fetchProfile, {
    enabled: !!token,
    staleTime: Infinity,
  });
}
