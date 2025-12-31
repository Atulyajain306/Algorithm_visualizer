import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate } from "framer-motion";

export default function InsertionSortAnimation({ arr, order }) {
  const [ind, setInd] = useState(1);
  const [history, setHistory] = useState([
    { list: arr, successIndex: 0, index: 1 },
  ]);
  const [array, setArray] = useState(arr);
  const [successInd, setSuccessInd] = useState(0);
  const [scope, animate] = useAnimate();
  const [hang, setHang] = useState(false);

  function forward() {
    setHang(true);
    setTimeout(() => {
      if (order === "asc" && array[ind] < array[ind - 1]) {
        const indProxy = ind;
        const successIndProxy = successInd;
        const newArr = [...array];
        const temp = newArr[indProxy];
        newArr[indProxy] = newArr[indProxy - 1];
        newArr[indProxy - 1] = temp;
        animate(".first", { x: 82 }, { type: "tween", duration: 1 });
        animate(".second", { x: -82 }, { type: "tween", duration: 1 });
        setTimeout(() => {
          let newIndex = ind;
          let newSuccessIndex = successInd;
          if (indProxy === 1) {
            newSuccessIndex = successInd + 1;
            newIndex = successInd + 2;
          } else {
            newIndex = ind - 1;
          }

          if (indProxy === 1) {
            animate(".divider", { x: 82 }, { type: "tween", duration: 0.5 });
            setTimeout(() => {
              setSuccessInd((p) => p + 1);
              setInd(successIndProxy + 2);
              setArray([...newArr]);
              setHistory((p) => {
                return [
                  ...p,
                  {
                    list: [...newArr],
                    successIndex: newSuccessIndex,
                    index: newIndex,
                  },
                ];
              });
              setHang(false);
            }, 500);
          } else {
            setInd((p) => p - 1);
            setArray([...newArr]);
            setHistory((p) => {
              return [
                ...p,
                {
                  list: [...newArr],
                  successIndex: newSuccessIndex,
                  index: newIndex,
                },
              ];
            });
            setHang(false);
          }
        }, 1000);
      } else if (order === "desc" && array[ind] > array[ind - 1]) {
        const indProxy = ind;
        const successIndProxy = successInd;
        const newArr = [...array];
        const temp = newArr[indProxy];
        newArr[indProxy] = newArr[indProxy - 1];
        newArr[indProxy - 1] = temp;
        animate(".first", { x: 82 }, { type: "tween", duration: 1 });
        animate(".second", { x: -82 }, { type: "tween", duration: 1 });
        setTimeout(() => {
          let newIndex = ind;
          let newSuccessIndex = successInd;
          if (indProxy === 1) {
            newSuccessIndex = successInd + 1;
            newIndex = successInd + 2;
          } else {
            newIndex = ind - 1;
          }

          if (indProxy === 1) {
            animate(".divider", { x: 82 }, { type: "tween", duration: 0.5 });
            setTimeout(() => {
              setSuccessInd((p) => p + 1);
              setInd(successIndProxy + 2);
              setArray([...newArr]);
              setHistory((p) => {
                return [
                  ...p,
                  {
                    list: [...newArr],
                    successIndex: newSuccessIndex,
                    index: newIndex,
                  },
                ];
              });
              setHang(false);
            }, 500);
          } else {
            setInd((p) => p - 1);
            setArray([...newArr]);
            setHistory((p) => {
              return [
                ...p,
                {
                  list: [...newArr],
                  successIndex: newSuccessIndex,
                  index: newIndex,
                },
              ];
            });
            setHang(false);
          }
        }, 1000);
      } else {
        const successIndProxy = successInd;
        animate(".divider", { x: 82 }, { type: "tween", duration: 0.5 });
        setTimeout(() => {
          setSuccessInd((p) => p + 1);
          setInd(successIndProxy + 2);
          setHistory((p) => {
            return [
              ...p,
              {
                list: [...array],
                index: successIndProxy + 2,
                successIndex: successIndProxy + 1,
              },
            ];
          });
          setHang(false);
        }, 500);
      }
    }, 0);
  }

  // console.log(ind, array, history, successInd);

  function backward() {
    const prevSuccessInd = history[history.length - 2].successIndex;
    const prevIndex = history[history.length - 2].index;
    const prevArray = history[history.length - 2].list;
    setHistory((p) => {
      const newHistory = [...p];
      newHistory.splice(newHistory.length - 1, 1);
      return newHistory;
    });
    setArray(prevArray);
    setInd(prevIndex);
    setSuccessInd(prevSuccessInd);
  }

  function restart() {
    setInd(1);
    setSuccessInd(0);
    const arr = history[0];
    setArray([...arr.list]);
    setHistory((p) => {
      return [
        {
          list: [...p[0].list],
          index: p[0].index,
          successIndex: p[0].successIndex,
        },
      ];
    });
  }

  return (
    <div className="flex flex-col">
      <div ref={scope} className="flex">
        {array.map((i, index) => {
          return (
            <div
              key={Math.random()}
              style={{
                margin: "0px",
              }}
              className="px-4 relative"
            >
              {index === successInd && successInd != array.length - 1 ? (
                <div className="border-2 divider border-black absolute right-[-2px] h-full"></div>
              ) : null}
              <Node
                current={index === ind && successInd != array.length - 1}
                highlight={
                  (index === ind || index === ind - 1) &&
                  successInd != array.length - 1
                }
                success={successInd === array.length - 1}
                color={"#0077b6"}
                textCol={"#caf0f8"}
                ind={ind}
                index={index}
              >
                {i}
              </Node>
            </div>
          );
        })}
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {successInd === array.length - 1 ? (
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
              disabled={(successInd === 0 && ind === 1) || hang}
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
              disabled={hang}
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
