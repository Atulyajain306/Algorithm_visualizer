import down from "../../assets/down-arrow.png";

export default function Array({ array }) {
  return (
    <>
      {array.length != 0 ? (
        <div className="flex w-fit divide-x-2 mb-8 mx-auto border-2 border-[#0077b6] divide-[#0077b6]">
          {array.map((i, index) => {
            return (
              <div
                key={Math.random()}
                className="w-[40px] h-[40px] text-bold bg-[#caf0f8] text-[#0077b6] flex relative justify-center items-center"
              >
                <span className={`index${index}`}>{i.val}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex w-fit divide-x-2 mb-8 mx-auto h-[40px]"></div>
      )}
    </>
  );
}
