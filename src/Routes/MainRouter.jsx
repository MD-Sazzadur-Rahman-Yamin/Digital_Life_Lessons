import { createBrowserRouter } from "react-router";
import MainLandingLayout from "../Layouts/MainLandingLayout/MainLandingLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import Error from "../Components/Error/Error";
import Upgrade from "../Pages/Upgrade/Upgrade";
import PrivateRourte from "../Provider/PrivateRourte";
import UpgradeSuccessful from "../Pages/Upgrade/UpgradeSuccessful";

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
      {
        path: "upgrade",
        element: (
          <PrivateRourte>
            <Upgrade></Upgrade>
          </PrivateRourte>
        ),
      },
      {
        path: "upgrade-successful",
        element: (
          <PrivateRourte>
            <UpgradeSuccessful></UpgradeSuccessful>,
          </PrivateRourte>
        ),
      },
    ],
  },
]);

export default router;
