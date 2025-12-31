import Arrow from "./Arrow";
import { useSelector } from "react-redux";

export default function Node({ val, x, y, i }) {
  const graphType = useSelector((state) => state.graphs.graphType);

  return (
    <div
      style={{ top: `${y}px`, left: `calc( 50% - 20px + ${x}px )` }}
      className="w-[40px] h-[40px] flex justify-center node absolute items-center rounded-full bg-[#0077b6] text-[#caf0f8]"
    >
      {val}
      {graphType % 2 === 1 ? (
        <>
          {i.angle.map((deg, kom) => {
            return (
              <div
                key={kom}
                style={{
                  transform: `rotate(${
                    deg.length === undefined ? deg : deg[2]
                  }deg)`,
                }}
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
