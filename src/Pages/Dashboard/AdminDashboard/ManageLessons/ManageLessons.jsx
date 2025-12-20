import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allLessons = [], refetch: refetchLessons } = useQuery({
    queryKey: ["manage-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lessons");
      return res.data;
    },
  });

  const handleDeleteLesson = (lesson) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/admin/manage-lessons/${lesson._id}`)
          .then((r) => {
            console.log(r);
            toast.success("Lesson deleted successfully");
            refetchLessons();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to delete lesson. Try again.");
          });
      }
    });
  };

  const handleToggleFeature = (lessonId, value) => {
    axiosSecure
      .patch(`/admin/manage-lessons/${lessonId}`, {
        isFeatured: value,
      })
      .then((r) => {
        console.log(r);
        toast.success(`Lesson ${value ? "feature" : "unfeature"} successfully`);
        refetchLessons();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete lesson. Try again.");
      });
  };

  const tableTitle = (
    <>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Lesson details</th>
        <th>Delete lesson</th>
        <th>Make featured</th>
      </tr>
    </>
  );

  return (
    <div className="container mx-auto bg-base-300 mt-4 p-10! rounded-2xl min-h-screen">
      <h2 className="text-center">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>{tableTitle}</thead>
          <tbody>
            {allLessons.map((lesson, i) => (
              <tr key={lesson._id}>
                <th>{i + 1}</th>
                <td>{lesson.title}</td>
                <td>
                  <Link to={`/lesson/Details/${lesson._id}`}>
                    <button className="btn btn-primary">Lesson details</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDeleteLesson(lesson)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {lesson.isFeatured ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleToggleFeature(lesson._id, false)}
                    >
                      Unfeature
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleToggleFeature(lesson._id, true)}
                    >
                      Feature
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>{tableTitle}</tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
