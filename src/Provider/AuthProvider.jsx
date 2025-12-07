import React, { useEffect, useState } from "react";
import app from "../firebase/firebase.init";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  //states
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  //create user with email and password
  const registerUser = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user with email and password
  const loginUser = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //sign in with google
  const signInWithGoogle = () => {
    setUserLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  //update profile info
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //logout
  const logout = () => {
    setUserLoading(true);
    return signOut(auth);
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authData = {
    user,
    setUser,
    userLoading,
    setUserLoading,
    signInWithGoogle,
    logout,
    registerUser,
    loginUser,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
