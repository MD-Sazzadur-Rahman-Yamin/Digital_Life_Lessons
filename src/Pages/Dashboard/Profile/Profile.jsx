import React, { useRef } from "react";
import useAuth from "../../../Hooks/useAuth";
import useIsPremium from "../../../Hooks/useIsPremium";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UpdateProfileModal from "../../../Components/Modals/UpdateProfileModal/UpdateProfileModal";

const Profile = () => {
  const { user } = useAuth();
  const isPremium = useIsPremium();
  const axiosSecure = useAxiosSecure();

  const { data: myAllLessons = [] } = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/my-lessons/${user.email}`);
      return res.data;
    },
  });

  const updateProfileModalRef = useRef();
  const handleUpdateProfile = () => {
    updateProfileModalRef?.current.showModal();
  };

  return (
    <div className="container mx-auto bg-base-300 p-10! rounded-2xl min-h-screen">
      <h2 className="text-center mb-4">My Profile</h2>
      <div className="flex justify-between items-center flex-col xl:flex-row">
        <div className="flex-1 flex flex-col justify-center items-center gap-4 p-4 xl:border-r-4">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 sm:w-xs rounded-full ring-2 ring-offset-2">
              <img src={user.photoURL} />
            </div>
          </div>
          {isPremium && <div className="badge badge-primary">Premium ⭐</div>}
          <button onClick={handleUpdateProfile} className="btn btn-secondary">
            Update Profile
          </button>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="font-black! text-center xl:text-start">
            {user.displayName}
          </h3>
          <p className="text-center xl:text-start text-2xl">
            Email: {user.email}
          </p>
          <div className="stats">
            <div className="stat">
              <div className="stat-title text-center">
                Total lessons created
              </div>
              <div className="stat-value text-center">
                {myAllLessons.length}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-center">Total lessons saved</div>
              <div className="stat-value text-center">TODO</div>
            </div>
          </div>
        </div>
      </div>
      <UpdateProfileModal modalRef={updateProfileModalRef}></UpdateProfileModal>
    </div>
  );
};

export default Profile;
