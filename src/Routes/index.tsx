import { createBrowserRouter } from "react-router";
import { Home } from "../Components/Home/Home";
import { About } from "../Components/Home/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/about/:text",
    element: <About />,
  }
]);
