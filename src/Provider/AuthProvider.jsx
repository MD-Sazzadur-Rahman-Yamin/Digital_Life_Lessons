import React from "react";
import app from "../firebase/firebase.config";
import AuthContext from "./AuthContext";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const authData = {};
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
