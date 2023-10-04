import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  Landing,
  DashboardSharedLayout,
  Preview,
  Register,
  Login,
  EditLink,
  Admin,
  Profile,
  Links,
  Error,
} from "./pages";
import AddLink from "./pages/AddLink";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addLinkAction } from "./pages/AddLink";
import { loader as dashboardLoader } from "./pages/DashboardSharedLayout";
import { loader as linksLoader } from "./pages/Preview";
import { loader as editLoader } from "./pages/EditLink";
import { action as editAction } from "./pages/EditLink";
import { action as deleteAction } from "./pages/DeleteLink";
import { action as profileAction } from "./pages/Profile";
import { loader as adminLoader } from "./pages/Admin";

// dark theme function
export const getInitialDarkTheme = () => {
  const isDarkThemePreferred = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches; //true
  const getLocalStorageTheme = JSON.parse(
    localStorage.getItem("theme") || "false"
  ); // true
  const themeValue =
    getLocalStorageTheme === false
      ? getLocalStorageTheme
      : isDarkThemePreferred;
  document.body.classList.toggle("dark-theme", themeValue);
  return themeValue;
};

getInitialDarkTheme();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
      action: registerAction,
    },
    {
      path: "/login",
      element: <Login />,
      action: loginAction,
    },
    {
      path: "dashboard",
      element: <DashboardSharedLayout />,
      loader: dashboardLoader,
      children: [
        {
          index: true,
          element: <Preview />,
          loader: linksLoader,
        },
        {
          path: "links",
          element: <Links />,
          loader: linksLoader,
        },
        {
          path: "addLink",
          element: <AddLink />,
          action: addLinkAction,
        },
        {
          path: "editLink/:id",
          element: <EditLink />,
          action: editAction,
          loader: editLoader,
        },
        {
          path: "deleteLink/:id",
          action: deleteAction,
        },
        {
          path: "admin",
          element: <Admin />,
          loader: adminLoader,
        },
        {
          path: "profile",
          element: <Profile />,
          action: profileAction,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
