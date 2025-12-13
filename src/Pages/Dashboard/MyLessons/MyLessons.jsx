import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import SeeStatsModal from "../../../Components/Modals/SeeStatsModal/SeeStatsModal";
import UpdateLessonModal from "../../../Components/Modals/UpdateLessonModal/UpdateLessonModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useFetchMyLessons from "../../../Hooks/useFetchMyLessons";

const MyLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { myAllLessons, refetchMyLessons } = useFetchMyLessons();

  // Stats modal
  const seeStatsModalRef = useRef();
  const [seeStatsModalData, setSeeStatsModalData] = useState(null);
  const openSeeStatsModal = (lesson) => {
    setSeeStatsModalData(lesson);
    seeStatsModalRef.current?.showModal();
  };

  // Update lesson modal
  const updateLessonModalRef = useRef();
  const [updateLessonModalData, setUpdateLessonModalData] = useState(null);
  const openUpdateLessonModal = (lesson) => {
    setUpdateLessonModalData(lesson);
    updateLessonModalRef.current?.showModal();
  };

  const deleteLesson = (id) => {
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
          .delete(`/lessons/${id}`)
          .then(() => {
            toast.success("Lesson deleted successfully");
            refetchMyLessons();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to delete lesson. Try again.");
          });
      }
    });
  };

  return (
    <div className="container mx-auto bg-base-300 p-10 rounded-2xl min-h-screen">
      <h2 className="font-bold text-center mb-4">My Lessons</h2>
      <div className="overflow-x-auto rounded-box border border-base-content bg-base-300">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Title</th>
              <th className="text-center">Lesson details</th>
              <th className="text-center">Stats</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myAllLessons.map((lesson, index) => (
              <tr key={lesson._id || index}>
                <th className="text-center">{index + 1}</th>
                <td className="text-center">{lesson.title}</td>
                <td className="text-center">
                  <Link to={`/lesson/Details/${lesson._id}`}>
                    <button className="btn btn-primary">Lesson details</button>
                  </Link>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => openSeeStatsModal(lesson)}
                  >
                    See Stats
                  </button>
                </td>
                <td className="flex justify-center items-center gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => openUpdateLessonModal(lesson)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => deleteLesson(lesson._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SeeStatsModal
        modalRef={seeStatsModalRef}
        modalData={seeStatsModalData}
      />
      <UpdateLessonModal
        refetch={refetchMyLessons}
        modalRef={updateLessonModalRef}
        modalData={updateLessonModalData}
      />
    </div>
  );
};

export default MyLessons;
