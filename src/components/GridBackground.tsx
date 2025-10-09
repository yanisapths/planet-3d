"use client";

import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { Grid } from "./Grid";
import { experiments } from "./experiment/experiment";

export const GridBackground = () => {
  const router = useRouter();

  const gridCol = 3;
  const gridRow = 3;
  const totalCells = gridCol * gridRow;

  const filledWorks = [
    ...experiments.slice(0, totalCells),
    ...Array(Math.max(0, totalCells - experiments.length)).fill(null),
  ];

  const handleOpenWork = (work: any) => {
    router.push(`/experiments/${work.id}`, { scroll: false });
  };

  return (
    <Suspense fallback={null}>
      <div className="w-screen h-screen bg-[#191919] py-6">
        <p className="text-[#949597] text-6xl pl-6 pb-6">Archive</p>
        <Grid.Root gridCol={gridCol} gridRow={gridRow}>
          {filledWorks.map((work, index) => (
            <Grid.Item key={work?.id ?? `empty-${index}`}>
              {work ? (
                <CardInGrid
                  work={work}
                  onOpenContent={() => handleOpenWork(work)}
                />
              ) : (
                <div className="w-full h-full border border-[#333]" />
              )}
            </Grid.Item>
          ))}
        </Grid.Root>
      </div>
    </Suspense>
  );
};
const CardInGrid = ({ work, onOpenContent }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative w-full h-full bg-cover border border-white/20 border-dashed overflow-hidden cursor-pointer group"
      style={{ backgroundColor: work.bgColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenContent}
    >
      <div className="absolute inset-0">
        {!imageError ? (
          <div className="relative justify-center items-center w-full h-full m-auto p-4">
            <div className="absolute -top-1 left-1 text-white/60 text-6xl">
              {work.id.toString().padStart(2, "0")}
            </div>
            <img
              src={work.thumbnailImg}
              alt={work.title}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-white/20 text-6xl mb-4">
                {work.id.toString().padStart(2, "0")}
              </div>
              <div className="text-white/80 text-sm font-medium">
                {work.title}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-white text-lg font-medium">View Project</div>
      </div>
    </div>
  );
};
