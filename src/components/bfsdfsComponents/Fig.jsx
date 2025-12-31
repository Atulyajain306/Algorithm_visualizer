import { useSelector } from "react-redux";
import Node from "./Node";
import { useRef, useEffect, useState } from "react";
import triangle from "../../assets/triangle.png";
import Arrow from "./Arrow";
import Weight from "./Weight";

export default function Fig() {
  const graph = useSelector((state) => state.graphs.graph);
  const graphType = useSelector((state) => state.graphs.graphType);

  const list = useSelector((state) => state.graphs.list);

  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const calculateLines = () => {
      if (!containerRef.current) return;

      const nodePositions = [];
      const container = containerRef.current;
      const nodes = container.querySelectorAll(".node");
      const box = container.querySelector(".box");

      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const boxes = box.getBoundingClientRect();
        const offsetX = rect.left - boxes.left;
        const offsetY = rect.top - boxes.top;
        nodePositions.push({
          x: offsetX + rect.width / 2,
          y: offsetY,
          val: node.innerText,
        });
      });
      // console.log(nodePositions);

      const newLines = [];
      const completedEdges = [];
      for (let i of list) {
        const first = i[0];
        let x1;
        let y1;
        for (let j of nodePositions) {
          if (j.val == first) {
            x1 = j.x;
            y1 = j.y;
            break;
          }
        }
        for (let j of i[1]) {
          const second = j;
          let res = false;
          for (let a of completedEdges) {
            if (
              (a[0] == first && a[1] == second) ||
              (a[0] == second && a[1] == first)
            ) {
              res = true;
              break;
            }
          }
          if (res) {
            continue;
          }
          let x2;
          let y2;
          for (let k of nodePositions) {
            if (k.val == second) {
              x2 = k.x;
              y2 = k.y;
              completedEdges.push([first, second]);
              newLines.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
              break;
            }
          }
        }
      }

      setLines(newLines);
    };

    calculateLines();
    window.addEventListener("resize", calculateLines);

    return () => window.removeEventListener("resize", calculateLines);
  }, [graph]);

  // console.log(lines);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full relative">
        <svg
          className="absolute top-0 left-0  w-full box h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {lines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1 + 20}
              x2={line.x2}
              y2={line.y2 + 20}
              stroke="#0077b6"
              strokeWidth="3"
            />
          ))}
        </svg>
        {graph.coordinates.map((i, ind1) => {
          return (
            <div key={ind1} className="relative">
              <Node val={i.val} x={i.x} y={i.y} i={i}></Node>
            </div>
          );
        })}
        {graphType > 1 ? (
          <>
            {graph.weights.map((i, kom) => {
              return <Weight key={kom} val={i.val} x={i.x} y={i.y}></Weight>;
            })}
          </>
        ) : null}
      </div>
    </div>
  );
}
