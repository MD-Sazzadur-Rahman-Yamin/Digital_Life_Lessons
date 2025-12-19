import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UsersRow = ({ user, i, refetchUsers }) => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [] } = useQuery({
    queryKey: ["users-lessons", user?.firebaseUid],
    enabled: !!user?.firebaseUid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/lessons/${user.firebaseUid}`);
      return res.data;
    },
  });

  const handleMakeAdmin = () => {
    const roleInfo = { role: "admin" };

    axiosSecure.patch(`/users/role/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetchUsers();
        toast(`${user.name} marked as an Admin!`);
      }
    });
  };

  const handleRemoveAdmin = () => {
    const roleInfo = { role: "user" };

    axiosSecure.patch(`/users/role/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetchUsers();
        toast(`${user.name} is now a User`);
      }
    });
  };

  return (
    <tr key={user._id}>
      <th>{i + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{lessons.length}</td>
      <td>
        {user.role === "admin" ? (
          <button
            onClick={handleRemoveAdmin}
            className="btn btn-primary btn-outline hover:text-base-100"
          >
            Remove Admin
          </button>
        ) : (
          <button
            onClick={handleMakeAdmin}
            className="btn btn-primary btn-outline hover:text-base-100"
          >
            Make Admin
          </button>
        )}
      </td>
    </tr>
  );
};

export default UsersRow;
