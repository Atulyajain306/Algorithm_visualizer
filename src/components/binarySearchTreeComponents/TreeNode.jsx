import next from "../../assets/down-arrow.png";
export default function TreeNode({
  nextNode,
  right,
  left,
  highlight,
  children,
  success,
  failed,
}) {
  // // console.log(nextNode);
  return (
    <>
      <div
        style={{
          opacity: children === "N" ? "0%" : "100%",
          outline: nextNode
            ? "4px solid black"
            : highlight
            ? "4px solid black"
            : "0px solid black",
          outlineOffset: nextNode || highlight ? "3px" : "0px",
          backgroundColor:
            success === true
              ? "#4f772d"
              : failed === true
              ? "#0077b6"
              : highlight
              ? "#caf0f8"
              : "#0077b6",
          color:
            success === true || failed === true
              ? "#fff"
              : highlight
              ? "#0077b6"
              : "#caf0f8",
          border:
            success === true
              ? "0px solid #000"
              : failed === true
              ? "3px solid #c9184a"
              : "3px solid #0077b6",
        }}
        className="flex relative justify-center items-center  rounded-full text-sm font-semibold w-[35px] h-[35px]"
      >
        {children}
        {right ? (
          <div className="absolute -bottom-[30px] right-[-20px] -rotate-[30deg]">
            <img src={next} className="w-[20px] h-[20px]" alt="" />
          </div>
        ) : null}
        {left ? (
          <div className="absolute -bottom-[30px] left-[-20px] rotate-[30deg]">
            <img src={next} className="w-[20px] h-[20px]" alt="" />
          </div>
        ) : null}
      </div>
    </>
  );
}
