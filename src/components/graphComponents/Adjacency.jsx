import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import arrow from "../../assets/down-arrow.png";
import { graphsActions } from "../../store/main";
import tick from "../../assets/hand-tick.png";
import cross from "../../assets/hand-cross.png";

export default function Adjacency() {
  const dispatch = useDispatch();
  const edgesArr = useSelector((state) => state.graphs.edgesArr);
  const list = useSelector((state) => state.graphs.list);
  const matrix = useSelector((state) => state.graphs.matrix);
  const graph = useSelector((state) => state.graphs.graph);
  const graphType = useSelector((state) => state.graphs.graphType);

  return (
    <div className="flex justify-center space-x-[50px]">
      <div className="flex flex-col min-w-[300px] items-center">
        <h1 className="text-center bg-[#0077b6] w-full text-white rounded-lg py-1">
          Adjacency List
        </h1>
        <div className="flex flex-col gap-y-1 mt-8 px-4">
          {list.map((i, ind1) => {
            return (
              <div key={ind1} className="flex space-x-2 ">
                <div className="w-[40px] h-[40px] flex justify-center items-center border-2 border-black bg-[#fefae0]">
                  {i[0]}
                </div>
                <div className="w-[40px] h-[40px] flex justify-center items-center">
                  <img
                    src={arrow}
                    className="w-[20px] h-[20px] -rotate-90"
                    alt=""
                  />
                </div>
                {i[1].length != 0 ? (
                  <div className="flex border-l-2  border-black">
                    {i[1].map((j, ind2) => {
                      return (
                        <div
                          key={ind2}
                          className="w-[40px] h-[40px] flex justify-center items-center border-r-2 border-y-2 border-black bg-[#fefae0]"
                        >
                          {j}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-[40px] flex items-center uppercase font-medium ">
                    null
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-center bg-[#0077b6] text-white rounded-lg py-1">
          Edges
        </h1>
        <div className="flex flex-wrap w-[300px] justify-between mt-8 px-4">
          {edgesArr.map((i, ind) => {
            return (
              <div
                key={ind}
                className="flex px-3 py-1 mb-2 rounded-md bg-[#fefae0]"
              >
                <div className="flex ">
                  <span className="w-[30px] flex items-center">{i[0]}</span>
                  <div className="flex flex-col w-[40px]">
                    <div
                      style={{ height: graphType > 1 ? "20px" : "auto" }}
                      className="border-b text-xs text-center flex-grow border-black"
                    >
                      {graphType > 1 ? i[2] : null}
                    </div>
                    <div
                      style={{ height: graphType > 1 ? "20px" : "auto" }}
                      className="border-t flex-grow border-black"
                    ></div>
                  </div>
                  <span className="w-[30px] flex items-center flex-row-reverse ">
                    {i[1]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col min-w-[300px] items-center">
        <h1 className="text-center bg-[#0077b6] w-full text-white rounded-lg py-1">
          Adjacency Matrix
        </h1>
        <div className="flex flex-col mt-4 px-4">
          {matrix.map((i, ind1) => {
            return (
              <div key={ind1} className="flex">
                {i.map((j, ind2) => {
                  return (
                    <div
                      key={ind2}
                      style={{
                        borderTop:
                          ind1 === 0 || ind2 === 0 ? "" : "2px solid black",
                        borderBottom:
                          ind2 === 0 || ind1 != matrix.length - 1
                            ? ""
                            : "2px solid black",
                        borderRight:
                          ind1 === 0 || ind2 != matrix.length - 1
                            ? ""
                            : "2px solid black",
                        borderLeft:
                          ind1 === 0 || ind2 === 0 ? "" : "2px solid black",
                        backgroundColor: ind1 > 0 && ind2 > 0 ? "#fefae0" : "",
                        fontWeight: ind1 > 0 && ind2 > 0 ? "normal" : "bold",
                      }}
                      className="w-[40px] h-[40px]  flex justify-center items-center"
                    >
                      {ind1 === 0 && ind2 === 0 ? null : ind1 === 0 ||
                        ind2 === 0 ? (
                        j
                      ) : j === null ? (
                        <>
                          {/* <img
                            src={cross}
                            className="w-[25px] h-[25px]"
                            alt=""
                          /> */}
                          {0}
                        </>
                      ) : (
                        <>
                          {/* <img
                            src={tick}
                            className="w-[25px] h-[25px]"
                            alt=""
                          /> */}
                          {j}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
