import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import FavoritesRow from "./FavoritesRow";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myFavorites = [], refetch: refetchMyFavorites } = useQuery({
    queryKey: ["my-favorites", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get("/favorites");
      return res.data;
    },
  });

  console.log(myFavorites);

  const tableHead = (
    <>
      <tr>
        <th>#</th>
        <th>Lesson title</th>
        <th>Category</th>
        <th>emotional tone </th>
        <th>Lesson details</th>
        <th>Actions</th>

      </tr>
    </>
  );

  return (
    <div className="container mx-auto bg-base-300 p-10 rounded-2xl min-h-screen">
      <h2 className="font-bold text-center mb-4">My Favorites</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>{tableHead}</thead>
          <tbody>
            {/* row */}
            {myFavorites.map((f, i) => (
              <FavoritesRow
                key={f._id}
                f={f}
                i={i}
                refetchMyFavorites={refetchMyFavorites}
              ></FavoritesRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorites;
