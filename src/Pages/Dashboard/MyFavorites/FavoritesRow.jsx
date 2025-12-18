import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const FavoritesRow = ({ f, i, refetchMyFavorites }) => {
  const axiosSecure = useAxiosSecure();
  const { data: lesson = {} } = useQuery({
    queryKey: ["Favorites-lesson-data", f.lessonId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${f.lessonId}`);
      return res.data;
    },
  });
  console.log(lesson);

const handleRemoveFromFavorites = () => {
  axiosSecure
    .delete(`/favorites/${f._id}`)
    .then(() => {
      toast.success("Removed from favorites");
      refetchMyFavorites();
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to remove from favorites");
    });
};


  return (
    <tr>
      <th>{i + 1}</th>
      <td>{lesson.title}</td>
      <td>{lesson.category}</td>
      <td>{lesson.emotionalTone}</td>
      <td>
        <Link to={`/lesson/Details/${f.lessonId}`}>
          <button className="btn btn-primary">Lesson details</button>
        </Link>
      </td>
      <td>
        <button className="btn btn-primary" onClick={handleRemoveFromFavorites}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default FavoritesRow;
