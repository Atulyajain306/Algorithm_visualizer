import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageWrapper() {
  const location = useLocation();
  useEffect(() => {
    const ele = document.querySelector(".mainWin");
    ele.scrollTop = "0px";
  }, [location]);

  return (
    <>
      <div className="flex w-full h-full ">
        <div className="  border-r-2 border-neutral-400">
          <SideMenu />
        </div>
        <div className="flex flex-grow overflow-auto customScroll mainWin h-full ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
