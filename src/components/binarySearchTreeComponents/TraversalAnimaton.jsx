import { useDispatch, useSelector } from "react-redux";
import TraversalTree from "./TraversalTree";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import next from "../../assets/next.png";
import { postOrder, preorder, inOrder } from "../../algorithms/bst";
import { useAnimate } from "framer-motion";

const TraversalAnimation = forwardRef(function TraversalAnimation(
  { clean },
  ref
) {
  const [treeObject, setTreeObject] = useState(
    JSON.parse(JSON.stringify(useSelector((state) => state.bst.treeObject)))
  );
  const [treeArr, setTreeArr] = useState(
    JSON.parse(JSON.stringify(useSelector((state) => state.bst.treeArr)))
  );
  const originalObj = useSelector((state) => state.bst.treeObject);
  const originalArr = useSelector((state) => state.bst.treeArr);
  const currentOp = useSelector((state) => state.bst.currentOp);
  const [history, setHistory] = useState([
    {
      printed: [],
      currInd: null,
      status: null,
    },
  ]);
  const [timeline, setTimeline] = useState(null);
  const [currInd, setCurrInd] = useState(null);
  const [printed, setPrinted] = useState([]);
  const [status, setStatus] = useState(null);
  const [scope, animate] = useAnimate();

  useImperativeHandle(ref, () => {
    return {
      skip() {
        end();
      },
    };
  });

  useEffect(() => {
    if (treeArr != null) {
      if (currentOp[1] === "postorder") {
        const array = JSON.parse(JSON.stringify(postOrder(originalObj)));
        setTimeline(array);
      } else if (currentOp[1] === "preorder") {
        const array = JSON.parse(JSON.stringify(preorder(originalObj)));
        setTimeline(array);
      } else {
        const array = JSON.parse(JSON.stringify(inOrder(originalObj)));
        setTimeline(array);
      }
    }
  }, []);

  function end() {
    clean();
  }

  function forward() {
    if (currInd === null) {
      setCurrInd(0);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            currInd: 0,
          },
        ];
      });
    } else {
      const newInd = currInd + 1;
      if (newInd < timeline.length) {
        const newPrinted = JSON.parse(JSON.stringify(printed));
        if (timeline[newInd].type === "print") {
          newPrinted.push({
            val: originalArr[timeline[newInd].x][timeline[newInd].y],
            x: timeline[newInd].x,
            y: timeline[newInd].y,
          });
          setPrinted(newPrinted);
          setTimeout(() => {
            animate(
              `.index${newPrinted.length - 1}`,
              { scale: [5, 2, 0.5, 1] },
              { type: "spring", duration: 0.5 }
            );
          }, 0);
        }

        setCurrInd((p) => p + 1);
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              currInd: newInd,
              printed: JSON.parse(JSON.stringify(newPrinted)),
            },
          ];
        });
      } else {
        setCurrInd(null);
        setStatus(true);
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              currInd: null,
              status: true,
            },
          ];
        });
      }
    }
  }

  function backward() {
    setPrinted(JSON.parse(JSON.stringify(history[history.length - 2].printed)));
    setStatus(history[history.length - 2].status);
    setCurrInd(history[history.length - 2].currInd);
    const newHistory = JSON.parse(JSON.stringify(history));
    newHistory.pop();
    setHistory(JSON.parse(JSON.stringify(newHistory)));
  }

  function restart() {
    setCurrInd(null);
    setStatus(null);
    setPrinted([]);
    setHistory([
      {
        printed: [],
        currInd: null,
        status: null,
      },
    ]);
  }

  if (treeObject === null) {
    return (
      <>
        <div className="">
          <div className="flex justify-center space-x-4">
            <button
              className="p-1 px-2 select-none  rounded-lg text-[#757bc8] bg-blue-200"
              onClick={end}
            >
              End
            </button>
          </div>
        </div>
        <div className="flex flex-col m-auto mt-16">
          <div className="flex w-auto relative justify-center h-[80px]">
            Tree Empty
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="sticky">
          <div className="flex space-x-4  justify-center">
            {status === true || status === false ? (
              <>
                <button
                  className="p-1 px-2 select-none  rounded-lg text-[#757bc8] bg-blue-200"
                  onClick={restart}
                >
                  Restart
                </button>
                <button
                  className="p-1 px-2 select-none  rounded-lg text-[#757bc8] bg-blue-200"
                  onClick={end}
                >
                  End
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={backward}
                  disabled={currInd === null}
                  className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img
                    src={next}
                    className="w-[50px] select-none  rotate-180"
                    alt=""
                  />
                </button>
                <button
                  onClick={forward}
                  className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img src={next} className="w-[50px] select-none " alt="" />
                </button>
              </>
            )}
          </div>
        </div>
        <div ref={scope}>
          <TraversalTree
            treeArr={treeArr}
            status={status}
            currentNode={timeline && currInd != null ? timeline[currInd] : null}
            printed={printed}
          />
        </div>
      </>
    );
  }
});

export default TraversalAnimation;
