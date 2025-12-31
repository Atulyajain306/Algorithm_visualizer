import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import alarm from "../assets/responsive.gif";
import no from "../assets/no.png";
import Responsive from "./Responsive";

export default function Wrapper() {
  return (
    <>
      <div className="bg-neutral-200  flex-col websiteWrapper flex  w-screen h-screen ">
        <TopNav />
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>

      <Responsive />
    </>
  );
}
