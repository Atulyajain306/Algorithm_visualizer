import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate } from "framer-motion";
import cross from "../../assets/cross.png";

export default function LinearSearchAnimation({ arr, node }) {
  const [ind, setInd] = useState(-1);
  const [history, setHistory] = useState([
    { list: [...arr], ind: -1, ans: null },
  ]);
  const [array, setArray] = useState(arr);
  const [scope, animate] = useAnimate();
  const [ans, setAns] = useState(null);
  const [hang, setHang] = useState(false);

  function forward() {
    setHang(true);
    const newInd = ind + 1;
    if (newInd < array.length) {
      setInd(newInd);
      setTimeout(() => {
        if (array[newInd] === node) {
          animate(
            `.index${newInd}`,
            { scale: [2, 1, 0.5, 1], backgroundColor: ["#0077b6", "#4f772d"] },
            { type: "spring", duration: 0.7 }
          );
          setTimeout(() => {
            setAns(newInd);
            setHistory((p) => {
              return [
                ...p,
                {
                  list: [...arr],
                  ind: newInd,
                  ans: newInd,
                },
              ];
            });
            setHang(false);
          }, 700);
        } else {
          setHistory((p) => {
            return [
              ...p,
              {
                list: [...arr],
                ind: newInd,
                ans: null,
              },
            ];
          });
          setHang(false);
        }
      }, 0);
    } else {
      setInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            list: [...arr],
            ind: newInd,
            ans: null,
          },
        ];
      });
      setHang(false);
    }
  }

  // console.log(ind, array, history, node);

  function backward() {
    const prevHistory = history[history.length - 2];
    setInd(prevHistory.ind);
    setAns(prevHistory.ans);
    setHistory((p) => {
      const newHistory = [...p];
      newHistory.splice(newHistory.length - 1, 1);
      return newHistory;
    });
  }

  function restart() {
    setInd(-1);
    setAns(null);
    setArray([...arr]);
    setHistory([
      {
        list: [...arr],
        ans: null,
        ind: -1,
      },
    ]);
  }

  return (
    <div className="flex flex-col">
      <div className="flex space-x-4 mx-auto items-center mb-16">
        <span className="font-semibold">Search Node:</span>
        <div className="bg-[#0077b6] relative text-[#caf0f8] flex justify-center items-center rounded-full w-[50px] h-[50px]">
          <span>{node}</span>
          {ind === array.length ? (
            <div className="absolute top-0 bottom-0 right-0 left-o">
              <img src={cross} alt="" />
            </div>
          ) : null}
        </div>
        {ind === array.length ? (
          <span className="font-semibold text-red-600">Not Found</span>
        ) : null}
      </div>
      <div ref={scope} className="flex justify-center">
        {array.map((i, index) => {
          return (
            <div key={Math.random()} className="m-4">
              <Node
                highlight={index === ind}
                index={index}
                ind={ind}
                color={"#0077b6"}
                textCol={"#caf0f8"}
                ans={ind === index && array[ind] === node}
                success={index === ans}
              >
                {i}
              </Node>
            </div>
          );
        })}
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {ans != null || ind === array.length ? (
          <button
            className="p-1 px-2 rounded-lg text-[#757bc8] bg-blue-200"
            onClick={restart}
          >
            Restart
          </button>
        ) : (
          <>
            <button
              onClick={backward}
              disabled={ind === -1 || hang}
              className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
            >
              <img
                src={next}
                className="w-[50px] rotate-180 select-none"
                alt=""
              />
            </button>
            <button
              onClick={forward}
              disabled={ans != null || ind === array.length || hang}
              className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
            >
              <img src={next} className="w-[50px] select-none" alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
