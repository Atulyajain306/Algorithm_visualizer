import down from "../../assets/down-arrow.png";

export default function Node({
  color,
  highlight,
  success,
  textCol,
  children,
  index,
  ind,
  extraSpace,
}) {
  return (
    <>
      <div
        className={index === ind ? "first" : index === ind + 1 ? "second" : ""}
      >
        <div
          style={{
            backgroundColor: success ? "#4f772d" : color,
            border: highlight ? "3px solid black" : "0px solid black",
            color: success ? "white" : textCol,
            // marginRight: extraSpace ? "40px" : "0px",
          }}
          className="w-[50px] relative h-[50px] flex justify-center items-center rounded-full text-base"
        >
          {children}
          {highlight ? (
            <div>
              <img
                src={down}
                className="w-[20px] absolute top-[-40px] right-[50%] translate-x-[50%]"
                alt=""
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
