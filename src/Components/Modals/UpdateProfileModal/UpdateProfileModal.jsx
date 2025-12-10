import React, { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";

const UpdateProfileModal = ({ modalRef }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
      });
    }
  }, [user, reset]);

  const handleUpdateProfile = () => {
    console.log(UpdateProfileModal);
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
              {/* {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm">Lesson Title is required</p>
              )} */}

              {/* profile photo field */}
              <label className="label">Profile Photo</label>
              <input
                type="file"
                className="file-input"
                {...register("profilePhoto")}
              />
              {/* {errors.profilePhoto?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Profile photo is required
                </p>
              )} */}
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateProfileModal;
