import triangle from "../../assets/triangle.png";

export default function Arrow() {
  return (
    <div className="relative">
      <div className="w-[40px] h-[40px] rounded-full bg-transparent"></div>
      <div className="absolute top-[3px] translate-y-[-100%] right-[50%] translate-x-[50%]">
        <img src={triangle} className="w-[11px] h-[11px] rotate-180" alt="" />
      </div>
    </div>
  );
}
