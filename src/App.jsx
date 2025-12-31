import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Wrapper from "./pages/Wrapper";
import Sorting from "./pages/Sorting";
import InsertionSort from "./pages/InsertionSort";
import LinearSearch from "./pages/LinearSearch";
import BinarySearch from "./pages/BinarySearch";
import MergeSort from "./pages/MergeSort";
import Search from "./pages/Search";
import Trees from "./pages/Trees";
import BinaryTree from "./pages/BinaryTree";
import BinarySearchTree from "./pages/BinarySearchTree";
import Graphs from "./pages/Graphs";
import Graph from "./pages/Graph";
import BSFNDFS from "./pages/BFSNDFS";
import Dijkstra from "./pages/Dijkstra";
import PageWrapper from "./pages/PageWrapper";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "",
    element: <Wrapper />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <PageWrapper />,
        errorElement: <Error />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "sorting",
            children: [
              {
                path: "",
                element: <Sorting />,
              },
              {
                path: "insertion",
                element: <InsertionSort />,
              },
              {
                path: "merge",
                element: <MergeSort />,
              },
            ],
          },
          {
            path: "search",
            children: [
              {
                path: "",
                element: <Search />,
              },
              {
                path: "linear",
                element: <LinearSearch />,
              },
              {
                path: "binary",
                element: <BinarySearch />,
              },
            ],
          },
          {
            path: "tree",
            children: [
              {
                path: "",
                element: <Trees />,
              },
              {
                path: "binary_tree",
                element: <BinaryTree />,
              },
              {
                path: "binary_search_tree",
                element: <BinarySearchTree />,
              },
            ],
          },
          {
            path: "graphs",
            children: [
              {
                path: "",
                element: <Graphs />,
              },
              {
                path: "graph",
                element: <Graph />,
              },
              {
                path: "bfsdfs",
                element: <BSFNDFS />,
              },
              {
                path: "dijkstra",
                element: <Dijkstra />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
