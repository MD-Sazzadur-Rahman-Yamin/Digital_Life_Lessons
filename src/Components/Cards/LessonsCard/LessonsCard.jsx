import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LessonsCard = ({ lesson }) => {
  const axiosSecure = useAxiosSecure();
  console.log(lesson);
  const { data: creatorData = {} } = useQuery({
    queryKey: ["LessonsCard", lesson.creatorEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${lesson.creatorEmail}`);
      return res.data;
    },
  });
  console.log(creatorData);
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{lesson.title || "no title"}</h2>
        <p>
          {lesson.story.split(" ").slice(0, 25).join(" ")}
          <Link
            to={`/lesson/Details/${lesson._id}`}
            className="ml-2 text-primary"
          >
            See more
          </Link>
        </p>
        <p>
          <span className="font-bold! text-accent">Category:</span>{" "}
          {lesson.category}
        </p>
        <p>
          <span className="font-bold! text-accent">Emotional Tone :</span>{" "}
          {lesson.emotionalTone}
        </p>
        <p>
          <span className="font-bold! text-accent">Created Date :</span>{" "}
          {format(lesson.createdAt, "dd-mm-yyyy")}{" "}
          <span className="badge badge-outline badge-primary">
            {formatDistanceToNow(lesson.createdAt, { addSuffix: true })}
          </span>
        </p>
        {/* creator info */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img
                src={creatorData.photoURL}
                alt="Tailwind-CSS-Avatar-component"
              />
            </div>
          </div>
          <p>{creatorData.displayName}</p>
        </div>
        <div className="card-actions">
          <Link className="w-full" to={`/lesson/Details/${lesson._id}`}>
            <button className="btn btn-primary w-full">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonsCard;
