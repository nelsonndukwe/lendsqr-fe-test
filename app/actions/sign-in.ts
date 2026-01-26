import apiClient from "@/lib/api-client";
import { User } from "@/types";

export const getUsers = async ():Promise<User[]> => {
  const users = await apiClient.get("status=200&delay=3000");

  return users.data;
};
