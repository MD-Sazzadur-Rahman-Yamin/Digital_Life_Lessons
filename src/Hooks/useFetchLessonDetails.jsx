import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "./useAxiosSecure";

const useFetchLessonDetails = () => {
  const { id: lesson_Id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: lesson_detail = {}, isLoading: isLessonDetailLoading } =
    useQuery({
      queryKey: ["lesson_detail", lesson_Id],
      enabled: !!lesson_Id,
      queryFn: async () => {
        const res = await axiosSecure.get(`/lessons/${lesson_Id}`);
        return res.data;
      },
    });
  return { lesson_detail, isLessonDetailLoading, lesson_Id };
};

export default useFetchLessonDetails;
