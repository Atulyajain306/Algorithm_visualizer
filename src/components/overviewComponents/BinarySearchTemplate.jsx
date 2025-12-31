import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import found2 from "../../assets/legend/binarySearch/found2.png";
import array from "../../assets/legend/binarySearch/binarys.png";

const bubbleSort = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Target not found
}`;

export default function BinarySearchTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="binarySearch"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-4 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Binary Search
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Binary Search?
                </span>
                <p className="mr-16">
                  Binary Search is an efficient algorithm for finding a target
                  value in a sorted array by repeatedly dividing the search
                  interval in half.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The array must be sorted. It works by comparing the target
                  with the middle element of the current interval, eliminating
                  half of the search space at each step.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Start by checking the middle element of the array.
            </li>
            <li className="list-disc">
              If the middle element matches the target, return the index.
            </li>
            <li className="list-disc">
              If the target is smaller than the middle element, repeat the
              process on the left half of the array.
            </li>
            <li className="list-disc">
              If the target is larger, repeat the process on the right half of
              the array.
            </li>
            <li className="list-disc">If no match is found, return -1.</li>
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
                  <code>O(log n)</code>, where n is the number of elements in
                  the array.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(1)</code> for the iterative version and{" "}
                  <code>O(log n)</code> for the recursive version due to the
                  call stack.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={array} className="rounded-xl h-[220px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">Array</span>
                <p className="max-w-[300px] text-center">
                  The dividers shows the range of nodes between low and high.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={found2} className="rounded-xl w-[80px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Node Found
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Binary Search is highly efficient for large, sorted datasets. It’s
              used in search operations within databases, computer systems, and
              algorithms like Binary Search Trees (BST).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
