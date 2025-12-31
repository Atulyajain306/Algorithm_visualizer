import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import sorting from "../assets/sorting.png";
import search from "../assets/searchIcon.png";
import tree from "../assets/tree.png";
import stacks from "../assets/stacks.png";
import searchnstack from "../assets/searchnstack.png";
import graph from "../assets/graph.png";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import email from "../assets/email.png";
import { Helmet } from "react-helmet-async";

import { useEffect, useRef, useState } from "react";
import SwipeAnimation from "../components/UIComponents/SwipeAnimation";

export default function Home() {
  const [copyStatus, setCopyStatus] = useState(false);
  const copyRef = useRef();

  function copyEmail(str) {
    navigator.clipboard.writeText(str);
    setCopyStatus(true);
  }

  useEffect(() => {
    if (copyStatus) {
      setTimeout(() => {
        setCopyStatus(false);
      }, 5000);
      setTimeout(() => {
        copyRef.current.style.opacity = 100;
      }, 0);
    }
  }, [copyStatus]);

  return (
    <>
      <Helmet>
        <title>Home | AlgoTrace</title>
        <meta
          name="description"
          content="AlgoTrace is an Algorithm and Data-Structure Visualization Tool that uses interesting and interactive animations to make learning and understanding algorithms fun."
        />
      </Helmet>
      <div className="flex w-full h-full flex-col items-center py-[100px]  px-16">
        <h1 className="text-center text-[40px] font-semibold">
          Welcome to{" "}
          <span
            style={{ fontFamily: "Bungee Tint" }}
            className="ml-2 font-extrabold"
          >
            ALGOTRACE
          </span>
        </h1>
        <p className="mt-8 text-lg px-8 max-w-[1500px] text-center">
          Hey there! Welcome to AlgoTrace. I know how tough it can be to wrap
          your head around algorithms just by reading theory or staring at code.{" "}
          <br /> That’s why I created AlgoTrace – a fun, visual way to actually
          see how algorithms work step-by-step. <br /> Whether you’re prepping
          for exams, coding interviews, or just curious about how data
          structures and algorithms work, AlgoTrace gives you a hands-on
          experience. This Project is all about making complex stuff easier to
          understand, with interactive visualizations and simple explanations.
        </p>
        <p className="text-lg mt-2">
          Give it a try and make learning algorithms way less stressful!
        </p>

        <h2 className="text-3xl font-semibold mt-16">
          Checkout following Visualizations
        </h2>

        <div className="flex flex-wrap gap-12 justify-center scale-[85%] mt-16">
          <div className="flex p-4 rounded-3xl items-center bg-neutral-50 shadow-md">
            <div className="p-4 rounded-3xl m-4 ">
              <img src={sorting} className="w-[150px] h-[150px] " alt="" />
            </div>
            <div className="flex flex-col w-[350px] h-full pt-2 m-2 px-8">
              <h1 className="text-2xl font-semibold text-center tracking-wide uppercase">
                Sorting
              </h1>
              <div className="flex flex-wrap my-6 gap-y-2 gap-x-2 ">
                <span className="px-3 rounded-lg bg-neutral-200  text-center text-lg">
                  Insertion Sort
                </span>
                <span className="px-3 rounded-lg bg-neutral-200  text-center text-lg">
                  Merge Sort
                </span>
              </div>
            </div>
          </div>

          <div className="flex p-4 rounded-3xl items-center bg-neutral-50 shadow-md">
            <div className="p-4 rounded-3xl m-4 mr-0">
              <img src={searchnstack} className="w-[200px]  " alt="" />
            </div>
            <div className="flex flex-col w-[350px] h-full pt-2 m-2 px-8">
              <h1 className="text-2xl font-semibold text-center tracking-wide uppercase">
                Search
              </h1>
              <div className="flex flex-wrap my-6  gap-y-2 gap-x-2 ">
                <span className="px-3  bg-neutral-200 rounded-lg   text-center text-lg">
                  Linear Search
                </span>
                <span className="px-3 rounded-lg bg-neutral-200  text-center text-lg">
                  Binary Search
                </span>
              </div>
            </div>
          </div>

          <div className="flex p-4 rounded-3xl items-center bg-neutral-50 shadow-md">
            <div className="p-4 rounded-3xl m-4 ">
              <img src={tree} className="w-[150px] h-[150px] " alt="" />
            </div>
            <div className="flex flex-col w-[350px] h-full pt-2 m-2 px-8">
              <h1 className="text-2xl font-semibold text-center tracking-wide uppercase">
                Trees
              </h1>
              <div className="flex flex-wrap my-6 gap-y-2 gap-x-2 ">
                <span className="px-3  bg-neutral-200 rounded-lg   text-center text-lg">
                  Binary Tree
                </span>
                <span className="px-3 rounded-lg bg-neutral-200  text-center text-lg">
                  Binary Search Tree
                </span>
              </div>
            </div>
          </div>

          <div className="flex p-4 rounded-3xl items-center bg-neutral-50 shadow-md">
            <div className="p-4 rounded-3xl m-4 ">
              <img src={graph} className="w-[150px] h-[150px] " alt="" />
            </div>
            <div className="flex flex-col w-[350px] h-full pt-2 m-2 px-8">
              <h1 className="text-2xl font-semibold text-center tracking-wide uppercase">
                Graphs
              </h1>
              <div className="flex flex-wrap my-6 gap-y-2 gap-x-2 ">
                <span className="px-3  bg-neutral-200 rounded-lg   text-center text-lg">
                  Graph
                </span>
                <span className="px-3 rounded-lg bg-neutral-200  text-center text-lg">
                  BFS & DFS
                </span>
                <span className="px-3 rounded-lg bg-neutral-200  text-center text-lg">
                  Dijkstra's
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-12">
          <h1 className="font-semibold text-3xl text-center">
            You can find me here
          </h1>
          <p className="text-lg mt-8 text-center">
            Your Feedback and Suggestions are higly valuable to me. Please feel
            free to contact me anytime on any of the following platforms:
          </p>

          <div className="flex justify-center items-center mt-12 gap-20">
            <div className="text-lg relative flex justify-center items-center ">
              <img src={email} className="w-[55px] " alt="" />
              <span className="items-center absolute bottom-[-10px] translate-y-[100%] right-[50%] translate-x-[50%] min-w-[110px] justify-center bg-white rounded-xl px-2  h-fit flex w-fit py-1">
                {copyStatus ? (
                  <span className=" rounded-lg px-2">
                    <span
                      ref={copyRef}
                      className="opacity-[0.1] text-base font-medium text-green-600 duration-[2500ms]"
                    >
                      Copied
                    </span>
                  </span>
                ) : (
                  <button
                    onClick={() => copyEmail("amulyajain123@gmail.com")}
                    className=" hover:bg-stone-100 rounded-lg px-2"
                  >
                    <span className="text-base text-nowrap font-medium ">
                      Copy Email
                    </span>
                  </button>
                )}
              </span>
            </div>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/atulya-jain-b04236303/"
            >
              <img src={linkedin} className="w-[50px]" alt="" />
            </a>
            <a target="_blank" href="https://github.com/Atulyajain306">
              <img src={github} className="w-[50px]" alt="" />
            </a>
          </div>
          <p className="text-lg mt-24 max-w-[80%] mx-auto text-center">
            AlgoTrace is extensively debugged. Still if you discover any minor
            bugs or some inconsistencies, please report them to me at any of the
            above platforms. Your contibution will be highly appreciated.
          </p>
        </div>

        <div className="flex flex-col mt-16"></div>

        <div className="min-w-[400px] min-h-[200px]"></div>
      </div>
    </>
  );
}
