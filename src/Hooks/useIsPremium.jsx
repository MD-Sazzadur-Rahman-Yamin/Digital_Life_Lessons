import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useIsPremium = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: isPremium = false, isLoading: isPremiumLoading } = useQuery({
    queryKey: ["isPremium", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/me/${user.uid}`);
      return res.data?.isPremium;
    },
  });
  return { isPremium, isPremiumLoading };
};

export default useIsPremium;
