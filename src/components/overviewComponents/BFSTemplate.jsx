import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import bfs1 from "../../assets/legend/bfs/bfsSequence.png";
import bfs2 from "../../assets/legend/bfs/explore.png";
import bfs3 from "../../assets/legend/bfs/next.png";
import bfs4 from "../../assets/legend/bfs/explored.png";
import bfs5 from "../../assets/legend/bfs/visited.png";

const bubbleSort = `bfs(start) {
  // bfs is method in the Graph class 
  const queue = [start];
  const result = [];
  const visited = {};
  visited[start] = true;

  while (queue.length > 0) {
    const vertex = queue.shift(); 
    result.push(vertex);

    //  exporing begins
    this.adjacencyList[vertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    });
    // vertex is fully explored 
  }
  return result;
}`;

export default function BFSTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="bfs"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        BFS
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is BFS?</span>
                <p className="mr-16">
                  BFS is an algorithm used to traverse or search through a graph
                  by visiting all the vertices at the present level before
                  moving on to the vertices at the next level. It is typically
                  implemented using a queue and is particularly useful for
                  finding the shortest path in unweighted graphs.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  BFS explores all neighbors of a vertex before moving to the
                  next level of neighbors. It works well in both graph traversal
                  and tree traversal.
                </p>
              </div>
            </li>

            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE</span>
                <p className="mr-16">
                  BFS is a simple search algorithm, works on all types of
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
              Start from a given vertex, mark it as visited, and enqueue it.
            </li>
            <li className="list-disc">
              Dequeue a vertex, visit its unvisited neighbors, mark them as
              visited, and enqueue them.
            </li>
            <li className="list-disc">
              Repeat Step 2 until the queue is empty.
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
                  <code>O(V)</code>, for the queue and visited set.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={bfs2} className="rounded-xl " alt="" />
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
              <img src={bfs3} className="rounded-xl" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Next Node</span>
                <p className="max-w-[300px] text-center">
                  The Node that is about to be visited by the exploring node.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={bfs4} className="rounded-xl " alt="" />
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
              <img src={bfs5} className="rounded-xl" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Visited Node</span>
                <p className="max-w-[300px] text-center">
                  Node that is Visited(entered in the BFS array) but not yet
                  explored.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={bfs1} className="rounded-xl h-[100px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">BFS Sequence</span>
                <p className="max-w-[300px] text-center">
                  The arrow represents the node, currenty being explored.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              BFS is used in shortest path algorithms in unweighted graphs,
              finding connected components, and network broadcast protocols.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
