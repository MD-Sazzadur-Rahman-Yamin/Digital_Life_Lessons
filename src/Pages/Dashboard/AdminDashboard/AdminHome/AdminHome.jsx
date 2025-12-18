import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [] } = useQuery({
    queryKey: ["manage-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/manage-users");
      return res.data;
    },
  });

  const { data: allLessons = [] } = useQuery({
    queryKey: ["manage-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/manage-lessons");
      return res.data;
    },
  });

  return (
    <div className="container mx-auto bg-base-300 mt-4 p-10! rounded-2xl min-h-screen">
      <h2 className="text-center">Admin Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-2">
        <div className="bg-base-100 p-20 flex flex-col justify-center items-center rounded-2xl">
          <h4>Total users: {allUsers.length}</h4>
        </div>
        <div className="bg-base-100 p-20 flex flex-col justify-center items-center rounded-2xl">
          <h4>Total lessons: {allLessons.length}</h4>
        </div>
        <div className="bg-base-100 p-20 flex flex-col justify-center items-center rounded-2xl">
          <h4>Total users: {allUsers.length}</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
