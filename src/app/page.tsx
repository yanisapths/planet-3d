"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GridBackground } from "@/components/GridBackground";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
function Home() {
  return (
    <div className="overflow-hidden">
      <div className="w-screen h-[100vh]">
        <Suspense fallback={null}>
          <GridBackground />
        </Suspense>
      </div>
    </div>
  );
}
