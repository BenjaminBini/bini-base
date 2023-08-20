import { NavLink as RouterNavLink } from "react-router-dom";
import { NavLink } from "@mantine/core";
import { useEffect, useState } from "react";

export default function MenuItem({ to, label, icon, children }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <NavLink
      component={({ children, ...props }) => {
        return (
          <RouterNavLink {...props}>
            {({ isActive }) => {
              useEffect(() => {
                setIsActive(isActive);
              }, [isActive]);
              return <>{children}</>;
            }}
          </RouterNavLink>
        );
      }}
      to={to}
      label={label}
      icon={icon}
      active={!children && isActive}
    >
      {children}
    </NavLink>
  );
}
