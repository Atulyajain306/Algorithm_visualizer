import alarm from "../assets/responsive.gif";
import no from "../assets/no.png";
import { useState } from "react";
import info from "../assets/info.png";
import keyboard from "../assets/keyboard.webp";

export default function Responsive() {
  const [showKeyboardInfo, setShowKeyboardInfo] = useState(false);

  return (
    <>
      <div className="relative responsiveDialog flex flex-col mobileScreen w-screen customScroll h-screen">
        <div className="w-full bg-black py-2 px-8 flex justify-center">
          <span
            className="text-3xl topNav"
            style={{ fontFamily: "Bungee Tint" }}
          >
            ALGOTRACE
          </span>
        </div>
        <div className="overflow-auto res-back customScroll bg-neutral-200 flex-grow w-full">
          <div className="max-w-[1200px] mx-auto flex-col justify-center mt-10 flex warning">
            <div className="p-3 bg-neutral-200 mx-3 rounded-xl">
              <div className="flex flex-col content p-8 pt-4 rounded-3xl items-center">
                <div className="flex para3 flex-col items-center mb-8">
                  <div className="relative w-full imageBox flex justify-center mb-10">
                    <img
                      src={alarm}
                      className="w-[100px] img1 h-[100px]"
                      alt=""
                    />
                    <img
                      src={no}
                      className="w-[120px] h-[120px] img2 opacity-75 absolute top-[-10px]"
                      alt=""
                    />
                  </div>
                  <h1 className="text-3xl underline underline-offset-4 font-bold text-red-600">
                    Too Zoomed!!
                  </h1>
                </div>

                <div className="flex justify-center w-full mt-2 sm:mt-4 overflow-clip">
                  <div className="overflow-clip h-[170px] vsm:h-[90px] lg:h-auto">
                    <div className="w-fit mx-auto relative text-nowrap scale-[65%] sm:scale-75 origin-top lg:scale-100 flex justify-center flex-col vsm:flex-row items-center gap-6 mb-4 sm:mb-6 md:mb-8">
                      <span className="text-3xl font-bold text-center text-red-600 ">
                        PRESS
                      </span>

                      <div className="flex space-x-4  relative items-center">
                        <div className="p-2 bg-inherit rounded-lg ">
                          <div className="border-4 border-ingherit rounded-t-2xl rounded-b-xl w-[90px] h-[70px] bg-black relative">
                            <div className="border-4 border-white rounded-lg top-[-1px] right-[50%] translate-x-[50%] absolute w-[72px] h-[52px]">
                              <div className="absolute font-bold text-white pl-2 top-[50%] translate-y-[-50%]">
                                Ctrl
                              </div>
                            </div>
                            <div className="border-2 border-white w-[14px] absolute rotate-[-54deg] bottom-[7px] left-[-3px]"></div>
                            <div className="border-2 border-white w-[14px] absolute rotate-[-134deg] bottom-[7px] right-[-3px]"></div>
                          </div>
                        </div>

                        <div className="text-[40px] font-bold text-center text-red-600">
                          +
                        </div>

                        <div className="p-2 bg-inherit rounded-lg">
                          <div className="border-4 border-inherit rounded-t-2xl rounded-b-xl w-[70px] h-[70px] bg-black relative">
                            <div className="border-4 border-white rounded-lg top-[-1px] right-[50%] translate-x-[50%] absolute w-[52px] h-[52px]">
                              <div className="border-[2px] border-white w-[8px] absolute bottom-[10px] left-[10px]"></div>
                              <div className="border-[2px] border-white w-[12px] absolute top-[14px] left-[10px]"></div>
                            </div>
                            <div className="border-2 border-white w-[14px] absolute rotate-[-54deg] bottom-[7px] left-[-3px]"></div>
                            <div className="border-2 border-white w-[14px] absolute rotate-[-134deg] bottom-[7px] right-[-3px]"></div>
                          </div>
                        </div>
                        <div className="flex absolute -right-4 -top-2 justify-center mt-3">
                          <button
                            className=" bg-inherit text-black rounded-full flex items-center gap-1  hover:bg-white duration-500 transition"
                            onClick={() =>
                              setShowKeyboardInfo(!showKeyboardInfo)
                            }
                          >
                            <img src={info} className="w-[20px]" alt="" />
                          </button>
                        </div>
                      </div>

                      <span className="text-3xl vsm:pl-4 relative flex font-bold text-center text-red-600 ">
                        <span>To Zoom Out</span>
                      </span>
                    </div>
                  </div>
                </div>
                {showKeyboardInfo && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white p-2 sm:p-5 rounded-lg max-w-[800px] w-full">
                      <h3 className="font-bold text-2xl sm:text-3xl text-center   mb-2">
                        Keyboard Location
                      </h3>
                      <img src={keyboard} className="" alt="" />
                      <button
                        className="bg-blue-500 text-white px-4 py-[6px] text-base sm:text-lg sm:py-2 rounded-md w-full"
                        onClick={() => setShowKeyboardInfo(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                <div className="w-full">
                  <p className="text-center">
                    Hey Bud!! It seems like the the zoom on your device is a
                    little too much for us.
                  </p>
                  <p className="mt-2 para1 text-center">
                    Because this is a Visualization Tool we can't work on
                    smaller screens. We need a minimum screen width of{" "}
                    <span className="text-red-600">1700 px</span>. <br /> If you
                    are on a Smartphone, switch to a bigger screen otherwise{" "}
                    <span className="text-red-600">
                      lower the zoom untill this warning disappears
                    </span>
                    .
                  </p>
                  <div className="mt-10 last">
                    <p className="text-center para2 mt-6 font-medium">
                      Zoom-Out till this Dialog Box disappears
                    </p>
                    <p className="text-center font-normal ">Or</p>
                    <p className="text-center font-medium">
                      Switch to a bigger screen if you are on a smartphone
                    </p>
                  </div>
                  <div className="min-h-[120px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
