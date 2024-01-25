import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Components/Routes/ErrorPage.jsx";
import EscapeHome from "./Components/EscapeHome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EscapeHome />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <main className="dark text-foreground bg-background">
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </main>
);
