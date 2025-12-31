import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate } from "framer-motion";
import cross from "../../assets/cross.png";

export default function BinarySearchAnimation({ arr, node }) {
  const [ind, setInd] = useState(null);
  const [history, setHistory] = useState([
    { ind: null, high: arr.length - 1, low: 0 },
  ]);
  const [array, setArray] = useState(arr);
  const [scope, animate] = useAnimate();
  const [ans, setAns] = useState(null);
  const [high, setHigh] = useState(arr.length - 1);
  const [low, setLow] = useState(0);

  const [hang, setHang] = useState(false);

  function forward() {
    setHang(true);
    setTimeout(() => {
      if (ind === null) {
        const mid = Math.floor((low + high) / 2);
        setInd(mid);
        setHistory((p) => {
          return [
            ...p,
            {
              ind: mid,
              high: high,
              low: low,
            },
          ];
        });
        setTimeout(() => {
          if (array[mid] === node) {
            // console.log("chh");
            animate(
              `.index${mid}`,
              {
                scale: [2, 1, 0.5, 1],
                backgroundColor: ["#0077b6", "#4f772d"],
              },
              { type: "spring", duration: 0.7 }
            );
            setTimeout(() => {
              setAns(mid);

              setHang(false);
            }, 700);
          } else {
            setHang(false);
          }
        }, 0);
      } else {
        // console.log(ind, low, high);
        const indP = ind;
        setInd(null);
        setTimeout(() => {
          if (array[indP] > node) {
            // console.log("rger");
            const value = -82 * (high - indP + 1);
            animate(".high", { x: [0, value] }, { type: "tween", duration: 1 });
            setTimeout(() => {
              setHigh(indP - 1);
              setHistory((p) => {
                return [
                  ...p,
                  {
                    ind: null,
                    high: indP - 1,
                    low: low,
                  },
                ];
              });
              setHang(false);
            }, 1000);
          } else {
            const value = 82 * (indP + 1 - low);
            animate(".low", { x: [0, value] }, { type: "tween", duration: 1 });
            setTimeout(() => {
              setLow(indP + 1);
              setHistory((p) => {
                return [
                  ...p,
                  {
                    ind: null,
                    high: high,
                    low: indP + 1,
                  },
                ];
              });
              setHang(false);
            }, 1000);
          }
        }, 0);
      }
    }, 0);
  }

  // console.log(ind, array, history, node);

  function backward() {
    const prevHistory = history[history.length - 2];
    setInd(prevHistory.ind);
    setHigh(prevHistory.high);
    setLow(prevHistory.low);
    setHistory((p) => {
      const newHistory = [...p];
      newHistory.splice(newHistory.length - 1, 1);
      return newHistory;
    });
  }

  function restart() {
    setInd(null);
    setAns(null);
    setArray([...arr]);
    setLow(0);
    setHigh(array.length - 1);
    setHistory([
      {
        ind: null,
        low: 0,
        high: array.length - 1,
      },
    ]);
  }

  return (
    <div className="flex flex-col">
      <div className="flex space-x-4 relative mx-auto justify-center w-full items-center mb-16">
        <span className="font-semibold">Search Node:</span>
        <div className="bg-[#0077b6] relative text-[#caf0f8] flex justify-center items-center rounded-full w-[50px] h-[50px]">
          <span>{node}</span>
        </div>
        {ind != null ? (
          <div className="pl-4 absolute right-[-100px] font-bold">
            {`(${low} + ${high})/2 = ${ind}`}
          </div>
        ) : null}

        {high < low ? (
          <span className="font-semibold text-red-600">Not Found</span>
        ) : null}
      </div>
      <div ref={scope} className="flex justify-center">
        {array.map((i, index) => {
          return (
            <div
              key={Math.random()}
              style={{ margin: "16px", position: "relative" }}
            >
              <Node
                highlight={index === ind}
                index={index}
                ind={ind}
                color={"#0077b6"}
                textCol={"#caf0f8"}
                ans={ind === index && array[ind] === node}
                success={index === ans}
                high={high}
                low={low}
              >
                {i}
              </Node>
              {index === low && low <= high ? (
                <div className="absolute low top-0 left-[-10px] h-full border-2 border-black"></div>
              ) : null}
              {index === high && low <= high ? (
                <div className="absolute high top-0 right-[-10px] h-full border-2 border-black"></div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {high < low || ans != null ? (
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
              disabled={
                (low === 0 && high === array.length - 1 && ind === null) || hang
              }
              className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
            >
              <img
                src={next}
                className="w-[50px] select-none rotate-180"
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
