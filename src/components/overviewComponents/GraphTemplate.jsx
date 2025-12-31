import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import edges from "../../assets/legend/graph/edges.png";
import matrix from "../../assets/legend/graph/matrix.png";
import list from "../../assets/legend/graph/list.png";

const bubbleSort = `class Graph {
  constructor() {
    this.adjacencyList = {};
    this.adjacencyMatrix = [];
    this.vertexMap = {}; // To map vertices to matrix indices
    this.vertexCount = 0;
  }

  // Add a vertex to both adjacency list and matrix
  addVertex(vertex) {
    // Adjacency List
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }

    // Adjacency Matrix
    if (!(vertex in this.vertexMap)) {
      this.vertexMap[vertex] = this.vertexCount++; // Assign an index to this vertex
      this.adjacencyMatrix.push(new Array(this.vertexCount).fill(0));

      // Update all existing rows to match the new size
      for (let i = 0; i < this.adjacencyMatrix.length; i++) {
        while (this.adjacencyMatrix[i].length < this.vertexCount) {
          this.adjacencyMatrix[i].push(0);
        }
      }
    }
  }

  // Add an edge to both adjacency list and matrix
  addEdge(vertex1, vertex2) {
    // Adjacency List
    if (this.adjacencyList[vertex1]) this.adjacencyList[vertex1].push(vertex2);
    if (this.adjacencyList[vertex2]) this.adjacencyList[vertex2].push(vertex1);

    // Adjacency Matrix
    const index1 = this.vertexMap[vertex1];
    const index2 = this.vertexMap[vertex2];
    if (index1 !== undefined && index2 !== undefined) {
      this.adjacencyMatrix[index1][index2] = 1;
      this.adjacencyMatrix[index2][index1] = 1; // For undirected graphs
    }
  }`;

export default function GraphsTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="graph"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Graphs
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is a Graph?</span>
                <p className="mr-16">
                  A Graph is a non-linear data structure consisting of nodes
                  (also called vertices) and edges. Each edge (can be weighted
                  or unweighted) connects two vertices, and graphs can be either
                  directed (edges have a direction) or undirected (edges do not
                  have a direction). Graphs are used to represent networks, such
                  as social networks, computer networks, and transportation
                  systems.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  Graphs can represent a wide variety of relationships, and
                  different algorithms are used to traverse, search, and
                  manipulate graphs.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE:</span>
                <p className="mr-16">
                  We have 4 kinds of Graphs, Undirected, Directed,
                  Undirected-Weighted and Directed-Weighted. Although moving
                  forward we will only talk about the Undirected graphs. The
                  logic or code for the other graphs will be same or can easily
                  be deduced.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Components of a Graph</h2>
          <ul className="pl-16 mt-4 text-lg ">
            <li className="flex flex-col ">
              <span className="font-medium list-item list-disc w-[150px]">
                Vertices:{" "}
              </span>{" "}
              The fundamental units that make up a graph.
            </li>
            <li className="flex flex-col ">
              <span className="font-medium list-item list-disc w-[150px]">
                Edges:{" "}
              </span>
              The connections between vertices.
            </li>
            <li className="flex flex-col ">
              <span className="font-medium list-item list-disc w-[150px]">
                Adjacency Matrix:{" "}
              </span>
              A 2D array representing edge connections between nodes.
            </li>
            <li className="flex flex-col">
              <span className="font-medium list-item list-disc w-[150px]">
                Adjacency List:{" "}
              </span>
              An array where each index stores a list of vertices adjacent to
              the corresponding vertex. <br /> In the Adjacency List
              visualization, the respective nodes are mentioned. When the graph
              is weighted the node will have a weight field.
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">
            Code Snippet{" "}
            <span className="ml-4 text-xl font-medium">
              (for undirected graphs)
            </span>
          </h2>
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
                  (Adjacency List): Adding a vertex or edge is <code>O(1)</code>
                  , and traversing all edges is <code>O(V + E)</code>, where V
                  is the number of vertices and E is the number of edges. <br />
                  (Adjacency Matrix): Adding a vertex is <code>O(V²)</code>,
                  adding an edge is <code>O(1)</code>, and traversing all edges
                  is <code>O(V²)</code>.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  (Adjacency List): <code className="ml-2">O(V + E)</code>, as
                  each vertex stores a list of its adjacent vertices. <br />
                  (Adjacency Matrix): <code className="ml-1">O(V²)</code>, as
                  the matrix stores V × V entries, regardless of the number of
                  edges.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={list} className="rounded-xl h-[350px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Adjacency List
                </span>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={matrix} className="rounded-xl w-[350px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Adjacency Matrix
                </span>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={edges} className="rounded-xl w-[220px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">Edges</span>
                <p className="max-w-[300px] text-center">
                  The edges of the Graph. In this case its a weighted graph.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Graphs are used in social networks (e.g., Facebook friends),
              computer networks (routing algorithms), recommendation systems,
              and various optimization problems like finding the shortest path
              (Dijkstra's algorithm).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
