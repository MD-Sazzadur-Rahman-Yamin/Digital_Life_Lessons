import { createBrowserRouter } from "react-router";
import MainLandingLayout from "../Layouts/MainLandingLayout/MainLandingLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import Error from "../Components/Error/Error";
import Upgrade from "../Pages/Upgrade/Upgrade";
import PrivateRoute from "../Provider/PrivateRoute";
import UpgradeSuccessful from "../Pages/Upgrade/UpgradeSuccessful";
import UpgradeFailed from "../Pages/Upgrade/UpgradeFailed";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import AddLesson from "../Pages/Dashboard/AddLesson/AddLesson";
import MyLessons from "../Pages/Dashboard/MyLessons/MyLessons";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PublicLessons from "../Pages/PublicLessons/PublicLessons";
import LessonDetails from "../Pages/LessonDetails/LessonDetails";
import PremiumOnlyRouter from "../Provider/PremiumOnlyRouter";
import MyFavorites from "../Pages/Dashboard/MyFavorites/MyFavorites";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import ManageLessons from "../Pages/Dashboard/AdminDashboard/ManageLessons/ManageLessons";
import AdminOnlyRouter from "./AdminOnlyRouter";
import ReportedLessons from "../Pages/Dashboard/AdminDashboard/ReportedLessons/ReportedLessons";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLandingLayout></MainLandingLayout>,
//     errorElement: <Error></Error>,
//     children: [
//       {
//         index: true,
//         element: <Home></Home>,
//       },
//       {
//         path: "register",
//         element: <Register></Register>,
//       },
//       {
//         path: "login",
//         element: <Login></Login>,
//       },
//       {
//         path: "upgrade",
//         element: (
//           <PrivateRoute>
//             <Upgrade></Upgrade>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "upgrade-successful",
//         element: (
//           <PrivateRoute>
//             <UpgradeSuccessful></UpgradeSuccessful>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "upgrade-failed",
//         element: (
//           <PrivateRoute>
//             <UpgradeFailed></UpgradeFailed>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "public-lessons",
//         element: <PublicLessons></PublicLessons>,
//       },
//       {
//         path: "/lesson/Details/:id",
//         element: (
//           <PrivateRoute>
//             <PremiumOnlyRouter>
//               <LessonDetails></LessonDetails>
//             </PremiumOnlyRouter>
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
//   {
//     path: "dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout></DashboardLayout>
//       </PrivateRoute>
//     ),
//     errorElement: <Error></Error>,
//     children: [
//       {
//         path: "add-lesson",
//         element: <AddLesson></AddLesson>,
//       },
//       {
//         path: "my-lessons",
//         element: <MyLessons></MyLessons>,
//       },
//       {
//         path: "my-favorites",
//         element: <MyFavorites></MyFavorites>,
//       },
//       {
//         path: "profile",
//         element: <Profile></Profile>,
//       },
//       {
//         path: "admin",
//         element: (
//           <AdminOnlyRouter>
//             <AdminDashboard></AdminDashboard>
//           </AdminOnlyRouter>
//         ),
//         children: [
//           {
//             index: true,
//             element: <AdminHome></AdminHome>,
//           },
//           {
//             path: "manage-users",
//             element: <ManageUsers></ManageUsers>,
//           },
//           {
//             path: "manage-lessons",
//             element: <ManageLessons></ManageLessons>,
//           },
//           {
//             path: "reported-lessons",
//             element: <ReportedLessons></ReportedLessons>,
//           },
//         ],
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLandingLayout />,
    errorElement: <Error />, // root-level error for loader/action errors
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "upgrade",
        element: (
          <PrivateRoute>
            <Upgrade />
          </PrivateRoute>
        ),
      },
      {
        path: "upgrade-successful",
        element: (
          <PrivateRoute>
            <UpgradeSuccessful />
          </PrivateRoute>
        ),
      },
      {
        path: "upgrade-failed",
        element: (
          <PrivateRoute>
            <UpgradeFailed />
          </PrivateRoute>
        ),
      },
      { path: "public-lessons", element: <PublicLessons /> },
      {
        path: "/lesson/Details/:id",
        element: (
          <PrivateRoute>
            <PremiumOnlyRouter>
              <LessonDetails />
            </PremiumOnlyRouter>
          </PrivateRoute>
        ),
      },

      // ✅ catch-all for unmatched routes under main layout
      { path: "*", element: <Error /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "profile", element: <Profile /> },
      {
        path: "admin",
        element: (
          <AdminOnlyRouter>
            <AdminDashboard />
          </AdminOnlyRouter>
        ),
        children: [
          { index: true, element: <AdminHome /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-lessons", element: <ManageLessons /> },
          { path: "reported-lessons", element: <ReportedLessons /> },
          // ✅ catch-all for unmatched admin routes
          { path: "*", element: <Error /> },
        ],
      },
      // ✅ catch-all for unmatched dashboard routes
      { path: "*", element: <Error /> },
    ],
  },
  // ✅ global catch-all for any unmatched URL
  { path: "*", element: <Error /> },
]);

export default router;
