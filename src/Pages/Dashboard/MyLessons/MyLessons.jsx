import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myAllLessons = [] } = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/my-lessons/${user.email}`);
      return res.data;
    },
  });
  console.log(myAllLessons);
  return (
    <div className="container bg-base-300 p-10! rounded-2xl min-h-screen">
      <h2 className="font-bold! text-center mb-4">My Lessons</h2>
      <div className="overflow-x-auto rounded-box border border-base-content bg-base-300">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {myAllLessons.map((lesson, index) => (
              <tr key={lesson._id || index}>
                <th>{index + 1}</th>
                <td>{lesson.title}</td>
                <td>{lesson.role || "Quality Control Specialist"}</td>
                <td>{lesson.color || "Blue"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
