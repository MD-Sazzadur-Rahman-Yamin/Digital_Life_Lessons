import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useFetchMyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myAllLessons = [], refetch: refetchMyLessons } = useQuery({
    queryKey: ["my-lessons", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/my-lessons/${user.uid}`);
      return res.data;
    },
  });
  return { myAllLessons, refetchMyLessons };
};

export default useFetchMyLessons;
