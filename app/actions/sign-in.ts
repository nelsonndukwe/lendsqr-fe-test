import apiClient from "@/lib/api-client";
import { User } from "@/types";

export const getUsers = async ():Promise<User[]> => {
  const users = await apiClient.get("/users");

  return users.data;
};
