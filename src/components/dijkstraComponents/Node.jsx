import Arrow from "./Arrow";
import { useSelector } from "react-redux";
import CurrWeight from "./CurrWeight";

export default function Node({ val, x, y, i }) {
  const graphType = useSelector((state) => state.graphs.graphType);
  const ind = useSelector((state) => state.graphs.ind);
  const timeline = useSelector((state) => state.graphs.timeline);
  const graph = useSelector((state) => state.graphs.graph);

  return (
    <div
      style={{
        top: `${y}px`,
        left: `calc( 50% - 20px + ${x}px )`,
        border:
          (timeline &&
            ind != null &&
            timeline[ind] &&
            timeline[ind].selected &&
            timeline[ind].selected.includes(val)) ||
          (timeline &&
            ind != null &&
            timeline[ind] &&
            timeline[ind].neighbour === val)
            ? "2px solid black"
            : "0px solid black",
        outline:
          timeline &&
          ind != null &&
          timeline[ind] &&
          timeline[ind].highlight === val
            ? "4px solid black"
            : "0px",
        outlineOffset: "3px",
        backgroundColor:
          timeline &&
          ind != null &&
          timeline[ind] &&
          timeline[ind].selected &&
          timeline[ind].selected.includes(val)
            ? "#4f772d"
            : timeline &&
              ind != null &&
              timeline[ind] &&
              timeline[ind].neighbour === val
            ? "#caf0f8"
            : "#0077b6",
        color:
          timeline &&
          ind != null &&
          timeline[ind] &&
          timeline[ind].selected &&
          timeline[ind].selected.includes(val)
            ? "#fff"
            : timeline &&
              ind != null &&
              timeline[ind] &&
              timeline[ind].neighbour === val
            ? "#0077b6"
            : "#caf0f8",
      }}
      className="w-[40px] h-[40px] flex justify-center node absolute items-center rounded-full "
    >
      {val}
      {graphType % 2 === 1 ? (
        <>
          {i.angle.map((deg, kom) => {
            return (
              <div
                key={kom}
                style={{ transform: `rotate(${deg}deg)` }}
                className="absolute"
              >
                <Arrow></Arrow>
              </div>
            );
          })}
        </>
      ) : null}
      {timeline != null &&
      ind != null &&
      timeline[ind] &&
      timeline[ind].table ? (
        <div
          style={{ transform: `rotate(${graph.free[val - 1]}deg)` }}
          className="absolute"
        >
          <CurrWeight angle={graph.free[val - 1]}>
            {timeline[ind].table[timeline[ind].table.length - 1][1][val - 1]}
          </CurrWeight>
        </div>
      ) : null}
    </div>
  );
}
