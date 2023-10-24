import { useEffect, useState } from "react";
import {
  AppShell,
  Container,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useCurrentUser, useSaveUser } from "../api/user-api.js";
import Menubar from "./Menubar.jsx";
import { useQueryClient } from "react-query";

export default function Shell({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();
  const saveUser = useSaveUser(queryClient);

  const updateUserColorScheme = async (colorScheme) => {
    await saveUser.mutateAsync({ ...currentUser, colorScheme });
  };

  useEffect(() => {
    if (
      currentUser &&
      currentUser.colorScheme &&
      currentUser.colorScheme !== colorScheme
    ) {
      toggleColorScheme(currentUser.colorScheme);
    }
  }, [currentUser]);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Menubar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          currentUser={currentUser}
          colorScheme={colorScheme}
          toggleColorScheme={() => {
            toggleColorScheme();
            updateUserColorScheme(colorScheme === "dark" ? "light" : "dark");
          }}
        ></Menubar>
      }
    >
      <Container>
        <Outlet />
      </Container>
    </AppShell>
  );
}
