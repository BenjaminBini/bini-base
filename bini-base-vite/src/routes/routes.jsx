import Users from "../components/Users.jsx";
import Roles from "../components/Roles.jsx";
import UserEdit from "../components/UserEdit.jsx";
import UserNew from "../components/UserNew.jsx";
import RoleEdit from "../components/RoleEdit.jsx";
import PublicHome from "../components/PublicHome.jsx";
import Shell from "../components/Shell.jsx";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../api/user-api.js";
import Logout from "../components/Logout.jsx";

const routes = [
  {
    path: "/",
    element: <Shell />,
    children: [
      {
        path: "",
        element: <PublicHome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "admin",
        element: <RoleChecker role="ADMIN" />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/new",
            element: <UserNew />,
          },
          {
            path: "users/:userId",
            element: <UserEdit />,
          },
          {
            path: "roles",
            element: <Roles />,
          },
          {
            path: "roles/new",
            element: <Roles />,
          },
          {
            path: "roles/:roleId",
            element: <RoleEdit />,
          },
        ],
      },
    ],
  },
];

function RoleChecker({ role }) {
  const { data: user, status } = useCurrentUser();
  if (user == null && status === "loading") {
    return <></>;
  }
  if (user == null && status !== "loading") {
    // Get current path
    const currentPath = window.location.pathname;
    return <Navigate to={`/login?redirect=${currentPath}`} />; // TODO : add redirect param to URL and manage redirection after login
  }
  if (user.roles.map((r) => r.code).includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />; // Show not authorized error
  }
}

export default routes;
