import Shell from "../components/Shell.jsx";
import Home from "../components/Home.jsx";
import Users from "../components/Users.jsx";
import Roles from "../components/Roles.jsx";
import UserEdit from "../components/UserEdit.jsx";
import UserNew from "../components/UserNew.jsx";
import RoleEdit from "../components/RoleEdit.jsx";

const routes = [
  {
    path: "/",
    element: <Shell />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "admin",
        children: [
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

export default routes;
