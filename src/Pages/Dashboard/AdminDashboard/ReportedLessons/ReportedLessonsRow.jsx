import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ReportedLessonsRow = ({ lesson, i, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleResolve = async (type) => {
    try {
      // delete lesson if admin chooses delete
      if (type === "delete") {
        await axiosSecure.delete(`/lessons/${lesson.lessonId}`);
        toast.success("Lesson deleted successfully");
      }

      // resolve the report (for both delete & ignore)
      await axiosSecure.delete(`/admin/reported-lessons/${lesson._id}/delete`);

      if (type === "ignore") {
        toast.success("Report ignored successfully");
      }
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <tr>
      <th>{i + 1}</th>
      <td>{lesson?.title}</td>
      <td>{lesson.reason}</td>
      <td>
        <Link to={`/lesson/Details/${lesson.lessonId}`}>
          <button className="btn btn-primary">Lesson details</button>
        </Link>
      </td>
      <td className="flex items-center gap-4">
        <button
          className="btn btn-primary"
          onClick={() => handleResolve("delete")}
        >
          Delete Lesson
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleResolve("ignore")}
        >
          Ignore
        </button>
      </td>
    </tr>
  );
};

export default ReportedLessonsRow;
