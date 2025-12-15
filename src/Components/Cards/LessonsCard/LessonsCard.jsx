import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useIsPremium from "../../../Hooks/useIsPremium";

const LessonsCard = ({ lesson }) => {
  const axiosSecure = useAxiosSecure();

  const { data: creatorData = {} } = useQuery({
    queryKey: ["LessonsCard", lesson.creatorUid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${lesson.creatorUid}`);
      return res.data;
    },
  });

  const { isPremium } = useIsPremium();
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{lesson.title || "no title"}</h2>
        <p>
          {lesson.story.split(" ").slice(0, 25).join(" ")}
          {lesson.accessLevel === "Premium" && !isPremium ? (
            <Link to={`/upgrade`} className="ml-2 text-[#FFD700]">
              Upgrade to view
            </Link>
          ) : (
            <Link
              to={`/lesson/Details/${lesson._id}`}
              className="ml-2 text-primary"
            >
              See more
            </Link>
          )}
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
          {format(lesson.createdAt, "dd-MM-yyyy")}{" "}
          <span className="badge badge-outline badge-primary">
            {formatDistanceToNow(lesson.createdAt, { addSuffix: true })}
          </span>
        </p>
        {/* creator info */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={creatorData.photoURL} alt="Profile" />
            </div>
          </div>
          <p>{creatorData.name}</p>
        </div>
        <div className="card-actions">
          {lesson.accessLevel === "Premium" && !isPremium ? (
            <Link className="w-full" to={`/upgrade`}>
              <button className="btn w-full bg-[#FFD700] text-black! hover:brightness-90">
                Premium Lesson - Upgrade to view
              </button>
            </Link>
          ) : (
            <Link className="w-full" to={`/lesson/Details/${lesson._id}`}>
              <button className="btn btn-primary w-full">See Details</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonsCard;
