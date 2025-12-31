import { useSelector } from "react-redux";

export default function Table() {
  const list = useSelector((state) => state.graphs.list);
  const timeline = useSelector((state) => state.graphs.timeline);
  const ind = useSelector((state) => state.graphs.ind);

  return (
    <div className="flex flex-col ml-20">
      <div className="flex border-b-2 border-black divide-x-2 divide-black">
        <div className="w-[100px] h-[40px] font-semibold leading-tight text-center  flex justify-center items-center ">
          Selected Node
        </div>
        <div className="flex relative">
          {list.map((i, kom) => {
            return (
              <div
                key={kom}
                className="h-[40px] w-[40px] flex justify-center items-center"
              >
                {i[0]}
              </div>
            );
          })}
          <div className="absolute capitalize top-[-30px] text-nowrap font-semibold right-[50%] translate-x-[50%]">
            Min Distance to other nodes
          </div>
        </div>
      </div>
      {timeline[ind].table.map((i, kom) => {
        return (
          <div
            key={kom}
            className="flex border-b-2 border-black divide-x-2 divide-black"
          >
            <div className="w-[100px] h-[40px] leading-tight text-center  flex justify-center items-center ">
              {i[0]}
            </div>
            <div className="flex">
              {i[1].map((j, ind2) => {
                return (
                  <div
                    key={ind2}
                    className="h-[40px] w-[40px] flex  justify-center items-center"
                  >
                    <span
                      style={{
                        backgroundColor: i[2].includes(ind2 + 1) ? "green" : "",
                        color: i[2].includes(ind2 + 1) ? "white" : "black",
                      }}
                      className="w-[30px] h-[30px] rounded-full flex justify-center items-center"
                    >
                      {j >= 4000 ? "∞" : j}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
