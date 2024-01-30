import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Components/Routes/ErrorPage.jsx";
import EscapeHome from "./Components/EscapeHome.jsx";
import EscapeAmmo from "./Components/EscapeAmmo.jsx";
import QuestHome from "./Components/Quests/QuestHome.jsx";
import QuestItems from "./Components/Quests/QuestItems.jsx";
import QuestTree from "./Components/Quests/QuestTree.jsx";


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
  {
    path: "/questHome",
    element: <QuestHome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/questItems",
    element: <QuestItems />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/questTree",
    element: <QuestTree />,
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
