import { useParams } from "react-router-dom";
import { useRole, useSaveRole } from "../api/role-api.js";
import { useQueryClient } from "react-query";

export default function RoleEdit() {
  const { roleId } = useParams();
  const { data: role } = useRole(roleId);
  const queryClient = useQueryClient();
  const saveRole = useSaveRole(queryClient);

  return <div>RoleEdit</div>;
}
