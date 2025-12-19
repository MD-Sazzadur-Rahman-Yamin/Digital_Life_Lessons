import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UsersRow from "./UsersRow";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [],refetch:refetchUsers } = useQuery({
    queryKey: ["manage-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/manage-users");
      return res.data;
    },
  });

  const tableHead = (
    <>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Total lessons</th>
        <th>Action</th>
      </tr>
    </>
  );

  return (
    <div className="container mx-auto bg-base-300 mt-4 p-10! rounded-2xl min-h-screen">
      <h2 className="text-center my-4">Manage Users</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>{tableHead}</thead>
          <tbody>
            {/* row */}
            {allUsers.map((user, i) => (
              <UsersRow
                key={user._id}
                user={user}
                refetchUsers={refetchUsers}
                i={i}
              ></UsersRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
