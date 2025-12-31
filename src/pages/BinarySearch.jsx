import { useState, useRef, useEffect } from "react";
import BinarySearchAnimation from "../components/binarySearchComponents/BinarySearchAnimation";
import EnterArray from "../components/UIComponents/EnterArray";
import Order from "../components/UIComponents/SearchNode";
import Go from "../components/UIComponents/Go2";
import { useDispatch } from "react-redux";
import { generalActions } from "../store/main";
import { Helmet } from "react-helmet-async";

export default function BinarySearch() {
  const textRef = useRef();
  const searchRef = useRef();
  const [arr, setArr] = useState(undefined);
  const [ready, setReady] = useState(false);
  const [num, setNum] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (arr || num) {
      dispatch(generalActions.setActivity(true));
    }
    return () => {
      dispatch(generalActions.setActivity(false));
    };
  }, [arr, num]);

  function keyClick(event) {
    if (event.key === "Enter") {
      const res = getArray(event.target.value);
      // console.log(res);
      if (res != null) {
        res.sort((a, b) => {
          if (a > b) {
            return 1;
          } else {
            return -1;
          }
        });
        setArr([...res]);
      } else {
        setArr(null);
      }
      event.target.value = "";
    }
  }

  function key2Click(event) {
    if (event.key === "Enter") {
      const res = getNum(event.target.value);
      // console.log(res);
      setNum(res);
      event.target.value = "";
    }
  }

  function getNum(str) {
    str = str.trim();
    const res = parseInt(str);
    if ((res != 0 && !res) || res < 0 || res > 1000) {
      return null;
    }
    return res;
  }

  function getArray(str) {
    const arr = [];
    while (str != "") {
      str = str.trim();
      let num = "";
      let count = 0;
      for (let i of str) {
        ++count;
        if (i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) {
          num += i;
        } else if (i === " ") {
          break;
        } else {
          return null;
        }
      }
      str = str.slice(count);
      let integer = parseInt(num);
      if (integer < 0 || integer > 1000) {
        return null;
      }
      arr.push(integer);
    }
    if (arr.length > 10 || arr.length === 0) {
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
      setNum(undefined);
    }
    setReady((preval) => {
      return !preval;
    });
  }

  return (
    <>
      <Helmet>
        <title>Binary Search | AlgoTrace</title>
        <meta
          name="description"
          content="Visit the interactive Animation for Binary Search"
        />
      </Helmet>
      <div className="flex flex-col  select-none  w-full py-16 pt-12 px-8 h-full mb-[200px]">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-16">
          Binary Search
        </h1>
        <div className="flex   mx-auto">
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex flex-col max-w-[250px]   ">
              <p className="text-lg px-3 m-1 p-1 h-[40px] bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Enter Array
              </p>
              <p className="text-sm p-1 m-1 px-3 bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl">
                Enter upto 10 numbers from 0 to 1000 separated by space. Array
                will be automatically sorted in ascending order.
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
              <div className="px-2 p-1 m-1 flex-col bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {arr === undefined ? (
                  <p>Array not entered</p>
                ) : arr === null ? (
                  <p className="text-red-500">Invalid Array Entered</p>
                ) : (
                  <p>{printArr()}</p>
                )}
                {num === undefined ? (
                  <p>Search Node not entered</p>
                ) : num === null ? (
                  <p className="text-red-500">Invalid Node Entered</p>
                ) : (
                  <p>Search Node: {num}</p>
                )}
              </div>
            </div>
            <div className="flex relative flex-col">
              <Order status={ready} />
              <p className="text-lg px-2 m-1 bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl p-1 h-[40px] font-bold min-w-[200px]  flex justify-center items-center">
                Enter Search Node
              </p>
              <div className="px-2 p-1 m-1 text-sm bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl flex flex-grow justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[100px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="6 Press Enter"
                  disabled={ready}
                  ref={searchRef}
                  onKeyDown={(event) => key2Click(event)}
                  type="text"
                />
              </div>
            </div>
            <div className="flex m-1 relative bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl justify-center items-center">
              <Go status={ready} />
              <button
                disabled={
                  !(arr != undefined && arr != null) ||
                  !(num != undefined && num != null)
                }
                onClick={goClick}
                className=" w-[100px] flex-col h-[70%] m-4 rounded-xl disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d] text-xl border-[3px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white font-bold flex justify-center items-center"
              >
                {ready ? "Reset" : "Go"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-full mt-8 flex justify-center items-center">
          {arr != null && arr != undefined && ready ? (
            <BinarySearchAnimation arr={arr} node={num} />
          ) : null}
        </div>
      </div>
    </>
  );
}
