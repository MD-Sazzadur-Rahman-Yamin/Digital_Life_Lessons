import React, { useEffect, useRef, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import Spinner from "../../Components/Spinner/Spinner";
import useFetchLessonDetails from "../../Hooks/useFetchLessonDetails";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5";
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
import LessonsCard from "../../Components/Cards/LessonsCard/LessonsCard";

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

  // * likes
  const [isLiked, setIsLiked] = useState(
    lesson_detail?.likes?.includes(user?.uid)
  );
  const [likesCount, setLikesCount] = useState(lesson_detail?.likesCount || 0);
  const handleLike = async () => {
    const prev = isLiked;
    setIsLiked(!prev);
    setLikesCount(prev ? likesCount - 1 : likesCount + 1);

    try {
      await axiosSecure.patch(`/lessons/${lesson_detail._id}/like`);
    } catch {
      setIsLiked(prev);
      setLikesCount(prev ? likesCount + 1 : likesCount - 1);
      toast.error("Failed to update like");
    }
  };

  // * favorites
  const [isFavorite, setIsFavorite] = useState(
    lesson_detail?.isFavorite || false
  );
  const [favoritesCount, setFavoritesCount] = useState(
    lesson_detail?.favoritesCount || 0
  );

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await axiosSecure.get(
          `/favorites/check?lessonId=${lesson_detail._id}`
        );
        setIsFavorite(res.data.isFavorite);
      } catch (err) {
        console.error(err);
      }
    };

    if (lesson_detail?._id) checkFavorite();
  }, [lesson_detail, axiosSecure]);

  const handleFavorite = async () => {
    const prev = isFavorite;
    setIsFavorite(!prev);
    setFavoritesCount(prev ? favoritesCount - 1 : favoritesCount + 1);

    try {
      await axiosSecure.patch(`/lessons/${lesson_detail._id}/favorite`);
    } catch {
      setIsFavorite(prev);
      setFavoritesCount(prev ? favoritesCount + 1 : favoritesCount - 1);
      toast.error("Failed to update favorite");
    }
  };

  //* report
  const ReportModalRef = useRef();
  const [reportModalData, setReportModalData] = useState(null);
  const handleOpenReportModal = (lesson_detail) => {
    setReportModalData(lesson_detail);
    ReportModalRef.current?.showModal();
  };

  //* comments
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const handleComment = (data) => {
    setAddCommentLoading(true);
    const commentData = {
      lessonId: lesson_detail._id,
      userUid: user.uid,
      userName: user.displayName,
      commentText: data.comment,
      createdAt: new Date(),
    };

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

  const [toggleComment, setToggleComment] = useState(false);
  const { data: comments = [] } = useQuery({
    queryKey: ["lesson_comment", lesson_detail._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${lesson_detail._id}`);
      return res.data;
    },
  });

  const {
    data: recommendedLessons = [],
    isLoading: isRecommendedLessonLoading,
  } = useQuery({
    queryKey: ["recommended-lessons", lesson_detail._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/recommended/${lesson_detail._id}`
      );
      return res.data;
    },
  });

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
          <span
            className={`badge  cursor-pointer ${
              isLiked ? "badge-primary" : "badge-outline"
            }`}
            onClick={handleLike}
          >
            {isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
            {likesCount} Likes
          </span>
          <span
            className={`badge cursor-pointer ${
              isFavorite ? "badge-primary" : "badge-outline"
            }`}
            onClick={handleFavorite}
          >
            {isFavorite ? <IoBookmark /> : <IoBookmarkOutline />}
            {favoritesCount} favorites
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
                className="textarea w-full min-h-20"
                placeholder="Comment"
                {...register("comment", { required: true })}
              ></textarea>
              {errors.Comment?.type === "required" && (
                <p className="text-red-500 text-sm">Pleace enter a Comment</p>
              )}
              <button
                className="btn btn-primary mt-4 w-full"
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
          <button
            className="btn btn-primary btn-outline"
            onClick={() => setToggleComment(!toggleComment)}
          >
            Show Comment
          </button>
          {toggleComment && (
            <div className="bg-base-100 w-full rounded">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div key={c._id}>
                    <div className="bg-base-200 p-1 flex items-center justify-between">
                      <p>{c.userName}</p>
                      <p>
                        {formatDistanceToNow(c.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    <div className="p-2">{c.commentText}</div>
                  </div>
                ))
              ) : (
                <p className="text-center my-1">No comment</p>
              )}
            </div>
          )}
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
      {/* recommended Lessons */}
      <div className="section">
        <h2 className="text-center mb-1">Recommended Lessons</h2>
        <div>
          {isRecommendedLessonLoading ? (
            <Spinner></Spinner>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedLessons.map((lesson) => (
                <LessonsCard key={lesson._id} lesson={lesson}></LessonsCard>
              ))}
            </div>
          )}
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
