import { useState, useRef, useEffect } from "react";
import InsertionAnimation from "../components/binarySearchTreeComponents/InsertionAnimation";
import SearchingAnimation from "../components/binarySearchTreeComponents/SearchingAnimation";
import { useDispatch } from "react-redux";
import { bstActions } from "../store/main";
import Tree from "../components/binarySearchTreeComponents/Tree";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import TraversalAnimation from "../components/binarySearchTreeComponents/TraversalAnimaton";
import DeletionAnimation from "../components/binarySearchTreeComponents/DeletionAnimation";
import enterWater from "../assets/watermarks/BST/enter.png";
import insertWater from "../assets/watermarks/BST/insert.png";
import deleteWater from "../assets/watermarks/BST/delete.png";
import searchWater from "../assets/watermarks/BST/search.png";
import traverseWater from "../assets/watermarks/BST/traverse.png";
import cancelWater from "../assets/watermarks/BST/cancel.png";
import skipWater from "../assets/watermarks/BST/skip.png";
import resetWater from "../assets/watermarks/BST/reset.png";
import { generalActions } from "../store/main";
import { Helmet } from "react-helmet-async";

export default function BinarySearchTree() {
  const insertionRef = useRef();
  const [disable, setDisable] = useState(false);
  const [insertion, setInsertion] = useState(undefined);
  const deletionRef = useRef();
  const [deletion, setDeletion] = useState(undefined);
  const [searching, setSearching] = useState(undefined);
  const searchingRef = useRef();
  const [traversal, setTraversal] = useState(undefined);
  const traversalRef = useRef(null);
  const dispatch = useDispatch();
  const treeArray = useSelector((state) => state.bst.treeArr);
  const treeObject = useSelector((state) => state.bst.treeObject);
  const animationRef = useRef();
  const [traversalVal, setTraversalVal] = useState("postorder");

  useEffect(() => {
    dispatch(bstActions.setCurrentOp(null));
    dispatch(bstActions.setTreeArr(null));
    dispatch(bstActions.setTreeObject(null));
    dispatch(bstActions.setHeapArr(null));
    dispatch(bstActions.setMinMaxNumber(null));
    dispatch(bstActions.setHeapType(null));
  }, []);

  useEffect(() => {
    if (treeArray || disable) {
      dispatch(generalActions.setActivity(true));
    }
    return () => {
      dispatch(generalActions.setActivity(false));
    };
  }, [treeArray, disable]);

  function insertionClick(event) {
    if (event.key === "Enter") {
      const str = insertionRef.current.value.trim();
      let ans = "";
      for (let i of str) {
        if (i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) {
          ans += i;
        } else {
          setInsertion(null);
          return;
        }
      }
      ans = parseInt(ans);
      if (isNaN(ans) || ans < 0) {
        setInsertion(null);
        return;
      }
      setInsertion(ans);
      begin(0);
      setDisable(true);
      dispatch(bstActions.setCurrentOp([0, ans]));
    }
  }

  function deletionClick(event) {
    if (event.key === "Enter") {
      const str = deletionRef.current.value.trim();
      let ans = "";
      for (let i of str) {
        if (i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) {
          ans += i;
        } else {
          setDeletion(null);
          return;
        }
      }
      ans = parseInt(ans);
      if (isNaN(ans) || ans < 0) {
        setDeletion(null);
        return;
      }
      setDeletion(ans);
      begin(1);
      setDisable(true);
      dispatch(bstActions.setCurrentOp([1, ans]));
    }
  }

  function begin(num) {
    searchingRef.current.value = "";
    insertionRef.current.value = "";
    deletionRef.current.value = "";
    if (num === 0) {
      setDeletion(undefined);
      setSearching(undefined);
      setTraversal(undefined);
    } else if (num === 1) {
      setInsertion(undefined);
      setSearching(undefined);
      setTraversal(undefined);
    } else if (num === 2) {
      setInsertion(undefined);
      setDeletion(undefined);
      setTraversal(undefined);
    } else {
      setInsertion(undefined);
      setDeletion(undefined);
      setSearching(undefined);
    }
  }

  function searchingClick(event) {
    if (event.key === "Enter") {
      const str = searchingRef.current.value.trim();
      let ans = "";
      for (let i of str) {
        if (i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) {
          ans += i;
        } else {
          setSearching(null);
          return;
        }
      }
      ans = parseInt(ans);
      if (isNaN(ans) || ans < 0) {
        setSearching(null);
        return;
      }
      setSearching(ans);
      begin(2);
      setDisable(true);
      dispatch(bstActions.setCurrentOp([2, ans]));
    }
  }

  function reset() {
    setDisable(false);
    setInsertion(undefined);
    setDeletion(undefined);
    setTraversal(undefined);
    setSearching(undefined);
    dispatch(bstActions.setTreeArr(null));
    dispatch(bstActions.setCurrentOp(null));
    dispatch(bstActions.setTreeObject(null));
    searchingRef.current.value = "";
    insertionRef.current.value = "";
    deletionRef.current.value = "";
    traversalRef.current.value = "postorder";
  }

  function clean() {
    setDisable(false);
    setInsertion(undefined);
    setDeletion(undefined);
    setTraversal(undefined);
    setSearching(undefined);
  }

  function skip() {
    animationRef.current.skip();
  }

  function cancel() {
    clean();
    dispatch(bstActions.setCurrentOp(null));
  }

  function traversalClick() {
    begin(3);
    setTraversal(traversalRef.current.value);
    setDisable(true);
    dispatch(bstActions.setCurrentOp([3, traversalRef.current.value]));
  }

  return (
    <>
      <Helmet>
        <title>Binary Search Tree | AlgoTrace</title>
        <meta
          name="description"
          content="Visit the interactive Animation for Binary Search Tree"
        />
      </Helmet>
      <div className="flex flex-col  select-none  w-full py-16 pt-12 px-8 h-full mb-[200px]">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-16">
          Binary Search Tree
        </h1>
        <div className="flex relative  mx-auto">
          {disable || treeArray ? null : (
            <motion.div
              style={{ display: disable || treeArray ? "none" : "" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75 }}
              className="absolute top-[-10px] left-[70px] scale-125 translate-y-[-100%]"
            >
              <img src={enterWater} className="opacity-50" alt="" />
            </motion.div>
          )}
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex relative flex-col max-w-[200px]">
              {disable || treeArray ? null : (
                <motion.div
                  style={{ display: disable || treeArray ? "none" : "" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute bottom-[-20px] left-[20px] translate-x-[-100%] scale-[125%]  translate-y-[100%]"
                >
                  <img src={insertWater} className="opacity-50" alt="" />
                </motion.div>
              )}
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Insertion
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[150px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 Press Enter"
                  type="text"
                  disabled={disable}
                  ref={insertionRef}
                  onKeyDown={(event) => insertionClick(event)}
                />
              </div>
              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {insertion === undefined ? (
                  <p></p>
                ) : insertion === null ? (
                  <p className="text-red-500">Invalid Value Entered</p>
                ) : (
                  <p className="max-w-[400px]">{insertion}</p>
                )}
              </div>
            </div>
            <div className="flex relative flex-col max-w-[200px]">
              {disable || treeArray ? null : (
                <motion.div
                  style={{ display: disable || treeArray ? "none" : "" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute bottom-[-40px] left-[50%] translate-x-[-100%] scale-[200%]  translate-y-[100%]"
                >
                  <img src={deleteWater} className="opacity-50" alt="" />
                </motion.div>
              )}

              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Deletion
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[150px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 Press Enter"
                  type="text"
                  disabled={disable}
                  ref={deletionRef}
                  onKeyDown={(event) => deletionClick(event)}
                />
              </div>

              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {deletion === undefined ? (
                  <p></p>
                ) : deletion === null ? (
                  <p className="text-red-500">Invalid Value Entered</p>
                ) : (
                  <p className="max-w-[400px]">{deletion}</p>
                )}
              </div>
            </div>
            <div className="flex relative flex-col max-w-[200px]">
              {disable || treeArray ? null : (
                <motion.div
                  style={{ display: disable || treeArray ? "none" : "" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute bottom-[-45px] right-[100px] scale-[200%] translate-x-[100%] translate-y-[100%]"
                >
                  <img src={searchWater} className="opacity-50" alt="" />
                </motion.div>
              )}
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Searching
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[150px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 Press Enter"
                  type="text"
                  disabled={disable}
                  ref={searchingRef}
                  onKeyDown={(event) => searchingClick(event)}
                />
              </div>

              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {searching === undefined ? (
                  <p></p>
                ) : searching === null ? (
                  <p className="text-red-500">Invalid Value Entered</p>
                ) : (
                  <p className="max-w-[400px]">{searching}</p>
                )}
              </div>
            </div>
            <div className="flex relative flex-col w-[180px]">
              {disable || treeArray ? null : (
                <motion.div
                  style={{ display: disable || treeArray ? "none" : "" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute bottom-[-30px] right-[20px] scale-[150%] translate-x-[100%] translate-y-[100%]"
                >
                  <img src={traverseWater} className="opacity-50" alt="" />
                </motion.div>
              )}
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Traversal
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <select
                  className="px-3 p-1 text-black text-sm min-w-[150px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  disabled={disable}
                  ref={traversalRef}
                  value={traversalVal}
                  onChange={(event) => setTraversalVal(event.target.value)}
                >
                  <option value="postorder">Postorder</option>
                  <option value="preorder">Preorder</option>
                  <option value="inorder">Inorder</option>
                </select>
              </div>

              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                <button
                  disabled={disable}
                  onClick={traversalClick}
                  className=" px-4 flex-col pb-1  m-4 rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d] text-lg border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white font-semibold flex justify-center items-center"
                >
                  {traversalVal[0].toUpperCase() + traversalVal.slice(1)}
                </button>
              </div>
            </div>
            <div className="flex relative flex-col w-[150px] justify-center ml-2">
              {disable || treeArray ? null : (
                <motion.div
                  style={{ display: disable || treeArray ? "none" : "" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute top-[30px] right-[-45px] scale-[135%] translate-x-[100%] translate-y-[-100%]"
                >
                  <img src={cancelWater} className="opacity-50" alt="" />
                </motion.div>
              )}
              {disable || treeArray ? null : (
                <motion.div
                  style={{ display: disable || treeArray ? "none" : "" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute top-[20px] right-[-45px] scale-[135%] translate-x-[100%] translate-y-[100%]"
                >
                  <img src={skipWater} className="opacity-50" alt="" />
                </motion.div>
              )}
              {disable || treeArray ? null : (
                <motion.div
                  style={{ display: disable || treeArray ? "none" : "" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75 }}
                  className="absolute bottom-[30px] right-[-45px] scale-[135%] translate-x-[100%] translate-y-[100%]"
                >
                  <img src={resetWater} className="opacity-50" alt="" />
                </motion.div>
              )}
              <button
                disabled={!disable}
                onClick={cancel}
                className="rounded-xl text-xl font-bold bg-[#f4acb7] text-[#fff0f3] border-2 border-[#f4acb7] hover:bg-[#fff0f3] hover:text-[#f4acb7] duration-700 disabled:opacity-50 disabled:pointer-events-none py-2 uppercase m-1 "
              >
                cancel
              </button>
              <button
                disabled={!disable}
                onClick={skip}
                className="rounded-xl text-xl font-bold bg-[#adc178] text-[#eff6e0] border-2 border-[#adc178] hover:bg-[#eff6e0] hover:text-[#adc178] duration-700 disabled:opacity-50 disabled:pointer-events-none py-2 uppercase m-1"
              >
                skip
              </button>
              <button
                disabled={treeArray === null}
                onClick={reset}
                className="rounded-xl text-xl font-bold bg-[#fec89a] text-[#f8edeb] border-2 border-[#fec89a] hover:bg-[#f8edeb] hover:text-[#fec89a] duration-700 disabled:opacity-50 disabled:pointer-events-none py-2 uppercase m-1"
              >
                reset
              </button>
            </div>
          </div>
        </div>

        <div className="w-full  mt-8  customScroll justify-center items-center">
          {disable && insertion != null && insertion != undefined ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <InsertionAnimation ref={animationRef} clean={clean} />
            </motion.div>
          ) : null}
          {disable && searching != null && searching != undefined ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <SearchingAnimation ref={animationRef} clean={clean} />
            </motion.div>
          ) : null}
          {disable && traversal != null && traversal != undefined ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <TraversalAnimation ref={animationRef} clean={clean} />
            </motion.div>
          ) : null}
          {disable && deletion != null && deletion != undefined ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <DeletionAnimation ref={animationRef} clean={clean} />
            </motion.div>
          ) : null}
          {!disable && treeArray != null ? (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <Tree />
            </motion.div>
          ) : null}
        </div>
      </div>
    </>
  );
}
