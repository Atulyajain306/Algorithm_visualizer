import { useDispatch, useSelector } from "react-redux";
import DeletionTree from "./DeletionTree";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import next from "../../assets/next.png";
import {
  deleteInBinarySearchTree,
  deleteNode,
  findParent,
  getMaxNode,
  getNode,
  getNodeByIndices,
  objectTreeToArray,
} from "../../algorithms/bst";
import { useAnimate } from "framer-motion";
import { bstActions } from "../../store/main";

const DeletionAnimation = forwardRef(function DeletionAnimation(
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
      currInd: null,
      status: null,
      found: null,
      toBeDeleted: null,
      childNode: null,
      treeArr: treeArr,
      treeObject: treeObject,
    },
  ]);
  const [timeline, setTimeline] = useState(null);
  const [currInd, setCurrInd] = useState(null);
  const [found, setFound] = useState(null);
  const [status, setStatus] = useState(null);
  const [scope, animate] = useAnimate();
  const [toBeDeleted, setToBeDeleted] = useState(null);
  const [childNode, setChildNode] = useState(null);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      skip() {
        end();
      },
    };
  });

  useEffect(() => {
    const array = deleteNode(originalObj, currentOp[1]);
    // console.log(array);
    setTimeline(JSON.parse(JSON.stringify(array)));
  }, []);

  function end() {
    const newTree = JSON.parse(JSON.stringify(originalObj));
    const res = deleteInBinarySearchTree(newTree, currentOp[1]);
    // console.log(res);
    let newArr = objectTreeToArray(res);
    if (newArr.length === 0) {
      newArr = null;
    }
    // console.log(newArr);
    dispatch(bstActions.setTreeObject(res));
    dispatch(bstActions.setTreeArr(newArr));
    clean();
  }

  function forward() {
    const newInd = currInd + 1;
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
    } else if (timeline[newInd].type === "notFound") {
      setStatus(false);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            status: false,
          },
        ];
      });
    } else if (timeline[newInd].type === "searching") {
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            currInd: newInd,
          },
        ];
      });
    } else if (timeline[newInd].type === "found") {
      const x = timeline[newInd].x;
      const y = timeline[newInd].y;
      setFound([[x, y]]);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            found: [[x, y]],
            currInd: newInd,
          },
        ];
      });
    } else if (timeline[newInd].type === "replaceNdelete") {
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            currInd: newInd,
          },
        ];
      });
    } else if (timeline[newInd].type === "replaceNdeleteComplete") {
      const x1 = timeline[newInd].x1;
      const y1 = timeline[newInd].y1;
      const x2 = timeline[newInd].x2;
      const y2 = timeline[newInd].y2;
      const newTree = JSON.parse(JSON.stringify(treeObject));
      const node = getNode(newTree, currentOp[1]);
      const parent = findParent(newTree, currentOp[1]);
      if (parent === null) {
        const replaceNode = getNodeByIndices(newTree, x2, y2);
        const rightExists = replaceNode.right != null;
        const leftExists = replaceNode.left != null;

        let newTreeObject = {
          val: originalArr[x2][y2],
          right: rightExists
            ? JSON.parse(JSON.stringify(replaceNode.right))
            : null,
          left: leftExists
            ? JSON.parse(JSON.stringify(replaceNode.left))
            : null,
        };
        let newTreeArr = JSON.parse(
          JSON.stringify(objectTreeToArray(newTreeObject))
        );
        setTreeArr(newTreeArr);
        // console.log(newTreeArr, newTreeObject);
        setTreeObject(newTreeObject);
        setStatus(true);
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              treeArr: JSON.parse(JSON.stringify(newTreeArr)),
              treeObject: JSON.parse(JSON.stringify(newTreeObject)),
              status: true,
            },
          ];
        });
        return;
      }
      // console.log(node, parent);
      if (y1 % 2 === 0) {
        if (y2 % 2 === 0) {
          parent.left = node.left;
        } else {
          parent.left = node.right;
        }
      } else {
        if (y2 % 2 === 0) {
          parent.right = node.left;
        } else {
          parent.right = node.right;
        }
      }
      const newArr = objectTreeToArray(newTree);

      setTreeArr(newArr);
      setTreeObject(newTree);

      setStatus(true);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            treeArr: newArr,
            treeObject: newTree,
            status: true,
          },
        ];
      });
    } else if (timeline[newInd].type === "delete") {
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            currInd: newInd,
          },
        ];
      });
    } else if (timeline[newInd].type === "deleteComplete") {
      const x = timeline[newInd].x;
      const y = timeline[newInd].y;

      const newTree = JSON.parse(JSON.stringify(treeObject));
      const parent = findParent(newTree, currentOp[1]);
      if (parent === null) {
        setTreeArr(null);
        setTreeObject(null);
        setStatus(true);
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              treeArr: null,
              treeObject: null,
              status: true,
            },
          ];
        });
        return;
      }
      if (y % 2 != 0) {
        parent.right = null;
      } else {
        parent.left = null;
      }
      const newArr = objectTreeToArray(newTree);
      setTreeArr(newArr);
      setTreeObject(newTree);

      setStatus(true);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            treeArr: newArr,
            treeObject: newTree,
            status: true,
          },
        ];
      });
    } else if (timeline[newInd].type === "successor") {
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            currInd: newInd,
          },
        ];
      });
    } else if (timeline[newInd].type === "successorFound") {
      const newFound = JSON.parse(JSON.stringify(found));
      const p = timeline[newInd].p;
      const q = timeline[newInd].q;
      newFound.push([p, q]);
      setFound(newFound);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            found: newFound,
            currInd: newInd,
          },
        ];
      });
    } else if (timeline[newInd].type === "replaceValues") {
      const x = timeline[newInd].x;
      const y = timeline[newInd].y;
      const p = timeline[newInd].p;
      const q = timeline[newInd].q;
      const newTree = JSON.parse(JSON.stringify(treeObject));
      const newArr = objectTreeToArray(newTree);
      const temp = newArr[x][y];
      newArr[x][y] = newArr[p][q];
      newArr[p][q] = temp;
      const node = getNode(newTree, currentOp[1]);
      node.val = newArr[x][y];
      // console.log(node);
      const [successor, parentOfSuccessor] = getMaxNode(node);
      successor.val = temp;
      setToBeDeleted([p - 1, Math.floor(q / 2)]);
      setChildNode([p, q]);
      setCurrInd(newInd);
      setTreeArr(newArr);
      setTreeObject(newTree);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            toBeDeleted: [p - 1, Math.floor(q / 2)],
            childNode: [p, q],
            currInd: newInd,
            treeArr: newArr,
            treeObject: newTree,
          },
        ];
      });
    } else if (timeline[newInd].type === "deleteSuccessor") {
      let newFound = JSON.parse(JSON.stringify(found));
      newFound = [newFound[newFound.length - 1]];
      setFound(newFound);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            found: newFound,
            currInd: newInd,
          },
        ];
      });
    } else if (timeline[newInd].type === "deleteSuccessorComplete") {
      const x = timeline[newInd].p;
      const y = timeline[newInd].q;
      const toBeDeletedNode = getNodeByIndices(
        treeObject,
        toBeDeleted[0],
        toBeDeleted[1]
      );
      if (y % 2 != 0) {
        toBeDeletedNode.right = null;
      } else {
        toBeDeletedNode.left = null;
      }
      const newTree = JSON.parse(JSON.stringify(treeObject));
      const newArr = objectTreeToArray(newTree);
      setTreeArr(newArr);
      setTreeObject(newTree);
      setStatus(true);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            treeArr: newArr,
            treeObject: newTree,
            status: true,
          },
        ];
      });
    } else if (timeline[newInd].type === "replaceNdeleteSuccessor") {
      let newFound = JSON.parse(JSON.stringify(found));
      newFound = [newFound[newFound.length - 1]];
      setFound(newFound);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            found: newFound,
            currInd: newInd,
          },
        ];
      });
    } else if (timeline[newInd].type === "replaceNdeleteSuccessorComplete") {
      const x1 = timeline[newInd].x1;
      const y1 = timeline[newInd].y1;
      const x2 = timeline[newInd].x2;
      const y2 = timeline[newInd].y2;
      const toBeDeletedNode = getNodeByIndices(
        treeObject,
        toBeDeleted[0],
        toBeDeleted[1]
      );
      const realChildNode = getNodeByIndices(
        treeObject,
        childNode[0],
        childNode[1]
      );
      if (y1 % 2 === 0) {
        if (y2 % 2 === 0) {
          toBeDeletedNode.left = realChildNode.left;
        } else {
          toBeDeletedNode.left = realChildNode.right;
        }
      } else {
        if (y2 % 2 === 0) {
          toBeDeletedNode.right = realChildNode.left;
        } else {
          toBeDeletedNode.right = realChildNode.right;
        }
      }

      const newTree = JSON.parse(JSON.stringify(treeObject));

      const newArr = objectTreeToArray(newTree);

      setTreeArr(newArr);
      setTreeObject(newTree);

      setStatus(true);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            treeArr: newArr,
            treeObject: newTree,
            status: true,
          },
        ];
      });
    }
  }
  // console.log(timeline, currInd, found);

  function backward() {
    const lastHistory = JSON.parse(JSON.stringify(history[history.length - 2]));
    setCurrInd(lastHistory.currInd);
    setStatus(lastHistory.status);
    setFound(JSON.parse(JSON.stringify(lastHistory.found)));
    setToBeDeleted(JSON.parse(JSON.stringify(lastHistory.toBeDeleted)));
    setChildNode(JSON.parse(JSON.stringify(lastHistory.childNode)));
    setTreeArr(JSON.parse(JSON.stringify(lastHistory.treeArr)));
    setTreeObject(JSON.parse(JSON.stringify(lastHistory.treeObject)));
    const newHistory = JSON.parse(JSON.stringify(history));
    newHistory.pop();
    setHistory(newHistory);
  }

  function restart() {
    setCurrInd(null);
    setStatus(null);
    setFound(null);
    setToBeDeleted(null);
    setChildNode(null);
    setTreeArr(JSON.parse(JSON.stringify(originalArr)));
    setTreeObject(JSON.parse(JSON.stringify(originalObj)));
    setHistory([
      {
        currInd: null,
        status: null,
        found: null,
        toBeDeleted: null,
        childNode: null,
        treeArr: JSON.parse(JSON.stringify(originalArr)),
        treeObject: JSON.parse(JSON.stringify(originalObj)),
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
                    className="w-[50px] select-none rotate-180"
                    alt=""
                  />
                </button>
                <button
                  onClick={forward}
                  className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img src={next} className="w-[50px] select-none" alt="" />
                </button>
              </>
            )}
          </div>
        </div>
        <div ref={scope}>
          <DeletionTree
            treeArr={treeArr}
            status={status}
            currentNode={timeline && currInd != null ? timeline[currInd] : null}
            found={found}
          />
        </div>
      </>
    );
  }
});

export default DeletionAnimation;
