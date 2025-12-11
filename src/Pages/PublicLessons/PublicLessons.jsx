import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../Components/Spinner/Spinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LessonsCard from "../../Components/Cards/LessonsCard/LessonsCard";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { data: AllPublicLessons = [], isLoading: lessonLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });
  console.log(AllPublicLessons);
  return (
    <div className="container mx-auto">
      <h2 className="text-center my-10">Public Lessons</h2>
      {/* filter */}
      <div></div>
      <div className="section">
        {lessonLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AllPublicLessons.map((lesson) => (
              <LessonsCard key={lesson._id} lesson={lesson}></LessonsCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
