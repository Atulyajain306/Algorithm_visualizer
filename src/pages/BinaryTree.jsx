import { useState, useRef, useEffect } from "react";
import BinaryTreeAnimation from "../components/binaryTreeComponents/BinaryTreeAnimation";
import EnterArray from "../components/UIComponents/EnterArray";
import Order from "../components/UIComponents/Order";
import Go from "../components/UIComponents/Go";
import { useDispatch } from "react-redux";
import { generalActions } from "../store/main";
import { Helmet } from "react-helmet-async";

export default function BinaryTree() {
  const textRef = useRef();
  const [arr, setArr] = useState(undefined);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (arr) {
      dispatch(generalActions.setActivity(true));
    }
    return () => {
      dispatch(generalActions.setActivity(false));
    };
  }, [arr]);

  function keyClick(event) {
    if (event.key === "Enter") {
      const res = getArray(event.target.value);
      // console.log(res);
      if (res != null) {
        setArr([...res]);
      } else {
        setArr(null);
      }
      event.target.value = "";
    }
  }

  function getArray(str) {
    const arr = [];
    while (str != "") {
      str = str.trim();
      let num = "";
      let count = 0;
      for (let i of str) {
        ++count;
        if (
          (i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) ||
          i.charCodeAt(0) === 78 ||
          i.charCodeAt(0) === 45
        ) {
          num += i;
        } else if (i === " ") {
          break;
        } else {
          return null;
        }
      }
      str = str.slice(count);
      let integer = parseInt(num);
      if (integer != 0 && !integer) {
        if (num === "N") {
          integer = num;
        } else {
          return null;
        }
      }
      arr.push(integer + "");
    }
    if (arr.length === 0) {
      return null;
    }
    return arr;
  }

  function printArr() {
    let str = "";
    for (let i of arr) {
      str += i + " ,";
    }
    str = str.slice(0, str.length - 2);
    str = `[${str}]`;
    return str;
  }

  function goClick() {
    if (ready) {
      setArr(undefined);
    }
    setReady((preval) => {
      return !preval;
    });
  }

  return (
    <>
      <Helmet>
        <title>Binary Tree | AlgoTrace</title>
        <meta
          name="description"
          content="Visit the interactive Animation for Binary Tree"
        />
      </Helmet>
      <div className="flex flex-col select-none  w-full py-16 pt-12 px-8 h-full mb-[200px]">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-16">
          Binary Tree
        </h1>
        <div className="flex   mx-auto">
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex flex-col max-w-[250px]   ">
              <p className="text-lg px-3 m-1 p-1 h-[40px] bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Enter Array
              </p>
              <p className="text-sm p-1 m-1 px-3 bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl">
                Enter Level-Wise representation of the Binary Tree. Use 'N' for
                NULL values. Node values must be from -1000 to 1000
              </p>
            </div>
            <div className="flex relative flex-col">
              <EnterArray status={ready} />
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[300px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 6 7 89 121  Press Enter"
                  type="text"
                  disabled={ready}
                  ref={textRef}
                  onKeyDown={(event) => keyClick(event)}
                />
              </div>
              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {arr === undefined ? (
                  <p>Array not entered</p>
                ) : arr === null ? (
                  <p className="text-red-500">Invalid Array Entered</p>
                ) : (
                  <p className="max-w-[400px]">{printArr()}</p>
                )}
              </div>
            </div>
            <div className="flex m-1 relative bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl justify-center items-center">
              <Go status={ready} />
              <button
                disabled={!(arr != undefined && arr != null)}
                onClick={goClick}
                className=" w-[100px] flex-col h-[70%] m-4 rounded-xl disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d] text-xl border-[3px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white font-bold flex justify-center items-center"
              >
                {ready ? "Reset" : "Go"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full  mt-8  customScroll justify-center items-center">
          {arr != null && arr != undefined && ready ? (
            <BinaryTreeAnimation arr={arr} />
          ) : null}
        </div>
      </div>
    </>
  );
}
