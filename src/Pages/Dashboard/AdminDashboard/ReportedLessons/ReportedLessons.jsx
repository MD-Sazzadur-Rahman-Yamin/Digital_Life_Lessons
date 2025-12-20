import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import ReportedLessonsRow from "./ReportedLessonsRow";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allReportedLessons = [],refetch } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });
  console.log(allReportedLessons);

  const tableTitle = (
    <>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Reason</th>
        <th>Lesson details</th>
        <th>Take action</th>
      </tr>
    </>
  );

  return (
    <div className="container mx-auto bg-base-300 mt-4 p-10! rounded-2xl min-h-screen">
      <h2 className="text-center">Reported Lessons</h2>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>{tableTitle}</thead>
          <tbody>
            {allReportedLessons.map((lesson, index) => (
              <ReportedLessonsRow
                key={lesson._id}
                lesson={lesson}
                i={index}
                refetch={refetch}
              ></ReportedLessonsRow>
            ))}
          </tbody>
          <tfoot>{tableTitle}</tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportedLessons;
