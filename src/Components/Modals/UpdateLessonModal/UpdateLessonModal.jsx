import React, { useEffect, useState } from "react";
import useIsPremium from "../../../Hooks/useIsPremium";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateLessonModal = ({ modalRef, modalData }) => {
  const [updateLessonLoading, setUpdateLessonLoading] = useState(false);

  const isPremium = useIsPremium();
  const [category, setCategory] = useState([]);
  const [emotionalTone, setEmotionalTone] = useState([]);
  useEffect(() => {
    axios.get("/Category.json").then((result) => setCategory(result.data));
    axios
      .get("/EmotionalTone.json")
      .then((result) => setEmotionalTone(result.data));
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //add default value
  useEffect(() => {
    if (modalData) {
      reset({
        title: modalData.title || "",
        story: modalData.story || "",
        category: modalData.category || "",
        emotionalTone: modalData.emotionalTone || "",
        visibility: modalData.visibility || "",
        accessLevel: modalData.accessLevel || "",
      });
    }
  }, [modalData, reset]);

  // frontend will sent title, story, category, emotionalTone, visibility, accessLevel, updatedAt
  // const closeModal = () => {
  //   if (modalRef?.current) {
  //     modalRef.current.close();
  //   }
  // };
  const axiosSecure = useAxiosSecure();
  const handleUpdateLesson =async (data) => {
    setUpdateLessonLoading(true);
    const lessonInfo = {
      ...data,
      updatedAt: new Date(),
    };

    console.log(lessonInfo);
    axiosSecure
      .patch(`/lessons/${modalData?._id}`, lessonInfo)
      .then(() => {
        setUpdateLessonLoading(false);
        reset();
        toast.success("Lesson updated successfully");
      })
      .catch((err) => {
        setUpdateLessonLoading(false);

        console.error(err);
        toast.error("Failed to update lesson. Try again.");
      });
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h2 className="text-center">Update Lesson</h2>
        {/* <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"> */}
        <div className="card-body">
          <form onSubmit={handleSubmit(handleUpdateLesson)}>
            <fieldset className="fieldset">
              {/* Title */}
              <label className="label">Lesson Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Lesson Title"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="text-red-500 text-sm">Lesson Title is required</p>
              )}
              {/* story */}
              <label className="label">Story</label>
              <textarea
                className="textarea w-full min-h-80"
                placeholder="Story"
                {...register("story", { required: true })}
              ></textarea>
              {errors.story?.type === "required" && (
                <p className="text-red-500 text-sm">Story is required</p>
              )}
              {/* catagory */}
              <label className="label w-full">Category</label>
              <select
                className="select w-full"
                {...register("category", { required: true })}
              >
                <option disabled={true}>Category</option>
                {category.map((c) => (
                  <option key={c.id} value={c.options}>
                    {c.options}
                  </option>
                ))}
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-500 text-sm">Category is required</p>
              )}
              {/* tone */}
              <label className="label w-full">Emotional Tone</label>
              <select
                className="select w-full"
                {...register("emotionalTone", { required: true })}
              >
                <option disabled={true}>Emotional Tone</option>
                {emotionalTone.map((e) => (
                  <option key={e.id} value={e.options}>
                    {e.options}
                  </option>
                ))}
              </select>
              {errors.emotionalTone?.type === "required" && (
                <p className="text-red-500 text-sm">
                  Emotional Tone is required
                </p>
              )}
              {/* Visibility */}
              <label className="label w-full">Visibility</label>
              <select
                className="select w-full"
                {...register("visibility", { required: true })}
              >
                <option disabled={true}>Emotional Tone</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              {errors.visibility?.type === "required" && (
                <p className="text-red-500 text-sm">Visibility is required</p>
              )}
              {/* Access Level */}
              <label className="label w-full">Access Level</label>
              <select
                className="select w-full"
                {...register("accessLevel", { required: true })}
              >
                <option disabled={true}>Access Level</option>
                <option value="Public">Free</option>
                <option disabled={!isPremium} value="Private">
                  {isPremium
                    ? "Premium ⭐"
                    : "Upgrade to Premium to create paid lessons"}
                </option>
              </select>
              {errors.accessLevel?.type === "required" && (
                <p className="text-red-500 text-sm">Access Level is required</p>
              )}

              <button
                className="btn btn-primary mt-4"
                disabled={updateLessonLoading}
              >
                {updateLessonLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Add Lesson"
                )}
              </button>
            </fieldset>
          </form>
        </div>
        {/* </div> */}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-secondary">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateLessonModal;
