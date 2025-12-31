import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import array from "../../assets/legend/insertionSort/array.png";
import selectedS from "../../assets/legend/insertionSort/selectedS.png";
import selectedUS from "../../assets/legend/insertionSort/selectedUS.png";
import sorted from "../../assets/legend/insertionSort/sortedNode.png";

const bubbleSort = `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
      j = j - 1;
    }
  }
  return arr;
}`;

export default function InsertionSortTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="insertionSort"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-4 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Insertion Sort
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Insertion Sort?
                </span>
                <p className="mr-16">
                  Insertion Sort works similarly to sorting playing cards in
                  your hands. It builds the sorted list one element at a time by
                  comparing each new element with the already sorted elements
                  and inserting it in the correct position.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The array is divided into a sorted and an unsorted part, and
                  elements from the unsorted part are picked and placed in their
                  correct position in the sorted part.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Start with the first element as sorted.
            </li>
            <li className="list-disc">
              Take the next element and compare it with the sorted elements.
            </li>
            <li className="list-disc">
              Keep Swapping if the selected sorted elements are greater than the
              selected unsorted element.
            </li>
            <li className="list-disc">Repeat until all elements are sorted.</li>
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
                  <code className="">O(n²)</code> for worst and average cases,
                  <code className="ml-2">O(n)</code> for best case when the
                  array is already sorted.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code className="">O(1)</code>, as sorting is done in-place.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={array} className="rounded-xl h-[120px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Array</span>
                <p className="max-w-[300px] text-center">
                  Nodes on right of divider are unsorted and those on left are
                  sorted
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={selectedS} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-bold">
                <code className="mr-1">j</code> Index Node
              </span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={selectedUS} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-bold">
                <code className="mr-1">i</code> Index Node
              </span>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={sorted} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-medium">Final Sorted Node</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Suitable for small datasets or nearly sorted data. Often used as
              part of more complex algorithms.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
