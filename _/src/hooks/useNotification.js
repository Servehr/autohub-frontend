import { useQuery } from "react-query";
import useUser from "./useUser";
import { fetchNotifications } from "@/apis/user";

export default function useNotification() {
  const { data: user } = useUser();

  if (user) {
    return useQuery("notification", () => fetchNotifications(user.id));
  }

  return undefined;
}
