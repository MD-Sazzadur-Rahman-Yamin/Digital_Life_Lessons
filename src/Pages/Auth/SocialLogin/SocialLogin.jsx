import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const axiosSecure = useAxiosSecure();

  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;

        // Prepare user info for backend
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        // Send to backend
        axiosSecure
          .post("/users/sync", userInfo)
          .then(() => {
            toast.success("Successfully signed in!");
            navigate(location?.state || "/");
          })
          .catch((err) => {
            console.error(err);
            toast.error("User sync failed");
          });
      })
      .catch((error) => {
        const code = error.code;

        if (code === "auth/popup-closed-by-user") {
          toast.error("You closed the popup too early");
        } else if (code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection");
        } else if (code === "auth/cancelled-popup-request") {
          toast.error("Popup cancelled. Try again");
        } else if (code === "auth/too-many-requests") {
          toast.error("Too many attempts. Try again later");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <div onClick={handleSignInWithGoogle}>
      <button className="btn btn-secondary w-full">
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
