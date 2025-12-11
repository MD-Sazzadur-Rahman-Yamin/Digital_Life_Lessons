import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useGetDbUserData from "../../../Hooks/useGetDbUserData";
import { toast } from "react-toastify";

const UpdateProfileModal = ({ modalRef }) => {
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const { user, updateUserProfile } = useAuth();
  const { db_user_refetch } = useGetDbUserData();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
      });
    }
  }, [user, reset]);

  const handleUpdateProfile = async (data) => {
    try {
      setUpdateProfileLoading(true);
      const DbUser = await db_user_refetch();
      const userId = DbUser?.data?._id;

      const updatedData = {};

      // name
      if (data.name) {
        updatedData.displayName = data.name;
      }

      // photo upload
      if (data.profilePhoto?.length > 0) {
        const formData = new FormData();
        formData.append("image", data.profilePhoto[0]);

        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        // MUST await this
        const imgRes = await axios.post(image_api_url, formData);

        updatedData.photoURL = imgRes.data.data.url;
      }

      if (Object.keys(updatedData).length === 0) {
        toast("Nothing to update.");
        setUpdateProfileLoading(false);
        return;
      }

      // update firebase profile
      await updateUserProfile(updatedData);
      await axiosSecure.patch(`/users/update/${userId}`, updatedData);

      db_user_refetch();
      setUpdateProfileLoading(false);
      document.getElementById("updateProfileModal").close();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateProfileLoading(false);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <dialog
      ref={modalRef}
      id="updateProfileModal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {/* Main Content */}
        <div>
          <h2 className="text-center">Update Profile</h2>

          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Name"
                {...register("name")}
              />

              {/* profile photo field */}
              <label className="label">Profile Photo</label>
              <input
                type="file"
                className="file-input"
                {...register("profilePhoto")}
              />

              <button
                className="btn btn-primary mt-4"
                disabled={updateProfileLoading}
              >
                {updateProfileLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateProfileModal;
