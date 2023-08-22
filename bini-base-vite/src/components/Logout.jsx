import { Navigate } from "react-router-dom";
import { useQueryClient } from "react-query";

export default function Logout() {
  // Empty token in session storage and redirect to login page
  window.localStorage.setItem("token", "");
  const queryClient = useQueryClient();
  queryClient.invalidateQueries();
  queryClient.clear();
  return <Navigate to="/login" />;
}
