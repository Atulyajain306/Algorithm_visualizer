import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import array from "../../assets/legend/stacksNQueue/stackArr.png";
import peek from "../../assets/legend/stacksNQueue/stackPeek.png";

const bubbleSort = `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}`;

export default function BinaryTreeTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="binaryTree"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Binary Tree
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is a Binary Tree?
                </span>
                <p className="mr-16">
                  A Binary Tree is a hierarchical data structure in which each
                  node has at most two children, referred to as the left child
                  and the right child. It is used to represent hierarchical
                  relationships and is the basis for more specialized trees like
                  Binary Search Trees and Heaps.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  Binary Trees are recursive structures where each node can have
                  up to two children. Operations like traversal (in-order,
                  pre-order, and post-order) are commonly performed on binary
                  trees.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE:</span>
                <p className="mr-16">
                  This particular Visualization is to visualize the tree rather
                  than some algorithm. It can be helpful in cases where you have
                  the Tree Notation like{" "}
                  <code className="mx-2 px-2 bg-stone-200 rounded-md">
                    2 3 4 2 11 6 N 8 9 3 N 2 2 3 4
                  </code>{" "}
                  and you want to see the structured tree. It comes handy when
                  you solve coding problems on Leetcode, CF, GFG etc.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">
            Code Snippet{" "}
            <span className="text-xl font-medium ml-4">(For TreeNode)</span>
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

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Binary Trees are used in expression parsing, hierarchical data
              representation (like file systems), and in designing other data
              structures like heaps and binary search trees.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
