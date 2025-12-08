import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [loginLoading,setLoginLoading] = useState(false)
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    setLoginLoading(true);
    loginUser(data.email, data.password)
      .then(() => {
        setLoginLoading(false);
        toast.success("Logged in successfully");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
        setLoginLoading(false``);
        if (err.code === "auth/user-not-found") {
          toast.error("No account found with this email");
        } else if (err.code === "auth/wrong-password") {
          toast.error("Incorrect password");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Invalid email address");
        } else if (err.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet");
        } else {
          toast.error("Login failed. Try again");
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3>Welcome Back</h3>
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* email field */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}

              {/* password field */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
                })}
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-sm">
                  Password must contain both uppercase and lowercase letters
                </p>
              )}
              <button className="btn btn-primary mt-4" disabled={loginLoading}>
                {loginLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create account"
                )}
              </button>
            </fieldset>
          </form>
          <p className="text-center">OR</p>
          <SocialLogin></SocialLogin>
          <p>
            Don't Have an Account?
            <Link
              state={location?.state}
              to="/register"
              className="text-primary ml-1"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
