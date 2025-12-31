import down from "../../assets/down-arrow.png";

export default function SortedArray({ array, ind }) {
  return (
    <div className="flex divide-x-2 mb-16 mx-auto border-2 border-[#0077b6] divide-[#0077b6]">
      {array.map((i, index) => {
        return (
          <div
            key={index}
            className="w-[40px] h-[40px] text-bold bg-[#caf0f8] text-[#0077b6] flex relative justify-center items-center"
          >
            <span className={`index${index}`}>{i != null ? i : " "}</span>
            {/* <div className="absolute top-[-25px] text-black text-sm font-bold right-[50%] translate-x-[50%] ">
              {index}
            </div> */}
            {ind != null && ind === index ? (
              <div>
                <img
                  src={down}
                  className="w-[15px] absolute rotate-180 bottom-[-20px] right-[50%] translate-x-[50%]"
                  alt=""
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
