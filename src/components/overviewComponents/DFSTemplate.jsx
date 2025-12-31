import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import dfs1 from "../../assets/legend/dfs/dfs1.png";
import dfs2 from "../../assets/legend/dfs/dfs2.png";
import dfs3 from "../../assets/legend/dfs/dfs3.png";
import dfs4 from "../../assets/legend/dfs/dfs4.png";
import dfs5 from "../../assets/legend/dfs/dfs5.png";
import dfs6 from "../../assets/legend/dfs/dfs6.png";

const bubbleSort = `dfs(start) {
    const result = [];
    const visited = {};

    const dfsHelper = (vertex) => {
      if (!vertex) return;
      visited[vertex] = true; // node visited
      result.push(vertex);

      // exploration begins
      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) dfsHelper(neighbor);
      });
      //vertex is fully explored
    };

    dfsHelper(start);
    return result;
  }
}`;

export default function DFSTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="dfs"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        DFS
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is DFS?</span>
                <p className="mr-16">
                  DFS is an algorithm used to traverse or search through a graph
                  by exploring as far as possible along a branch before
                  backtracking. It is typically implemented using recursion or a
                  stack and is useful for applications like topological sorting,
                  cycle detection, and solving maze problems.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  DFS explores as far down a path as possible before
                  backtracking and exploring other branches. It works well for
                  graph traversal, tree traversal, and discovering all
                  components in disconnected graphs.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE</span>
                <p className="mr-16">
                  DFS is a simple search algorithm, works on all types of
                  graphs.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Start from a given vertex, mark it as visited.
            </li>
            <li className="list-disc">
              Recursively visit its unvisited neighbors.
            </li>
            <li className="list-disc">
              Backtrack once a path has been fully explored.
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Code Snippet</h2>
          <div className="mr-16 relative mt-4 ml-12">
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
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Time and Space Complexity</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Time Complexity</span>
                <p className="mr-16">
                  <code>O(V + E)</code>, where <code>V</code> is the number of
                  vertices and <code>E</code> is the number of edges.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(V)</code>, for the recursive call stack.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={dfs1} className="rounded-xl " alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">
                  Current Explored Node
                </span>
                <p className="max-w-[300px] text-center">
                  The Node that is visited and currently being explored.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={dfs2} className="rounded-xl" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Next Node</span>
                <p className="max-w-[300px] text-center">
                  The Node that is about to be visited by the exploring node.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={dfs5} className="rounded-xl " alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Explored Node
                </span>
                <p className="max-w-[300px] text-center">
                  The Node that is completely explored i.e. all the neighbours
                  are visited.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={dfs4} className="rounded-xl" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Visited Node</span>
                <p className="max-w-[300px] text-center">
                  Node that is Visited(entered in the DFS array) but not yet
                  explored.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={dfs6} className="rounded-xl h-[70px]" alt="" />
              <span className="text-lg font-medium">DFS Sequence</span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={dfs3} className="rounded-xl w-[120px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">DFS CallStack</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              DFS is used in applications like topological sorting, cycle
              detection in graphs, solving puzzles (like mazes), and finding
              strongly connected components in directed graphs.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
