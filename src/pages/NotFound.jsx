import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import notfound from "../assets/notfound.gif";

export default function NotFound() {
  return (
    <>
      <div className="bg-neutral-200 flex-col flex  w-screen h-screen ">
        <TopNav />
        <div className="flex-grow flex justify-center pt-[200px]">
          <div className="flex flex-col items-center gap-y-4">
            <img src={notfound} className="w-[130px]" alt="" />
            <h1 className="text-2xl font-semibold">404 Not Found</h1>
            <p>Seems like the requested page does not exist.</p>
          </div>
        </div>
      </div>
    </>
  );
}
