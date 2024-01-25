import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Components/Routes/ErrorPage.jsx";
import EscapeHome from "./Components/EscapeHome.jsx";
import EscapeAmmo from "./Components/EscapeAmmo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EscapeHome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ammo",
    element: <EscapeAmmo />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <main className="dark text-foreground bg-background">
      <RouterProvider router={router} />
    </main>
  </NextUIProvider>
);
