import down from "../../assets/down-arrow.png";

export default function Node({
  color,
  highlight,
  success,
  textCol,
  children,
  index,
  low,
  high,
}) {
  //   // console.log(low, high, index);
  const val = index >= low && index <= high;
  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: success ? "#4f772d" : color,
            border: highlight ? "3px solid black" : "0px solid black",
            color: success ? "white" : textCol,
            width: "50px",
            position: "relative",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            fontSize: "1rem",
          }}
          className={!val ? `index${index} opacity-30` : `index${index}`}
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
          <div className="absolute bottom-[-30px] text-black right-[50%] translate-x-[50%] font-bold">
            {index}
          </div>
        </div>
      </div>
    </>
  );
}
