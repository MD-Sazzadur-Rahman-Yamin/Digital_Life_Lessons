import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
    const profileImg = data.profilePhoto[0];
    registerUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        //store the image and get url
        const formData = new formData();
        formData.append("image", profileImg);
        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(image_api_url, formData).then((res) => {
          //update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              toast.success("Account created successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((err) => {
        console.log(err);

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

              <button className="btn btn-primary mt-4">Create account</button>
            </fieldset>
          </form>
          <p className="text-center">OR</p>
          <SocialLogin></SocialLogin>
          <p>
            Already have an account?
            <Link to="/login" className="text-primary ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
