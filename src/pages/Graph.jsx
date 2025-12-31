import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { graphsActions } from "../store/main";
import Adjacency from "../components/graphComponents/Adjacency";
import Fig from "../components/graphComponents/Fig";
import { options } from "../algorithms/options";
import right from "../assets/next.png";
import { motion } from "framer-motion";
import typeWater from "../assets/watermarks/Graph/type.png";
import graphWater from "../assets/watermarks/Graph/graph.png";
import { generalActions } from "../store/main";
import { Helmet } from "react-helmet-async";

const types = [
  "undirected",
  "directed",
  "weighted Undirected",
  "weigted Directed",
];

const unweightedPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 16, 17, 18, 19];
const weightedPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 16, 17, 18, 19];

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

export default function Graph() {
  const [chosenGraph, setChosenGraph] = useState(undefined);
  const [graphType, setGraphType] = useState(0);
  const dispatch = useDispatch();
  const edgesArr = useSelector((state) => state.graphs.edgesArr);
  const list = useSelector((state) => state.graphs.list);

  useEffect(() => {
    dispatch(graphsActions.resetAll());
  }, []);

  useEffect(() => {
    if (chosenGraph != undefined) {
      dispatch(generalActions.setActivity(true));
    }
    return () => {
      dispatch(generalActions.setActivity(false));
    };
  }, [chosenGraph]);

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

  return (
    <>
      <Helmet>
        <title>Graph | AlgoTrace</title>
        <meta
          name="description"
          content="Visit the interactive Animation for Graph"
        />
      </Helmet>
      <div className="flex flex-col select-none  w-full py-16 pt-12 px-8 h-full mb-[200px]">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-16">
          Graph
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
                className="absolute bottom-[70px] right-[-40px]  translate-x-[100%] scale-125 translate-y-[100%]"
              >
                <img src={graphWater} className="opacity-50" alt="" />
              </motion.div>
            </>
          )}
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex min-w-[350px] flex-col">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Choose Graph
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  onClick={() => {
                    typeClick(-1);
                  }}
                  className="m-2"
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
                  onClick={() => {
                    typeClick(1);
                  }}
                  className="m-2"
                >
                  <img src={right} className="w-[30px] h-[30px]" alt="" />
                </button>
              </div>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  onClick={() => {
                    keyClick(-1);
                  }}
                  className="m-2"
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
                  onClick={() => {
                    keyClick(1);
                  }}
                  className="m-2"
                >
                  <img src={right} className="w-[30px] h-[30px]" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-16 flex justify-center ">
          {edgesArr != null && edgesArr.length != 0 ? (
            <Adjacency></Adjacency>
          ) : null}
        </div>
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
