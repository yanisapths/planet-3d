"use client";
import dynamic from "next/dynamic";
import React from "react";

const Earth = dynamic(() => import("@/components/earth/index"), {
  ssr: false,
  loading: () => <div></div>,
});

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="w-screen h-[100vh] bg-black">
        <Earth />
      </div>
    </div>
  );
}
