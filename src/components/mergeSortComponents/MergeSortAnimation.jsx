import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate, stagger } from "framer-motion";
import SortedArray from "./SortedArray";
import Stack from "./Stack";

export default function MergeSortAnimation({ arr, order }) {
  const [history, setHistory] = useState([
    {
      array: [...arr],
      successInd: [],
      range: [{ low: 0, high: arr.length - 1, merge: false }],
      space: [],
      mergeInd: [],
      sortArr: null,
      sortInd: null,
      instructions: [`mergeSort(0,${arr.length - 1})`],
    },
  ]);
  const [array, setArray] = useState(arr);
  const [successInd, setSuccessInd] = useState([]);
  const [scope, animate] = useAnimate();
  const [hang, setHang] = useState(false);
  const [range, setRange] = useState([
    { low: 0, high: arr.length - 1, merge: false },
  ]);
  const [space, setSpace] = useState([]);
  const [mergeInd, setMergeInd] = useState([]);
  const [sortArr, setSortArr] = useState(null);
  const [sortInd, setSortInd] = useState(null);
  const [instructions, setInstructions] = useState([
    `mergeSort(0,${arr.length - 1})`,
  ]);

  //   // console.log(history);
  // console.log(instructions);

  function forward() {
    const endInd = range.length - 1;
    if (!range[endInd].merge && range[endInd].low < range[endInd].high) {
      let low = range[endInd].low;
      let high = range[endInd].high;
      let mid = Math.floor((range[endInd].low + range[endInd].high) / 2);
      const newSpace = [...space];
      newSpace.push(mid);
      newSpace.sort((a, b) => {
        if (a <= b) {
          return -1;
        } else {
          return 1;
        }
      });
      setSpace([...newSpace]);
      const newRange = [...range];
      newRange[endInd].merge = true;
      newRange.push({
        low: mid + 1,
        high: newRange[endInd].high,
        merge: false,
      });
      newRange.push({ low: newRange[endInd].low, high: mid, merge: false });
      setRange(JSON.parse(JSON.stringify(newRange)));
      const newInstruction = [
        ...instructions,
        `-merge(${low},${mid},${high})`,
        `-mergeSort(${mid + 1},${high})`,
        `mergeSort(${low},${mid})`,
      ];
      setInstructions((p) => {
        return [...newInstruction];
      });
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            range: JSON.parse(JSON.stringify(newRange)),
            space: [...newSpace],
            instructions: [...newInstruction],
          },
        ];
      });
    } else if (range[endInd].low < range[endInd].high) {
      if (mergeInd.length === 0) {
        const low = range[endInd].low;
        const high = range[endInd].high;
        let mid = Math.floor((low + high) / 2);
        setMergeInd([low, mid + 1]);
        const arr = [];
        for (let i = low; i <= high; ++i) {
          arr.push(null);
        }
        setSortArr((p) => {
          return arr;
        });
        setSortInd(0);
        const newInstruction = [...instructions];
        newInstruction[newInstruction.length - 1] =
          newInstruction[newInstruction.length - 1].split("-")[1];
        setInstructions((p) => {
          return [...newInstruction];
        });
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              mergeInd: [low, mid + 1],
              sortArr: arr,
              sortInd: 0,
              instructions: [...newInstruction],
            },
          ];
        });
      } else {
        const low = range[endInd].low;
        const high = range[endInd].high;
        let mid = Math.floor((low + high) / 2);

        if (mergeInd[0] === null && mergeInd[1] === null) {
          const newArr = [...array];
          for (let i = low; i <= high; ++i) {
            newArr[i] = sortArr[i - low];
          }
          const newSpace = [...space];
          let temp = newSpace.findIndex((x) => x === mid);
          newSpace.splice(temp, 1);
          setArray([...newArr]);
          setSpace([...newSpace]);
          const newRange = [...range];
          newRange.pop();
          setRange((p) => {
            return JSON.parse(JSON.stringify(newRange));
          });
          setMergeInd([]);
          setSortArr(null);
          setSortInd(null);
          const newP = [...instructions];
          newP.pop();
          newP.pop();
          if (
            newP.length != 0 &&
            newP[newP.length - 1].startsWith("-mergeSort")
          ) {
            newP[newP.length - 1] = newP[newP.length - 1].split("-")[1];
          }
          setInstructions((p) => {
            return [...newP];
          });
          setHistory((p) => {
            return [
              ...p,
              {
                ...p[p.length - 1],
                array: [...newArr],
                space: [...newSpace],
                range: JSON.parse(JSON.stringify(newRange)),
                mergeInd: [],
                sortArr: null,
                sortInd: null,
                instructions: [...newP],
              },
            ];
          });
          return;
        }

        let first = null;
        if (mergeInd[0] != null) {
          first = array[mergeInd[0]];
        } else {
          first = order === "asc" ? Number.MAX_VALUE : Number.MIN_VALUE;
        }
        let second = null;
        if (mergeInd[1] != null) {
          second = array[mergeInd[1]];
        } else {
          second = order === "asc" ? Number.MAX_VALUE : Number.MIN_VALUE;
        }

        if (
          (order === "asc" && first <= second) ||
          (order === "desc" && first > second)
        ) {
          const newSortedArr = [...sortArr];
          newSortedArr[sortInd] = first;
          setSortArr([...newSortedArr]);
          setHang(true);
          setTimeout(() => {
            animate(
              `.index${sortInd}`,
              { scale: [5, 2, 0.5, 1] },
              { type: "spring", duration: 0.5, delay: stagger(0.05) }
            );
            setTimeout(() => {
              const newSortInd = sortInd + 1;
              setSortInd((p) => p + 1);
              let newMergeInd = [];
              if (mergeInd[0] === mid || mergeInd[0] === null) {
                newMergeInd.push(null);
              } else {
                newMergeInd.push(mergeInd[0] + 1);
              }
              newMergeInd.push(mergeInd[1]);
              setMergeInd((p) => {
                return [...newMergeInd];
              });
              setHistory((p) => {
                return [
                  ...p,
                  {
                    ...p[p.length - 1],
                    sortArr: [...newSortedArr],
                    sortInd: newSortInd,
                    mergeInd: [...newMergeInd],
                  },
                ];
              });
              setHang(false);
            }, 500);
          }, 0);
        } else {
          const newSortedArr = [...sortArr];
          newSortedArr[sortInd] = second;
          setSortArr([...newSortedArr]);
          setHang(true);
          setTimeout(() => {
            animate(
              `.index${sortInd}`,
              { scale: [5, 2, 0.5, 1] },
              { type: "spring", duration: 0.5, delay: stagger(0.05) }
            );

            setTimeout(() => {
              const newSortInd = sortInd + 1;
              setSortInd((p) => p + 1);
              let newMergeInd = [];
              newMergeInd.push(mergeInd[0]);
              if (mergeInd[1] === high || mergeInd[1] === null) {
                newMergeInd.push(null);
              } else {
                newMergeInd.push(mergeInd[1] + 1);
              }
              setMergeInd((p) => {
                return [...newMergeInd];
              });
              // console.log(newMergeInd);

              setHistory((p) => {
                return [
                  ...p,
                  {
                    ...p[p.length - 1],
                    sortArr: [...newSortedArr],
                    sortInd: newSortInd,
                    mergeInd: [...newMergeInd],
                  },
                ];
              });
              setHang(false);
            }, 500);
          }, 0);
        }
      }
    } else {
      const newSuccess = [...successInd, range[endInd].low];
      setSuccessInd((p) => {
        return [...newSuccess];
      });
      const newRange = [...range];
      newRange.pop();
      setRange((p) => {
        return JSON.parse(JSON.stringify(newRange));
      });
      const newlast = instructions[instructions.length - 2];
      const newP = [...instructions];
      newP.pop();
      if (newlast.startsWith("-mergeSort")) {
        newP[newP.length - 1] = newP[newP.length - 1].split("-")[1];
      }
      setInstructions((p) => {
        return [...newP];
      });
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            range: JSON.parse(JSON.stringify(newRange)),
            successInd: newSuccess,
            instructions: [...newP],
          },
        ];
      });
    }
  }

  //   // console.log( array, history, successInd);

  function backward() {
    const lastHistory = history[history.length - 2];
    setArray([...lastHistory.array]);
    setSuccessInd([...lastHistory.successInd]);
    setRange(JSON.parse(JSON.stringify(lastHistory.range)));
    setSpace([...lastHistory.space]);
    setMergeInd([...lastHistory.mergeInd]);
    setSortInd(lastHistory.sortInd);
    if (lastHistory.sortArr === null) {
      setSortArr(null);
    } else {
      setSortArr([...lastHistory.sortArr]);
    }
    setInstructions([...lastHistory.instructions]);
    setHistory((p) => {
      const newHistory = JSON.parse(JSON.stringify(p));
      newHistory.pop();
      return [...newHistory];
    });
  }

  function restart() {
    setArray([...arr]);
    setHistory([
      {
        array: [...arr],
        successInd: [],
        range: [{ low: 0, high: arr.length - 1, merge: false }],
        space: [],
        mergeInd: [],
        sortArr: null,
        sortInd: null,
        instructions: [`mergeSort(0,${arr.length - 1})`],
      },
    ]);
    setSuccessInd([]);
    setHang(false);
    setRange([{ low: 0, high: arr.length - 1, merge: false }]);
    setSpace([]);
    setMergeInd([]);
    setSortArr(null);
    setSortInd(null);
    setInstructions([`mergeSort(0,${arr.length - 1})`]);
  }

  return (
    <div className="flex w-full flex-col">
      <div ref={scope} className="flex w-full flex-col">
        <div className="min-h-[100px] relative flex w-full mx-auto">
          {sortArr != null ? (
            <SortedArray array={sortArr} ind={sortInd} />
          ) : null}
          <div className="absolute   right-0">
            {instructions.length != 0 &&
            !(successInd.length === 1 && arr.length === 1) ? (
              <Stack arr={[...instructions]} />
            ) : null}
          </div>
        </div>
        <div className="flex justify-center">
          {}
          {array.map((i, index) => {
            return (
              <div
                style={{
                  borderTop:
                    range.length != 0 &&
                    index <= range[range.length - 1].high &&
                    index >= range[range.length - 1].low
                      ? "2px solid black"
                      : "0px",
                  borderBottom:
                    range.length != 0 &&
                    index <= range[range.length - 1].high &&
                    index >= range[range.length - 1].low
                      ? "2px solid black"
                      : "0px",
                  borderRight:
                    range.length != 0 &&
                    (index === range[range.length - 1].high ||
                      (range[range.length - 1].merge &&
                        index ===
                          Math.floor(
                            (range[range.length - 1].low +
                              range[range.length - 1].high) /
                              2
                          )))
                      ? "2px solid black"
                      : "0px",
                  borderLeft:
                    range.length != 0 &&
                    (index === range[range.length - 1].low ||
                      (range[range.length - 1].merge &&
                        index ===
                          Math.floor(
                            (range[range.length - 1].low +
                              range[range.length - 1].high) /
                              2
                          ) +
                            1))
                      ? "2px solid black"
                      : "0px",
                  marginRight: space.includes(index) ? `40px` : "0px",
                }}
                key={index}
                className="px-2  py-2"
              >
                <Node
                  highlight={mergeInd.includes(index)}
                  // index={index}
                  // ind={ind}
                  color={"#0077b6"}
                  textCol={"#caf0f8"}
                  extraSpace={space.includes(index)}
                  success={successInd.includes(index)}
                >
                  {i}
                </Node>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {successInd.length != 0 && space.length === 0 ? (
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
              disabled={space.length === 0 || hang}
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
