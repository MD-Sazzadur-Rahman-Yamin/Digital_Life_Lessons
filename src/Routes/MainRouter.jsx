import { createBrowserRouter } from "react-router";
import MainLandingLayout from "../Layouts/MainLandingLayout/MainLandingLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import Error from "../Components/Error/Error";
import Upgrade from "../Pages/Upgrade/Upgrade";
import PrivateRourte from "../Provider/PrivateRourte";
import UpgradeSuccessful from "../Pages/Upgrade/UpgradeSuccessful";
import UpgradeFailed from "../Pages/Upgrade/UpgradeFailed";
import Dashboard from "../Layouts/DashboardLayout/DashboardLayout";
import AddLesson from "../Pages/Dashboard/AddLesson/AddLesson";

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
            <UpgradeSuccessful></UpgradeSuccessful>
          </PrivateRourte>
        ),
      },
      {
        path: "upgrade-failed",
        element: (
          <PrivateRourte>
            <UpgradeFailed></UpgradeFailed>
          </PrivateRourte>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRourte>
        <Dashboard></Dashboard>
      </PrivateRourte>
    ),
    errorElement: <Error></Error>,
    children:[
      {
        path:'add-lesson',
        element:<AddLesson></AddLesson>
      }
    ]
  },
]);

export default router;
