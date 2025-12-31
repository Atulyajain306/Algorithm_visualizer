import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { graphsActions } from "../store/main";
import Fig from "../components/bfsdfsComponents/Fig";
import { options } from "../algorithms/options";
import right from "../assets/next.png";
import { bfsTimeline, dfsTimeline } from "../algorithms/graphs";
import next from "../assets/next.png";
import down from "../assets/down-arrow.png";
import { motion } from "framer-motion";
import typeWater from "../assets/watermarks/Graph/type.png";
import graphWater from "../assets/watermarks/Graph/graph2.png";
import bfsdfsWater from "../assets/watermarks/Graph/bfsdfs.png";
import resetWater from "../assets/watermarks/Graph/reset.png";
import { generalActions } from "../store/main";
import { Helmet } from "react-helmet-async";

const types = [
  "undirected",
  "directed",
  "weighted Undirected",
  "weigted Directed",
];

export default function BSFNDFS() {
  const [chosenGraph, setChosenGraph] = useState(undefined);
  const [graphType, setGraphType] = useState(0);
  const dispatch = useDispatch();
  const edgesArr = useSelector((state) => state.graphs.edgesArr);
  const list = useSelector((state) => state.graphs.list);
  const [algoName, setAlgoName] = useState(null);
  const ind = useSelector((state) => state.graphs.ind);
  const timeline = useSelector((state) => state.graphs.timeline);

  const unweightedPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 16, 17, 18, 19];
  const weightedPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 16, 17, 18, 19];

  useEffect(() => {
    if (chosenGraph != undefined) {
      dispatch(generalActions.setActivity(true));
    }
    return () => {
      dispatch(generalActions.setActivity(false));
    };
  }, [chosenGraph]);

  function getPos(val, type) {
    if (type < 2) {
      return unweightedPos.findIndex((i) => i === val);
    }
    return weightedPos.findIndex((i) => i === val);
  }

  function getSize(type) {
    if (type < 2) {
      return unweightedPos.length;
    }
    return weightedPos.length;
  }

  function getInd(val, type) {
    if (type < 2) {
      return unweightedPos[val];
    }
    return weightedPos[val];
  }

  useEffect(() => {
    dispatch(graphsActions.resetAll());
  }, []);

  function keyClick(num) {
    let graphNo;
    if (chosenGraph === undefined) {
      graphNo = 0;
    } else {
      graphNo = getPos(chosenGraph, graphType) + num;
      if (graphNo < 0) {
        graphNo += getSize(graphType);
      }
      graphNo = graphNo % getSize(graphType);
    }
    graphNo = getInd(graphNo, graphType);
    setChosenGraph(graphNo);

    const res = options[graphNo];
    dispatch(
      graphsActions.setEdgesArr([
        JSON.parse(JSON.stringify(res)),
        graphNo,
        graphType,
      ])
    );
  }

  function begin(option) {
    if (option === 1) {
      const res = bfsTimeline(list);
      dispatch(graphsActions.setTimeline(res));
      setAlgoName("BFS");
    } else {
      const res = dfsTimeline(list);
      dispatch(graphsActions.setTimeline(res));
      setAlgoName("DFS");
    }
  }

  function typeClick(num) {
    let newInd = graphType + num;
    if (newInd < 0) {
      newInd += 4;
    }
    newInd = newInd % 4;
    setGraphType(newInd);
    setChosenGraph(undefined);
    dispatch(graphsActions.resetAll());
  }

  function reset() {
    setAlgoName(null);
    dispatch(graphsActions.resetAlgo());
  }

  function restart() {
    dispatch(graphsActions.setInd("restart"));
  }

  function forward() {
    dispatch(graphsActions.setInd(1));
  }

  function backward() {
    dispatch(graphsActions.setInd(-1));
  }

  return (
    <>
      <Helmet>
        <title>BFS & DFS | AlgoTrace</title>
        <meta
          name="description"
          content="Visit the interactive Animation for BFS and DFS"
        />
      </Helmet>
      <div className="flex flex-col  select-none  w-full py-16 pt-12 px-8 h-full mb-[200px]">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-16">
          BFS & DFS
        </h1>
        <div className="flex relative mx-auto">
          {chosenGraph != undefined ? null : (
            <>
              <motion.div
                style={{ display: chosenGraph ? "none" : "" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75 }}
                className="absolute top-[50%] left-[-40px]  translate-x-[-100%] scale-125 translate-y-[-100%]"
              >
                <img src={typeWater} className="opacity-50" alt="" />
              </motion.div>
              <motion.div
                style={{ display: chosenGraph ? "none" : "" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75 }}
                className="absolute bottom-[70px] left-[-40px]  translate-x-[-100%] scale-125 translate-y-[100%]"
              >
                <img src={graphWater} className="opacity-50" alt="" />
              </motion.div>
              <motion.div
                style={{ display: chosenGraph ? "none" : "" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75 }}
                className="absolute top-[50%] right-[-40px]  translate-x-[100%] scale-125 translate-y-[-100%]"
              >
                <img src={bfsdfsWater} className="opacity-50" alt="" />
              </motion.div>
            </>
          )}
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex  flex-col min-w-[350px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Choose Graph
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    typeClick(-1);
                  }}
                  className="m-2 disabled:opacity-40"
                >
                  <img
                    src={right}
                    className="w-[30px] rotate-180 h-[30px]"
                    alt=""
                  />
                </button>
                <span className="capitalize mx-6 px-2 bg-white rounded-md text-black">
                  {types[graphType]}
                </span>
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    typeClick(1);
                  }}
                  className="m-2 disabled:opacity-40"
                >
                  <img src={right} className="w-[30px] h-[30px]" alt="" />
                </button>
              </div>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    keyClick(-1);
                  }}
                  className="m-2 disabled:opacity-40"
                >
                  <img
                    src={right}
                    className="w-[30px] rotate-180 h-[30px]"
                    alt=""
                  />
                </button>
                <span className="capitalize mx-6 px-2 bg-white rounded-md text-black">
                  {chosenGraph === undefined
                    ? "not selected"
                    : `Graph ${chosenGraph + 1} Selected`}
                </span>
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    keyClick(1);
                  }}
                  className="m-2 disabled:opacity-40"
                >
                  <img src={right} className="w-[30px] h-[30px]" alt="" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex  flex-col ">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                BFS / DFS
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  disabled={chosenGraph === undefined || algoName != null}
                  onClick={() => {
                    begin(1);
                  }}
                  className="m-2  px-4 py-1  font-bold rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d]  border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white"
                >
                  BFS
                </button>
                <button
                  disabled={chosenGraph === undefined || algoName != null}
                  onClick={() => {
                    begin(2);
                  }}
                  className="m-2  px-4 py-1  font-bold rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d]  border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white"
                >
                  DFS
                </button>
              </div>
              <div className="bg-[#f3e9dc] border-2 flex-grow border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                {algoName === null ? (
                  <p className="mx-auto">No Algo Selected</p>
                ) : (
                  <p className="mx-auto">{`${algoName} is running`}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex relative flex-col mx-auto flex-grow w-[200px]  mt-2">
          {chosenGraph != undefined ? null : (
            <motion.div
              style={{ display: chosenGraph ? "none" : "" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75 }}
              className="absolute bottom-[-40px] right-[50%]  translate-x-[50%] scale-[200%] translate-y-[100%]"
            >
              <img src={resetWater} className="opacity-50" alt="" />
            </motion.div>
          )}
          <button
            disabled={algoName === null}
            onClick={reset}
            className="rounded-xl text-xl font-bold bg-[#fec89a] text-[#f8edeb] border-2 border-[#fec89a] hover:bg-[#f8edeb] hover:text-[#fec89a] duration-700 disabled:opacity-50 disabled:pointer-events-none py-[5px] uppercase m-1"
          >
            reset
          </button>
        </div>
        {timeline != null ? (
          <div className="flex mx-auto mt-4 space-x-8">
            {ind === timeline.length - 1 ? (
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
                  disabled={ind === null}
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
                  className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img src={next} className="w-[50px] select-none" alt="" />
                </button>
              </>
            )}
          </div>
        ) : null}

        {timeline != null ? (
          <div className="relative">
            {ind != null &&
            (algoName === "BFS" || algoName === "DFS") &&
            timeline[ind] &&
            timeline[ind].bfs ? (
              <div className="flex  border-2 border-[#0077b6] divide-x-2 h-fit w-fit mx-auto mt-16 divide-[#0077b6]">
                {timeline[ind].bfs.map((i, kom) => {
                  return (
                    <div
                      key={kom}
                      className="h-[40px] relative w-[40px] flex justify-center bg-[#caf0f8] items-center text-[#0077b6] font-semibold"
                    >
                      {i}
                      {ind != null &&
                      timeline &&
                      algoName === "BFS" &&
                      timeline[ind].highlight &&
                      timeline[ind].highlight[0] === i ? (
                        <div className="absolute top-[-10px] translate-y-[-100%] right-[50%] translate-x-[50%]">
                          <img
                            src={down}
                            className="w-[20px] h-[20px]"
                            alt=""
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="min-h-[104px] w-[20px]"></div>
            )}

            {ind != null &&
            timeline &&
            algoName === "DFS" &&
            ind != timeline.length - 1 &&
            timeline[ind].callstack ? (
              <div className="absolute right-0 top-16">
                <div className=" border-2 w-[80px] border-black divide-y-2 divide-black">
                  {timeline[ind].callstack.toReversed().map((i, index) => {
                    return (
                      <div
                        key={index}
                        className="font-medium relative w-full flex justify-center items-center h-[30px]"
                      >
                        {i}
                        {index === 0 ? (
                          <div className="absolute left-[-5px] translate-x-[-100%] top-[50%] translate-y-[-50%]">
                            <img
                              src={down}
                              className="rotate-[-90deg] w-[20px] h-[20px]"
                              alt=""
                            />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <span className="uppercase text-lg font-semibold absolute top-[-40px] right-[50%] translate-x-[50%]">
                  Callstack
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        <div
          style={{ minHeight: `${list ? list.length * 80 : 0}px` }}
          className="w-full h-full mt-16 flex mb-8 "
        >
          {edgesArr != null && edgesArr.length != 0 ? <Fig></Fig> : null}
        </div>
      </div>
    </>
  );
}
