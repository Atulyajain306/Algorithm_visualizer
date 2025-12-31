import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import dj1 from "../../assets/legend/dijkstra/dj1.png";
import dj2 from "../../assets/legend/dijkstra/dj2.png";
import dj3 from "../../assets/legend/dijkstra/dj3.png";
import dj4 from "../../assets/legend/dijkstra/dj4.png";
import dj5 from "../../assets/legend/dijkstra/dj5.png";
import dj6 from "../../assets/legend/dijkstra/dj6.png";

const bubbleSort = `function dijkstra(graph, start) {
  // graph is the Adjacency List representation of the graph
  const distances = {};
  const visited = new Set();
  const pq = new PriorityQueue(); // Assume we have a priority queue class

  // Initialize distances
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { vertex } = pq.dequeue();
    visited.add(vertex);  // vertex is visited

    // relaxation begins
    graph[vertex].forEach(neighbor => {
      if (!visited.has(neighbor.node)) {
        const distance = distances[vertex] + neighbor.weight;

        if (distance < distances[neighbor.node]) {
          distances[neighbor.node] = distance;
          pq.enqueue(neighbor.node, distance);
        }
      }
    });
    // relaxation completed 
  }
  return distances;
}`;

export default function DijkstraTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="dijkstra"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Dijkstra's Algorithm
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Dijkstra's Algorithm?
                </span>
                <p className="mr-16">
                  Dijkstra’s Algorithm is used to find the shortest path from a
                  source node to all other nodes in a graph with non-negative
                  edge weights. It is a greedy algorithm that explores the
                  shortest unvisited node at each step.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  Dijkstra’s algorithm builds the shortest path tree from the
                  source node by iteratively choosing the nearest node and
                  updating distances.
                </p>
              </div>
            </li>

            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE</span>
                <p className="mr-16">
                  Dijkstra's Algorithm works on both directed and undirected
                  weighted graphs.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Initialize the distance to the source node as 0 and all others as
              infinity.
            </li>
            <li className="list-disc">
              Choose the unvisited node with the smallest known distance and
              update its neighbors.
            </li>
            <li className="list-disc">
              Repeat Step 2 until all nodes have been visited or the smallest
              distance is infinity.
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
                  <code>O((V + E) log V)</code> with a priority queue, where{" "}
                  <code>V</code> is vertices and <code>E</code> is edges.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(V)</code>, for storing distances.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <p className="mt-1 ml-4">
            NOTE: The numbers above the node are the distances of the nodes from
            the starting point. Its these values that are entered in the
            priority queue <code>pq</code>.
          </p>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={dj1} className="rounded-xl " alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Relaxing Node
                </span>
                <p className="max-w-[500px] text-center">
                  The Node is visited and relaxation of its neighbours is in
                  progress. i.e. it checks for each of its neighbour if the
                  current weight of that neighbour is greter that the sum of its
                  own weight and the edge between them.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={dj3} className="rounded-xl " alt="" />
              <span className="text-lg font-medium">Relaxed Node</span>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={dj2} className="rounded-xl " alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Relaxing Neighbour</span>
                <p className="max-w-[300px] text-center">
                  The neighbour (of the Relaxing Node) which is checked for
                  relaxation.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={dj4} className="rounded-xl h-[85px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Explanation text</span>
                <p className="max-w-[300px] text-center">
                  Explanation text for No-Relaxation.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={dj5} className="rounded-xl h-[85px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Explanation text</span>
                <p className="max-w-[300px] text-center">
                  Explanation text for Relaxation.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={dj6} className="rounded-xl h-[250px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Distance Table</span>
                <p className="max-w-[450px] text-center">
                  The Selected Node mentioned is same as Relaxed Node. The
                  figure shows the min distances(from the start) to nodes from 1
                  to 10 at the relaxation of each node (4, 1, 3 and so on).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Dijkstra’s Algorithm is used in navigation systems, network
              routing, and traffic information systems.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
