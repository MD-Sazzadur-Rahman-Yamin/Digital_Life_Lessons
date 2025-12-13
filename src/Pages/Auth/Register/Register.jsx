import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    setRegisterLoading(true);
    const profileImg = data.profilePhoto[0];

    registerUser(data.email, data.password)
      .then((res) => {
        const FB_uid = res.user.uid;
        // store the image and get URL
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios
          .post(image_api_url, formData)
          .then((imgRes) => {
            const imageURL = imgRes.data.data.url;

            // update user profile
            const userProfile = {
              displayName: data.name,
              photoURL: imageURL,
            };

            updateUserProfile(userProfile)
              .then(() => {
                //data for save mongodb
                const userInfo = {
                  firebaseUid: FB_uid,
                  name: data.name,
                  email: data.email,
                  photoURL: imageURL,
                  createdAt: new Date(),
                };
                //send data to mengodb
                axiosSecure
                  .post("/users/sync", userInfo)
                  .then(() => {
                    setRegisterLoading(false);
                    toast.success("Account created successfully");
                    navigate(location?.state || "/");
                  })
                  .catch((err) => {
                    setRegisterLoading(false);
                    console.error(err);
                    toast.error("Server sync failed");
                  });
              })
              .catch((error) => {
                setRegisterLoading(false);
                console.error(error);
                toast.error("Could not update user profile");
              });
          })
          .catch((error) => {
            setRegisterLoading(false);
            console.error(error);
            toast.error("Image upload failed");
          });
      })
      .catch((err) => {
        console.log(err);
        setRegisterLoading(false);

        if (err.code === "auth/email-already-in-use") {
          toast.error("Email already in use. Try another one");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Invalid email format");
        } else if (err.code === "auth/weak-password") {
          toast.error("Weak password. Use at least 6 characters");
        } else if (err.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection");
        } else {
          toast.error("Something went wrong. Try again");
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h3>Create an Account</h3>
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* name field */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}

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

              {/* profile photo field */}
              <label className="label">Profile Photo</label>
              <input
                type="file"
                className="file-input"
                {...register("profilePhoto", { required: true })}
              />
              {errors.profilePhoto?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Profile photo is required
                </p>
              )}

              <button
                className="btn btn-primary mt-4"
                disabled={registerLoading}
              >
                {registerLoading ? (
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
            Already have an account?
            <Link
              state={location?.state}
              to="/login"
              className="text-primary ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
