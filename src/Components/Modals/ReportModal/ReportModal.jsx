import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ReportModal = ({ modalRef, modalData }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reportLessonLoading, setReportLessonLoading] = useState(false);

  const [reportReason, setReportReason] = useState([]);
  useEffect(() => {
    axios
      .get("/ReportReason.json")
      .then((result) => setReportReason(result.data));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleReportLesson = (data) => {
    setReportLessonLoading(true);
    const reportData = {
      lessonId: modalData._id,
      title: modalData.title,
      reporterUid: user.uid,
      reason: data.reason,
      timestamp: new Date(),
    };
    // console.log(reportData);

    axiosSecure
      .post(`/lessons/${modalData._id}/report`, reportData)
      .then(() => {
        setReportLessonLoading(false);
        reset();
        document.getElementById("ReportModal").close();
        toast.success("Report the lesson successfully");
      })
      .catch((err) => {
        setReportLessonLoading(false);
        console.error(err);
        toast.error("Failed to report lesson. Try again.");
      });
  };

  return (
    <dialog
      ref={modalRef}
      id="ReportModal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2>Report this lesson</h2>
        <form onSubmit={handleSubmit(handleReportLesson)}>
          <fieldset className="fieldset">
            <label className="label w-full">Reason</label>

            <select
              className="select w-full"
              {...register("reason", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Select a reason
              </option>

              {reportReason.map((c) => (
                <option key={c.id} value={c.options}>
                  {c.options}
                </option>
              ))}
            </select>

            {errors.reason && (
              <p className="text-red-500 text-sm">Reason is required</p>
            )}

            <button
              className="btn btn-primary mt-4"
              disabled={reportLessonLoading}
            >
              {reportLessonLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit Report"
              )}
            </button>
          </fieldset>
        </form>
      </div>
    </dialog>
  );
};

export default ReportModal;
