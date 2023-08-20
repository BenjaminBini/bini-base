import MenuItem from "./MenuItem.jsx";
import { IconCertificate, IconHome, IconUsers } from "@tabler/icons-react";

export default function Menu() {
  return (
    <>
      <MenuItem
        to="/"
        label="Home"
        icon={<IconHome size={16} stroke={1.5} />}
      />
      <MenuItem
        to="/admin/users"
        label="Users"
        icon={<IconUsers size={16} stroke={1.5} />}
      />
      <MenuItem
        to="/admin/roles"
        label="Roles"
        icon={<IconCertificate size={16} stroke={1.5} />}
      />
    </>
  );
}
