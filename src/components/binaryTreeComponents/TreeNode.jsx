export default function TreeNode({ children }) {
  return (
    <>
      <div
        style={{ opacity: children === "N" ? 0 : 100 }}
        className="flex justify-center relative items-center  bg-[#0077b6] text-[#caf0f8] rounded-full text-sm font-semibold w-[35px] h-[35px]"
      >
        {children}
      </div>
    </>
  );
}
