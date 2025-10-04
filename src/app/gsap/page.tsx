"use client";
import gsap from "gsap";
import React, { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { BackgroundScene } from "@/components/whale";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const GSAPExample = () => {
  // useLayoutEffect(() => {
  //   ScrollSmoother.create({
  //     wrapper: "#smooth-wrapper",
  //     content: "#smooth-content",
  //     smooth: 1,
  //     effects: true,
  //   });
  // });

  return (
    <div className="flex justify-center items-center text-center">
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="w-screen h-[100vh]">
            <BackgroundScene />
          </div>
          <div className="w-screen h-[100vh] bg-black/8"></div>
          <div className="w-screen h-[100vh] bg-black/4"></div>
        </div>
      </div>
    </div>
  );
};
export default GSAPExample;
