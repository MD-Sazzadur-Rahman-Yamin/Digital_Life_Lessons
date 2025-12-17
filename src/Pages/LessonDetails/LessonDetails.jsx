import React, { useRef, useState } from "react";
import { format } from "date-fns";
import Spinner from "../../Components/Spinner/Spinner";
import useFetchLessonDetails from "../../Hooks/useFetchLessonDetails";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoBookmarkOutline, IoHeartOutline } from "react-icons/io5";
import { LuView } from "react-icons/lu";
import { TbFlag3 } from "react-icons/tb";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import ReportModal from "../../Components/Modals/ReportModal/ReportModal";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const LessonDetails = () => {
  const { lesson_detail, lesson_Id } = useFetchLessonDetails();
  const axiosSecure = useAxiosSecure();
  const { data: creatorData = {} } = useQuery({
    queryKey: ["LessonsCard", lesson_detail.creatorUid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${lesson_detail.creatorUid}`);
      return res.data;
    },
  });

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [views] = useState(() => Math.floor(Math.random() * 10000));
  const shareUrl = `${
    import.meta.env.VITE_API_URL
  }/lesson/Details/${lesson_Id}`;

  const ReportModalRef = useRef();
  const [reportModalData, setReportModalData] = useState(null);
  const handleOpenReportModal = (lesson_detail) => {
    setReportModalData(lesson_detail);
    ReportModalRef.current?.showModal();
  };

  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const handleComment = (data) => {
    setAddCommentLoading(true);
    const commentData = {
      lessonId: lesson_detail._id,
      userUid: user.uid,
      commentText: data.comment,
      createdAt: new Date(),
    };
    console.log(commentData);

    axiosSecure
      .post("/comments", commentData)
      .then(() => {
        setAddCommentLoading(false);
        toast.success("Comment successfully");
        reset();
      })
      .catch((err) => {
        setAddCommentLoading(false);
        console.error(err);
        toast.error("Failed to add lesson. Try again.");
      });
  };

  return (
    <div className="section">
      <h2 className="text-center">{lesson_detail.title}</h2>
      <div className="flex justify-center items-center gap-4">
        <p>
          <span className="text-primary">Category:</span>{" "}
          {lesson_detail.category}
        </p>
        <p>
          <span className="text-primary">Emotional Tone:</span>{" "}
          {lesson_detail.emotionalTone}
        </p>
      </div>
      <p className="max-w-2xl mx-auto my-4 p-5 bg-base-200 rounded-2xl text-2xl">
        {lesson_detail.story}
      </p>
      <div className="max-w-2xl mx-auto flex flex-col gap-2">
        {/* mata data */}
        <div className="flex justify-center items-center gap-4">
          <p className="badge badge-outline badge-primary">
            <span>Created:</span>
            {format(lesson_detail.createdAt, "dd-MM-yyyy")}
          </p>
          <p className="badge badge-outline badge-primary">
            <span>Last Updated:</span>
            {format(lesson_detail.update, "dd-MM-yyyy")}
          </p>
          <p className="badge badge-outline badge-primary">
            <span>visibility:</span> {lesson_detail.visibility}
          </p>
        </div>
        {/* Stats & Engagement Interaction Buttons Section */}

        <div className="flex justify-center items-center gap-4 bg-base-200 rounded-2xl p-5">
          <span className="badge badge-outline badge-primary">
            <IoHeartOutline /> {lesson_detail.likesCount} Likes
          </span>
          <span className="badge badge-outline badge-primary">
            <IoBookmarkOutline />
            {lesson_detail.favoritesCount} favorites
          </span>
          <span className="badge badge-outline badge-primary">
            <LuView />
            {views} Views
          </span>
          <span
            className="badge badge-outline badge-primary cursor-pointer"
            onClick={() => handleOpenReportModal(lesson_detail)}
          >
            <TbFlag3 />
            Report
          </span>
        </div>
        {/* share section */}
        <div>
          <p className="text-center font-bold!">Share to:</p>
          <div className="flex justify-center items-center gap-4">
            <FacebookShareButton url={shareUrl} quote={lesson_detail.title}>
              <FacebookIcon size={40} round></FacebookIcon>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} quote={lesson_detail.title}>
              <TwitterIcon size={40} round></TwitterIcon>
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} quote={lesson_detail.title}>
              <LinkedinIcon size={40} round></LinkedinIcon>
            </LinkedinShareButton>
          </div>
        </div>
        {/* comments */}
        <div className="flex justify-center items-center flex-col gap-4 bg-base-200 rounded-2xl p-5">
          <div className="w-full">
            <form onSubmit={handleSubmit(handleComment)}>
              <label className="label">Leave your comment</label>
              <textarea
                className="textarea w-full min-h-40"
                placeholder="Comment"
                {...register("comment", { required: true })}
              ></textarea>
              {errors.Comment?.type === "required" && (
                <p className="text-red-500 text-sm">Pleace enter a Comment</p>
              )}
              <button
                className="btn btn-primary mt-4"
                disabled={addCommentLoading}
              >
                {addCommentLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Comment"
                )}
              </button>
            </form>
          </div>
          <div></div>
        </div>
        {/* Author / Creator Section */}
        <div className="flex justify-center items-center gap-4 bg-base-200 rounded-2xl p-5">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
              <img src={creatorData.photoURL} />
            </div>
          </div>
          <div>
            <h3>{creatorData.name}</h3>
            <button className="btn btn-primary">
              View all lessons by this author
            </button>
          </div>
        </div>
      </div>
      <ReportModal
        modalRef={ReportModalRef}
        modalData={reportModalData}
      ></ReportModal>
    </div>
  );
};

export default LessonDetails;
