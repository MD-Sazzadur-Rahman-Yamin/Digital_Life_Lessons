import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useIsPremium from "../../../Hooks/useIsPremium";
import { toast } from "react-toastify";

const AddLesson = () => {
  const isPremium = useIsPremium();
  const [category, setCategory] = useState([]);
  const [emotionalTone, setEmotionalTone] = useState([]);
  useEffect(() => {
    axios.get("/Category.json").then((result) => setCategory(result.data));
    axios
      .get("/EmotionalTone.json")
      .then((result) => setEmotionalTone(result.data));
  }, []);
  // frontend will sent title, story, category, emotionalTone, visibility, accessLevel,creatorEmail, createdAt, updatedAt
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddLesson = (data) => {
    const lessonInfo = {
      ...data,
      creatorEmail: user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(lessonInfo);

    axiosSecure
      .post("/lessons", lessonInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Lesson added successfully");
        } else {
          toast.success("Lesson saved");
        }

        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add lesson. Try again.");
      });
  };

  return (
    <div className="container bg-base-300 p-10! rounded-2xl min-h-screen">
      <h2 className="font-bold! text-center">Add Lestion</h2>
      <form onSubmit={handleSubmit(handleAddLesson)}>
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
            defaultValue="Category"
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
            defaultValue="Emotional Tone"
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
            <p className="text-red-500 text-sm">Emotional Tone is required</p>
          )}
          {/* Visibility */}
          <label className="label w-full">Visibility</label>
          <select
            defaultValue="Visibility"
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
            defaultValue="Access Level"
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

          <button className="btn btn-neutral mt-4">Add Lesson</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLesson;
