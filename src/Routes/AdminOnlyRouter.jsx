import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { useLocation } from "react-router";
import Spinner from "../Components/Spinner/Spinner";

const AdminOnlyRouter = ({ children }) => {
  const { user, userLoading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (userLoading || roleLoading) {
    return <Spinner></Spinner>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  if (role !== "admin") {
    return (
      <div className="flex justify-center items-center">
        <h2 className="font-extrabold text-9xl text-red-500">
          Access is forbidden
        </h2>
      </div>
    );
  }

  return children;
};

export default AdminOnlyRouter;
