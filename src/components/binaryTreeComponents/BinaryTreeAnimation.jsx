import { useState, useEffect, useRef } from "react";
import TreeNode from "./TreeNode";

export default function BinaryTreeAnimation({ arr }) {
  const [ans, setAns] = useState(undefined);

  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const array = [];
    let indexOfArr = 0;
    for (let i = 0; indexOfArr < arr.length; ++i) {
      const mask = [];
      if (array.length != 0) {
        for (let i of array[array.length - 1]) {
          if (i === "N") {
            mask.push("N");
            mask.push("N");
          } else {
            mask.push("?");
            mask.push("?");
          }
        }
      } else {
        mask.push("?");
      }
      if (!mask.includes("?")) {
        setAns(null);
        return;
      }
      let ind = 0;
      while (indexOfArr < arr.length && ind < mask.length) {
        if (mask[ind] === "N") {
          ++ind;
        } else {
          mask[ind] = arr[indexOfArr];
          ++ind;
          ++indexOfArr;
        }
      }
      array.push(mask);
    }
    let index = 0;
    for (let i of array[array.length - 1]) {
      if (i === "?") {
        array[array.length - 1][index] = "N";
      }
      ++index;
    }
    // console.log(array);
    let stat = true;
    for (let i of array[array.length - 1]) {
      if (i === "N") {
        stat = true;
      } else {
        stat = false;
        break;
      }
    }
    if (stat) {
      array.pop();
    }
    const ansObject = buildObject(array);
    // console.log(ansObject);
    finalArray(0, 0, array, ansObject);
    // console.log(array);
    setAns(array);
  }, []);

  function buildObject(array) {
    const root = solver(0, 0, array);
    // console.log(root);
    addOffset(root);
    return root;
  }

  function finalArray(x, y, array, object) {
    if (!object) {
      return;
    }
    const value = array[x][y];
    array[x][y] = { val: value, offset: object.offset };
    finalArray(x + 1, y * 2, array, object.left);
    finalArray(x + 1, y * 2 + 1, array, object.right);
  }

  function addOffset(root) {
    const base = root.offset;
    const left = leftSpacing(root.left, true);
    const right = rightSpacing(root.right, true);
    if (root.left) {
      root.left.offset = base - left;
      addOffset(root.left);
    }
    if (root.right) {
      root.right.offset = base + right;
      addOffset(root.right);
    }
  }

  function leftSpacing(root, status) {
    if (!root) {
      return 0;
    }
    if (status) {
      return 1 + leftSpacing(root.right, false);
    } else {
      return (
        1 + leftSpacing(root.right, status) + leftSpacing(root.left, status)
      );
    }
  }

  function rightSpacing(root, status) {
    if (!root) {
      return 0;
    }
    if (status) {
      return 1 + rightSpacing(root.left, false);
    } else {
      return (
        1 + rightSpacing(root.left, status) + rightSpacing(root.right, status)
      );
    }
  }

  function solver(x, y, array) {
    // console.log(array, array[0]);
    if (x >= array.length || y >= array[x].length || array[x][y] === "N") {
      return null;
    }
    const node = {
      val: array[x][y],
      left: solver(x + 1, 2 * y, array),
      right: solver(x + 1, 2 * y + 1, array),
      offset: 0,
    };
    return node;
  }

  useEffect(() => {
    const calculateLines = () => {
      if (!containerRef.current) return;

      const nodePositions = [];
      const container = containerRef.current;
      const nodes = container.querySelectorAll(".tree-node");
      const box = container.querySelector(".box");

      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const boxes = box.getBoundingClientRect();
        const offsetX = rect.left - boxes.left;
        const offsetY = rect.top - boxes.top;
        nodePositions.push({
          x: offsetX + rect.width / 2,
          y: offsetY,
          val: node.children[0].innerText,
        });
      });
      // console.log(nodePositions);

      const newLines = [];
      const newArray = [];
      let layer = 0;
      let num = 1;
      let index = 0;
      let temp = [];
      while (index < nodePositions.length) {
        if (num === 0) {
          newArray.push(temp);
          temp = [];
          ++layer;
          num = Math.round(Math.pow(2, layer));
        }
        temp.push(nodePositions[index]);
        ++index;
        --num;
      }
      newArray.push(temp);
      // console.log(newArray);

      for (let i = 0; i < newArray.length - 1; ++i) {
        for (let j = 0; j < newArray[i].length; ++j) {
          const start = newArray[i][j];
          const end1 = newArray[i + 1][j * 2];
          const end2 = newArray[i + 1][j * 2 + 1];
          if (start.val != "N" && end1.val != "N") {
            newLines.push({ x1: start.x, y1: start.y, x2: end1.x, y2: end1.y });
          }
          if (start.val != "N" && end2.val != "N") {
            newLines.push({ x1: start.x, y1: start.y, x2: end2.x, y2: end2.y });
          }
        }
      }

      setLines(newLines);
    };

    calculateLines();
    window.addEventListener("resize", calculateLines);

    return () => window.removeEventListener("resize", calculateLines);
  }, [ans]);

  // console.log(lines);

  return (
    <div className="flex flex-col m-auto mt-16">
      {ans === undefined ? <p className="text-center">Designing....</p> : null}
      {ans === null ? <p className="text-center">Invalid Entry</p> : null}
      {ans ? (
        <div className="relative" ref={containerRef}>
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
                y2={line.y2 + 15}
                stroke="#0077b6"
                strokeWidth="3"
              />
            ))}
          </svg>

          {ans.map((i, ind1) => {
            // console.log(i);
            return (
              <div key={ind1} className="flex w-auto relative h-[80px]">
                {i.map((j, ind2) => {
                  return (
                    <div key={ind2}>
                      {j !== "N" ? (
                        <div
                          style={{ left: `calc( 50% + ${j.offset * 40}px )` }}
                          className="tree-node translate-x-[-50%] absolute px-2"
                        >
                          <TreeNode>{j.val}</TreeNode>
                        </div>
                      ) : (
                        <div className="tree-node absolute left-0 opacity-0">
                          <TreeNode>{"N"}</TreeNode>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
