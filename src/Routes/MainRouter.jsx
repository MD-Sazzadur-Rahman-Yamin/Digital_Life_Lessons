import { createBrowserRouter } from "react-router";
import MainLandingLayout from "../Layouts/MainLandingLayout/MainLandingLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import Error from "../Components/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLandingLayout></MainLandingLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
