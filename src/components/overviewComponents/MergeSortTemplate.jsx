import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import arrays from "../../assets/legend/mergeSort/mergeArrays.png";
import callStack from "../../assets/legend/mergeSort/mergeCallStack.png";
import array from "../../assets/legend/mergeSort/mergeArray.png";
import sorted from "../../assets/legend/mergeSort/sortedNode.png";
import temporary from "../../assets/legend/mergeSort/temporary.png";

const bubbleSort = `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    ++i;
  }

  while (j < right.length) {
    result.push(right[j]);
    ++j;
  }

  return result;
}`;

export default function MergeSortTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="mergeSort"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Merge Sort
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is Merge Sort?</span>
                <p className="mr-16">
                  Merge Sort is a divide-and-conquer algorithm that divides the
                  array into two halves, recursively sorts them, and then merges
                  the two sorted halves.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The array is repeatedly split into smaller arrays until they
                  are trivially sorted, and then these smaller arrays are merged
                  back together.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">Divide the array into two halves.</li>
            <li className="list-disc">Recursively sort each half.</li>
            <li className="list-disc">
              Merge the two sorted halves back together.
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
                  <code className="">O(n log n)</code> in all cases
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code className="">O(n)</code>, as it requires additional
                  space to store the temporary arrays.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={arrays} className="rounded-xl h-[200px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  <code className="mr-1">merge()</code> In Action
                </span>
                <p className="max-w-[300px] text-center">
                  The arrays in Boxes are the 2 sorted arrays that are being
                  merged into one sorted array.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={array} className="rounded-xl h-[130px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Original Node</span>
                <p className="max-w-[300px] text-center">
                  The Box is the array that is currently being operated on. In
                  this case the function operating on this is{" "}
                  <code className="">mergeSort()</code>. The currently executing
                  function can also be seen in the CallStack.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={temporary} className="rounded-xl h-[100px]" alt="" />
              <span className="text-lg font-medium">Temporary Array</span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={callStack} className="rounded-xl w-[180px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Function CallStack</span>
                <p className="max-w-[300px] text-center">
                  The Greyed entries are the sequence of calls that will be
                  pushed in the stack in future.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={sorted} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-medium">Sorted Node</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Works well for large datasets and is stable, making it useful for
              situations requiring stable sorting.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
