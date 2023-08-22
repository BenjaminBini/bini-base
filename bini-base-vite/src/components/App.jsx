import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import routes from "../routes/routes.jsx";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useState } from "react";

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter(routes);
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme: colorScheme }}
          >
            <Notifications />
            <ModalsProvider>
              <RouterProvider router={router}></RouterProvider>
            </ModalsProvider>
          </MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}
