import React, { useEffect, useState } from "react";
import app from "../firebase/firebase.init";
import AuthContext from "./AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setUserLoading(false);
      });
      return () => {
        unSubscribe();
      };
    }, []);
  const authData = { user, setUser, userLoading, setUserLoading };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
