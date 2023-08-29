import MenuItem from "./MenuItem.jsx";
import {
  IconCertificate,
  IconHome,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

export default function Menu() {
  return (
    <>
      <MenuItem
        to="/"
        label="Home"
        icon={<IconHome size={16} stroke={1.5} />}
      />
      <MenuItem
        to="/admin/teams"
        label="Teams"
        icon={<IconUsers size={16} stroke={1.5} />}
      />
      <MenuItem
        to="/admin/users"
        label="Users"
        icon={<IconUser size={16} stroke={1.5} />}
      />
      <MenuItem
        to="/admin/roles"
        label="Roles"
        icon={<IconCertificate size={16} stroke={1.5} />}
      />
    </>
  );
}
