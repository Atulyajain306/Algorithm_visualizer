import BFSTemplate from "../components/overviewComponents/BFSTemplate";
import DFSTemplate from "../components/overviewComponents/DFSTemplate";
import DijkstraTemplate from "../components/overviewComponents/DijkstraTemplate";
import GraphsTemplate from "../components/overviewComponents/GraphTemplate";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const bubbleSort = `const graph = {
  A: [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
  B: [{ node: 'A', weight: 4 }, { node: 'C', weight: 5 }, { node: 'D', weight: 10 }],
  C: [{ node: 'A', weight: 2 }, { node: 'B', weight: 5 }, { node: 'E', weight: 3 }],
  D: [{ node: 'B', weight: 10 }, { node: 'E', weight: 4 }],
  E: [{ node: 'C', weight: 3 }, { node: 'D', weight: 4 }]
};`;

export default function Graphs() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <>
      <Helmet>
        <title>Graphs Overview | AlgoTrace</title>
        <meta
          name="description"
          content="Overview Graph data structure and algorithms and animation legend for deeper understanding of algorithms."
        />
      </Helmet>
      <div className="flex w-full relative overflow-auto customScroll">
        <div className="flex flex-grow flex-col ">
          <h1 className="text-center text-3xl mt-12 tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-12">
            Graphs Overview
          </h1>
          <p className="text-center text-lg w-[80%] mx-auto">
            Before diving into the visualizations, take a moment to familiarize
            yourself with the algorithm's key aspects and the legend that guides
            you through the animations. This will help you better understand and
            interpret the dynamic steps of each algorithm, empowering you to
            master its logic and execution.
          </p>
          <p className="text-center text-lg w-[80%] mx-auto">
            <b>NOTE:</b> For the algrithms from Dijkstra to Kruskal, the
            following is the structure of the <code>graph</code> parameter of
            the function:{" "}
          </p>
          <div className=" max-w-[1000px] mx-auto relative mt-4 ">
            <pre className="">
              <code
                ref={bubble}
                style={{
                  padding: "30px 40px",
                  borderRadius: "10px",
                  fontSize: "18px",
                }}
                className="javascript"
              >
                {bubbleSort}
              </code>
            </pre>
            <span className="absolute right-4 font-semibold text-white top-2">
              Javascript
            </span>
          </div>

          <div className=" flex flex-col gap-y-16 ">
            <GraphsTemplate />
            <BFSTemplate />
            <DFSTemplate />
            <DijkstraTemplate />
          </div>

          <div className="min-w-[100px] min-h-[200px]"></div>
        </div>
        <div
          style={{ height: `calc( 100vh - ${48}px )` }}
          className="flex flex-col gap-y-2 text-lg pl-6 pt-[30px] min-w-[200px] sticky right-[5px]  top-0 border-l-2 border-neutral-400 "
        >
          <span className="text-xl tracking-wide text-[#9c6644] mb-4 font-extrabold">
            Jump To
          </span>
          <div className=" border-black w-[150px] divide-black flex flex-col ">
            <a className="my-1 flex-grow hover:text-[#9c6644]" href="#graph">
              Graph
            </a>
            <a
              className="my-1 flex-grow text-nowrap hover:text-[#9c6644]"
              href="#bfs"
            >
              BFS
            </a>
            <a
              className="my-1 flex-grow text-nowrap hover:text-[#9c6644]"
              href="#dfs"
            >
              DFS
            </a>
            <a
              className="my-1 flex-grow text-nowrap hover:text-[#9c6644]"
              href="#dijkstra"
            >
              Dijkstra
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
