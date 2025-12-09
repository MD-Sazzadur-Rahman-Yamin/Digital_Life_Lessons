import axios from "axios";
import React, { useState } from "react";

const AddLesson = () => {
  const [category, setCategory] = useState([]);
  const [emotionalTone, setEmotionalTone] = useState([]);
  axios.get("/Category.json").then((result) => {
    setCategory(result.data);
  });
  axios.get("/EmotionalTone.json").then((result) => {
    setEmotionalTone(result.data);
  });
  return (
    <div className="container bg-base-300 p-10! rounded-2xl min-h-screen">
      <h2 className="font-bold! text-center">Add Lestion</h2>
      <form>
        <fieldset className="fieldset">
          {/* Title */}
          <label className="label">Lesson Title</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Lesson Title"
          />
          {/* story */}
          <label className="label">Story</label>
          <textarea
            className="textarea w-full min-h-80"
            placeholder="Story"
          ></textarea>
          {/* catagory */}
          <label className="label w-full">Category</label>
          <select defaultValue="Category" className="select w-full">
            <option disabled={true}>Category</option>
            {category.map((c) => (
              <option key={c.id} value={c.options}>
                {c.options}
              </option>
            ))}
          </select>
          {/* tone */}
          <label className="label w-full">Emotional Tone</label>
          <select defaultValue="Emotional Tone" className="select w-full">
            <option disabled={true}>Emotional Tone</option>
            {emotionalTone.map((e) => (
              <option key={e.id} value={e.options}>
                {e.options}
              </option>
            ))}
          </select>
          {/* Visibility */}
          <label className="label w-full">Visibility</label>
          <select defaultValue="Visibility" className="select w-full">
            <option disabled={true}>Emotional Tone</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          {/* Access Level */}
          <label className="label w-full">Access Level</label>
          <select defaultValue="Access Level" className="select w-full">
            <option disabled={true}>Access Level</option>
            <option value="Public">Free</option>
            <option value="Private">Premium ⭐</option>
          </select>

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddLesson;
