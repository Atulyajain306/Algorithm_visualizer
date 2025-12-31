export default function CurrWeight({ angle, children }) {
  return (
    <div className="relative">
      <div className="w-[40px] h-[40px] rounded-full bg-transparent"></div>
      <div className="absolute top-[-5px]  translate-y-[-100%] text-black right-[50%] translate-x-[50%]">
        {children === null ? (
          ""
        ) : children === 4000 ? (
          <div
            style={{ transform: `rotate(${-angle}deg)` }}
            className="text-xl"
          >
            ∞
          </div>
        ) : (
          <div
            style={{ transform: `rotate(${-angle}deg)` }}
            className="text-base "
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
