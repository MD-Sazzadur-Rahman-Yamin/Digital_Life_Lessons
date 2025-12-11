import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

// this hook is use to get the copy user date form db
// anather vertion fo data is store in firebase auth (useAuth)
const useGetDbUserData = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: db_user, isLoading: db_user_Loading,refetch:db_user_refetch } = useQuery({
    queryKey: ["isPremium", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/me/${user.email}`);
      return res.data;
    },
  });
  return { db_user, db_user_Loading, db_user_refetch };
};

export default useGetDbUserData;
