import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Spinner from "../Components/Spinner/Spinner";

const PrivateRourte = ({ children }) => {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  if (userLoading) {
    return <Spinner></Spinner>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRourte;
