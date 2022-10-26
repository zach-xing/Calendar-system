import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Calendar />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
