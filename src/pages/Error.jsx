import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import notfound from "../assets/no-data.gif";

export default function Error() {
  return (
    <>
      <div className="flex-grow flex justify-center pt-[200px]">
        <div className="flex flex-col items-center gap-y-4">
          <img src={notfound} className="w-[130px]" alt="" />
          <h1 className="text-2xl font-semibold">Something Went Wrong</h1>
          <p>An unexpected error occured. Refresh to continue. </p>
        </div>
      </div>
    </>
  );
}
