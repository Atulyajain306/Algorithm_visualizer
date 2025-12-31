import down from "../../assets/down-arrow.png";

export default function Stack({ arr }) {
  return (
    <>
      <div className="flex relative flex-col border-x-2 border-b-2  border-x-black border-b-black  divide-y-2 divide-black gap-y-0">
        <span className="absolute top-[-30px] text-nowrap  text-lg font-semibold right-[50%] translate-x-[50%]">
          CALL STACK
        </span>
        {arr.toReversed().map((i, index) => {
          if (i[0] === "-") {
            return (
              <div className="relative " key={index}>
                <span className="text-sm opacity-30 px-1">
                  {i.split("-")[1]}
                </span>
              </div>
            );
          } else {
            return (
              <div className="relative" key={index}>
                <span className="text-sm px-1">{i}</span>
                {index === 0 ? (
                  <div className="absolute left-[-20px] top-[50%] translate-y-[-50%]">
                    <img src={down} className="w-[10px] -rotate-90" alt="" />
                  </div>
                ) : null}
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
