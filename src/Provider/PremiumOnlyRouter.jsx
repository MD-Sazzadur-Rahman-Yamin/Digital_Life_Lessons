import React from "react";
import useIsPremium from "../Hooks/useIsPremium";
import { Navigate } from "react-router";
import Spinner from "../Components/Spinner/Spinner";
import useFetchLessonDetails from "../Hooks/useFetchLessonDetails";

const PremiumOnlyRouter = ({ children }) => {
  const { isPremium, isPremiumLoading } = useIsPremium();
  const { lesson_detail, isLessonDetailLoading } = useFetchLessonDetails();

  if (isPremiumLoading || isLessonDetailLoading) {
    return <Spinner></Spinner>;
  }

  if (lesson_detail.accessLevel === "Premium" && !isPremium) {
    return <Navigate to="/upgrade"></Navigate>;
  }

  return children;
};

export default PremiumOnlyRouter;
