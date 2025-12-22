import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LessonsCard from "../../../Components/Cards/LessonsCard/LessonsCard";
import Spinner from "../../../Components/Spinner/Spinner";

const FeaturedLifeLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["featured-life-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
  });

  console.log(lessons);

  return (
    <div className="section">
      <h2 className="text-center my-4">Featured Life Lessons</h2>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <LessonsCard key={lesson._id} lesson={lesson}></LessonsCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedLifeLessons;
