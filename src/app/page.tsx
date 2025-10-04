"use client";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import React, { useLayoutEffect } from "react";

const Earth = dynamic(() => import("@/components/earth/index"), {
  ssr: false,
  loading: () => <div></div>,
});

const BackgroundScene = dynamic(
  () =>
    import("@/components/whale").then((mod) => ({
      default: mod.BackgroundScene,
    })),
  {
    ssr: false,
    loading: () => <div></div>,
  }
);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  useLayoutEffect(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="w-screen h-[100vh] bg-black">
            <Earth />
          </div>
          <div className="w-screen h-[100vh] bg-gradient-to-b from-black to-blue-900">
            <BackgroundScene />
          </div>
          <div className="w-screen h-[100vh] bg-gradient-to-b from-blue-900 to-black"></div>
        </div>
      </div>
    </div>
  );
}
