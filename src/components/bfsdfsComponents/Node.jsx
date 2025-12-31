import Arrow from "./Arrow";
import { useSelector } from "react-redux";

export default function Node({ val, x, y, i }) {
  const graphType = useSelector((state) => state.graphs.graphType);
  const ind = useSelector((state) => state.graphs.ind);
  const timeline = useSelector((state) => state.graphs.timeline);

  return (
    <div
      style={{
        top: `${y}px`,
        left: `calc( 50% - 20px + ${x}px )`,
        border:
          ind != null &&
          timeline[ind] &&
          timeline[ind].visited &&
          timeline[ind].visited.includes(val)
            ? "2px solid black"
            : "0px solid black",
        outline:
          ind != null &&
          timeline[ind] &&
          timeline[ind].highlight &&
          timeline[ind].highlight[0] === val
            ? "4px solid black"
            : ind != null &&
              timeline[ind] &&
              timeline[ind].explore &&
              timeline[ind].explore[0] === val
            ? "4px dashed black"
            : "0px",
        outlineOffset:
          (ind != null &&
            timeline[ind] &&
            timeline[ind].highlight &&
            timeline[ind].highlight[0] === val) ||
          (ind != null &&
            timeline[ind] &&
            timeline[ind].explore &&
            timeline[ind].explore[0] === val)
            ? "3px"
            : "0px",
        backgroundColor:
          ind != null &&
          timeline[ind] &&
          timeline[ind].fullVisit &&
          timeline[ind].fullVisit.includes(val)
            ? "#4f772d"
            : ind != null &&
              timeline[ind] &&
              timeline[ind].visited &&
              timeline[ind].visited.includes(val)
            ? "#caf0f8"
            : "#0077b6",
        color:
          ind != null &&
          timeline[ind] &&
          timeline[ind].fullVisit &&
          timeline[ind].fullVisit.includes(val)
            ? "#fff"
            : ind != null &&
              timeline[ind] &&
              timeline[ind].visited &&
              timeline[ind].visited.includes(val)
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
                style={{
                  transform: `rotate(${
                    deg.length === undefined ? deg : deg[2]
                  }deg)`,
                }}
                key={kom}
                className="absolute"
              >
                <Arrow></Arrow>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
