"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GridBackground, works } from "@/components/GridBackground";

export default function Home() {
  const [openWork, setOpenWork] = useState<any>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const workKey = searchParams.get("work");
    if (workKey) {
      const found = works.find((w) => w.id.toString() === workKey);
      if (found) setOpenWork(found);
    } else {
      setOpenWork(undefined);
    }
  }, [searchParams]);

  const handleClose = () => {
    router.push("/", { scroll: false });
    setOpenWork(undefined);
  };

  return (
    <div className="overflow-hidden">
      <div className="w-screen h-[100vh]">
        <GridBackground onSelectWork={(work: any) => setOpenWork(work)} />
      </div>
      {openWork && <Overlay work={openWork} onClose={handleClose} />}
    </div>
  );
}

const Overlay = ({ work, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#d9d9d9] animate-in fade-in duration-300">
      <div className="absolute left-6 top-6 z-10">
        <button
          onClick={onClose}
          className="cursor-pointer rounded-xl p-6 bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/20 transition-all"
        >
          <div className="text-sm font-medium">← BACK TO ALL PROJECTS</div>
        </button>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="rounded-xl w-full bg-white/10 backdrop-blur-sm">
          <div className="bg-white/5 flex items-center justify-center">
            {work.content}
          </div>
        </div>
      </div>
    </div>
  );
};
