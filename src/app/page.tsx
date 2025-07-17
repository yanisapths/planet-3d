"use client";
import dynamic from "next/dynamic";

const Earth = dynamic(() => import("@/components/earth/index"), {
  ssr: false,
  loading: () => <div></div>,
});

export default function Home() {
  return (
    <div className="bg-black h-screen w-screen">
      <Earth />
    </div>
  );
}
