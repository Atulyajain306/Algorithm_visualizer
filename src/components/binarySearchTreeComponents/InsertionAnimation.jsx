import { useDispatch, useSelector } from "react-redux";
import TreeNode from "./TreeNode";
import { addInBinarySearchTree, objectTreeToArray } from "../../algorithms/bst";
import { bstActions } from "../../store/main";
import InsertionTree from "./InsertionTree";
import { useState, forwardRef, useImperativeHandle } from "react";
import next from "../../assets/next.png";

const InsertionAnimation = forwardRef(function InsertionAnimation(
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
      focus: [null, null, null],
    },
  ]);
  const dispatch = useDispatch();
  const [focus, setFocus] = useState([null, null, null]);

  useImperativeHandle(ref, () => {
    return {
      skip() {
        end();
      },
    };
  });

  function end() {
    let newTree =
      treeObject != null ? JSON.parse(JSON.stringify(originalObj)) : null;
    newTree = addInBinarySearchTree(newTree, currentOp[1]);
    const array = objectTreeToArray(newTree);
    // console.log(newTree, array);
    dispatch(bstActions.setTreeObject(newTree));
    dispatch(bstActions.setTreeArr(array));
    clean();
  }

  function forward() {
    if (focus[0] === null && focus[1] === null) {
      setFocus([0, 0, null]);
      setHistory((p) => {
        return [
          ...p,
          {
            focus: [0, 0, null],
          },
        ];
      });
    } else if (focus[2] === null) {
      const x = focus[0];
      const y = focus[1];
      const val = treeArr[x][y];
      const newFocus = [...focus];
      if (val > currentOp[1]) {
        newFocus.pop();
        if (x + 1 === treeArr.length || treeArr[x + 1][2 * y] === null) {
          newFocus.push([true, false]);
        } else {
          newFocus.push([x + 1, 2 * y]);
        }
      } else {
        newFocus.pop();
        if (x + 1 === treeArr.length || treeArr[x + 1][2 * y + 1] === null) {
          newFocus.push([false, true]);
        } else {
          newFocus.push([x + 1, 2 * y + 1]);
        }
      }
      setFocus(JSON.parse(JSON.stringify(newFocus)));
      setHistory((p) => {
        return [
          ...p,
          {
            focus: JSON.parse(JSON.stringify(newFocus)),
          },
        ];
      });
    } else if (typeof focus[2][0] != "boolean") {
      // console.log(typeof focus[2][0]);
      let newFocus = JSON.parse(JSON.stringify(focus));
      newFocus = [newFocus[2][0], newFocus[2][1], null];
      setFocus(newFocus);
      setHistory((p) => {
        return [
          ...p,
          {
            focus: JSON.parse(JSON.stringify(newFocus)),
          },
        ];
      });
    } else {
      let newTree =
        treeObject != null ? JSON.parse(JSON.stringify(treeObject)) : null;
      newTree = addInBinarySearchTree(newTree, currentOp[1]);
      const array = objectTreeToArray(newTree);
      // console.log(newTree, array);
      setTreeArr(JSON.parse(JSON.stringify(array)));
      setTreeObject(JSON.parse(JSON.stringify(newTree)));
      setFocus(null);
      setHistory((p) => {
        return [
          ...p,
          {
            focus: null,
          },
        ];
      });
    }
  }

  function backward() {
    setFocus(JSON.parse(JSON.stringify(history[history.length - 2].focus)));
    const newHistory = JSON.parse(JSON.stringify(history));
    newHistory.pop();
    setHistory(JSON.parse(JSON.stringify(newHistory)));
  }

  function restart() {
    setFocus([null, null, null]);
    setTreeArr(JSON.parse(JSON.stringify(originalArr)));
    setTreeObject(JSON.parse(JSON.stringify(originalObj)));
    setHistory([
      {
        focus: [null, null, null],
      },
    ]);
  }

  if (treeObject === null) {
    return (
      <>
        <div className="">
          <div className="flex justify-center space-x-4">
            <button
              className="p-1 px-2 rounded-lg text-[#757bc8] bg-blue-200"
              onClick={end}
            >
              End
            </button>
          </div>
        </div>
        <div className="flex flex-col m-auto mt-16">
          <div className="flex w-auto relative h-[80px]">
            <div className="tree-node translate-x-[-50%] left-[50%] absolute px-2">
              <TreeNode>{currentOp[1]}</TreeNode>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="sticky">
          <div className="flex space-x-4  justify-center">
            {focus === null ? (
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
                  disabled={focus[0] === null}
                  className="w-[30px] h-[30px] select-none  duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img
                    src={next}
                    className="w-[50px] rotate-180 select-none"
                    alt=""
                  />
                </button>
                <button
                  onClick={forward}
                  className="w-[30px] h-[30px] select-none  duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img src={next} className="w-[50px] select-none" alt="" />
                </button>
              </>
            )}
          </div>
        </div>
        <InsertionTree treeArr={treeArr} focus={focus || [null, null, null]} />
      </>
    );
  }
});

export default InsertionAnimation;
