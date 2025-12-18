import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = "user", isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user.uid],
    enabled: !!user.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.uid}`);
      return res.data.role;
    },
  });
  return { role, roleLoading };
};

export default useRole;
