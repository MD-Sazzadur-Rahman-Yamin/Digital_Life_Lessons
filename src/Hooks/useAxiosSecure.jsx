import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const AxiosSecure = axios.create({
  baseURL: "http://localhost:3333",
});
const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const reqInterceptor = AxiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    return ()=>{
        AxiosSecure.interceptors.request.eject(reqInterceptor);
    }
  }, [user]);
  return AxiosSecure;
};

export default useAxiosSecure;
