import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import github from "../assets/githubFooter.png";
import linkedin from "../assets/linkedinFooter.png";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../store/main";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const col1 = "#c08552";
const col2 = "#f3e9dc";

const Tile = styled.div`
  background-color: ${(props) => (props.$status == "true" ? col1 : col2)};
  color: ${(props) => (props.$status == "true" ? col2 : col1)};

  &:hover {
    background-color: ${(props) => (props.$status == "true" ? col1 : "#fff")};
  }
`;

export default function SideMenu() {
  const location = useLocation();
  const activity = useSelector((state) => state.general.activity);
  const modalOpen = useSelector((state) => state.general.showModal);
  const pendingPath = useSelector((state) => state.general.pendingPath);
  const navigate = useNavigate();
  const dialogRef = useRef();

  const dispatch = useDispatch();

  const home = location.pathname === "/";

  const sorting = location.pathname === "/sorting";
  const search = location.pathname === "/search";
  const tree = location.pathname === "/tree";
  const graphs = location.pathname === "/graphs";

  const insertionSort = location.pathname === "/sorting/insertion";
  const mergeSort = location.pathname === "/sorting/merge";

  const linearSearch = location.pathname === "/search/linear";
  const binarySearch = location.pathname === "/search/binary";

  const binaryTree = location.pathname === "/tree/binary_tree";
  const binarySearchTree = location.pathname === "/tree/binary_search_tree";

  const graph = location.pathname == "/graphs/graph";
  const bfsdfs = location.pathname == "/graphs/bfsdfs";
  const dijkstra = location.pathname == "/graphs/dijkstra";

  const tiles = [
    {
      name: "Sorting",
      children: [
        {
          name: "Overview",
          path: "/sorting",
          status: sorting,
        },
        {
          name: "Insertion Sort",
          path: "/sorting/insertion",
          status: insertionSort,
        },
        {
          name: "Merge Sort",
          path: "/sorting/merge",
          status: mergeSort,
        },
      ],
    },
    {
      name: "Search",
      children: [
        {
          name: "Overview",
          path: "/search",
          status: search,
        },
        {
          name: "Linear Search",
          path: "/search/linear",
          status: linearSearch,
        },
        {
          name: "Binary Search",
          path: "/search/binary",
          status: binarySearch,
        },
      ],
    },
    {
      name: "Trees",
      children: [
        {
          name: "Overview",
          path: "/tree",
          status: tree,
        },
        {
          name: "Binary Tree",
          path: "/tree/binary_tree",
          status: binaryTree,
        },
        {
          name: "Binary Search Tree",
          path: "/tree/binary_search_tree",
          status: binarySearchTree,
        },
      ],
    },
    {
      name: "Graphs",
      children: [
        {
          name: "Overview",
          path: "/graphs",
          status: graphs,
        },
        {
          name: "Graph",
          path: "/graphs/graph",
          status: graph,
        },
        {
          name: "BFS & DFS",
          path: "/graphs/bfsdfs",
          status: bfsdfs,
        },
        {
          name: "Dijkstra's",
          path: "/graphs/dijkstra",
          status: dijkstra,
        },
      ],
    },
  ];

  function clickGuard(event, path) {
    if (activity) {
      event.preventDefault();
      dispatch(generalActions.showNavigationModal(path));
    }
  }

  function handleCancel() {
    // console.log("efef");
    dispatch(generalActions.hideNavigationModal());
  }
  function handleConfirm() {
    if (pendingPath) {
      navigate(pendingPath);
    }
    dispatch(generalActions.hideNavigationModal());
    dispatch(generalActions.setActivity(false));
  }

  useEffect(() => {
    if (modalOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [modalOpen]);

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden sidebarScroll  pt-2  ">
      <div className="flex flex-col items-center gap-y-6 pb-3">
        <div className="flex flex-col gap-y-6 pb-4 mx-4">
          {/* <div className="text-center flex flex-col uppercase font-bold text-lg">
            Navigation
          </div> */}
          <div className="flex flex-col mt-4 border-y-2 w-[150px] justify-center divide-y-2 divide-[#c08552] border-[#c08552]">
            <Link onClick={(event) => clickGuard(event, "/")} to={"/"}>
              <Tile
                className="text-center py-1"
                $status={home ? "true" : "false"}
              >
                Home
              </Tile>
            </Link>
          </div>
          {tiles.map((i) => {
            return (
              <div key={i.name} className="w-[150px]">
                <header className="font-semibold uppercase text-center text-sm py-1">
                  {i.name}
                </header>
                <div className="flex flex-col border-b-2 w-[150px] justify-center divide-y-2 divide-[#c08552] border-[#c08552]">
                  {i.children.map((j) => {
                    return (
                      <Link
                        style={{
                          marginBottom: j.name === "Overview" ? "8px" : "0px",
                          fontSize: j.name === "Overview" ? "14px" : "",
                          textTransform:
                            j.name === "Overview" ? "uppercase" : "",
                          letterSpacing: j.name === "Overview" ? "2px" : "",
                          border:
                            j.name === "Overview" ? "1px solid #c08552" : "",
                        }}
                        className="link-navigation"
                        onClick={(event) => clickGuard(event, j.path)}
                        key={j.name}
                        to={j.path}
                      >
                        <Tile
                          className="text-center py-1"
                          $status={j.status ? "true" : "false"}
                        >
                          {j.name}
                        </Tile>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className=" flex-col border-t-2 mt-8 pt-4 border-neutral-400 flex justify-center items-center w-full ">
          <div className="flex gap-x-4 my-3">
            <a target="_blank" href="https://github.com/AmulyaJain123">
              <img src={github} className="w-[20px]" alt="" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/amulya-jain-a31180255/"
            >
              <img src={linkedin} className="w-[20px]" alt="" />
            </a>
          </div>
          <span className="text-sm">
            Uicons by{" "}
            <a
              className="underline underline-offset-2"
              target="_blank"
              href="https://www.flaticon.com/uicons"
            >
              Flaticon
            </a>
          </span>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="rounded-3xl border-2 border-[#000] shadow-2xl bg-stone-200 text-[#000]"
      >
        <div className="m-8 rounded-3xl ">
          <div>
            <div className="text-2xl font-bold mx-auto text-center mb-8">
              Confirm Navigation
            </div>
            <div className="text-center text-lg">
              Are you sure you want to leave this page? <br /> All the data for
              the current Animation will be lost.
            </div>
          </div>
          <div className="mt-8 flex justify-center space-x-6">
            <button
              className="text-white font-semibold bg-red-500 border-2 border-red-500 hover:bg-white hover:text-red-500 duration-500 text-lg rounded-lg py-1 px-4"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="text-white font-semibold bg-green-500 border-2 border-green-500 hover:bg-white hover:text-green-500 duration-500 text-lg rounded-lg py-1 px-4"
              onClick={handleConfirm}
            >
              Continue
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
