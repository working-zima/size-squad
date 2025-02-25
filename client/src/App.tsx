import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import routes from "./routes";
import { queryClient } from "./config/queryClient";

import GlobalStyle from "./styles/GlobalStyle";
import DefaultTheme from "./styles/defaultTheme";

import "./styles/fonts/font.css";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={DefaultTheme}>
        <Reset />
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
