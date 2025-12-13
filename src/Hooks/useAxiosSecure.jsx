import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

// const AxiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
// const useAxiosSecure = () => {
//   const { user, userLoading } = useAuth();
//   useEffect(() => {
//     const reqInterceptor = AxiosSecure.interceptors.request.use((config) => {
//       if (user.accessToken) {
//         config.headers.Authorization = `Bearer ${user.accessToken}`;
//       }
//       return config;
//     });
//     return () => {
//       AxiosSecure.interceptors.request.eject(reqInterceptor);
//     };
//   }, [user]);
//   return AxiosSecure;
// };

// export default useAxiosSecure;
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user?.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logout()
              .then(() => {
                console.log("Logged out due to token issue.");
              })
              .catch(console.error);
          }
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, logout]);

  return axiosInstance;
};
export default useAxiosSecure;
