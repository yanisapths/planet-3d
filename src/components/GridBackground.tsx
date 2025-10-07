"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Grid } from "./Grid";
import { CardCustomImage } from "./3d-card/card-custom-image";
import { ClearGlass } from "./clear-glass/ClearGlass";
import Earth from "./earth";
import { StarScene } from "./scene/scene";
import { WhaleScene } from "./whale";
import { useRouter, useSearchParams } from "next/navigation";

export const works = [
  {
    id: 1,
    key: "earth",
    title: "Earth",
    content: <Earth />,
    thumbnailImg: "/images/thumbnail/earth.png",
  },
  {
    id: 2,
    key: "gsap-whale",
    title: "GSAP scroll with 3D model",
    content: <WhaleScene />,
    thumbnailImg: "/images/thumbnail/whale.png",
  },
  {
    id: 3,
    key: "zoom-space",
    title: "Infinite zoom Space",
    content: <StarScene />,
    thumbnailImg: "/images/thumbnail/zoom-space.png",
  },
  {
    id: 4,
    key: "card-with-image",
    title: "3D card with custom image",
    content: <CardCustomImage />,
    thumbnailImg: "/images/thumbnail/card-with-image.png",
  },
  {
    id: 5,
    key: "glass",
    title: "Clear texture with text",
    content: <ClearGlass />,
    thumbnailImg: "/images/thumbnail/clear-glass.png",
  },
];

export const GridBackground = ({
  onSelectWork,
}: {
  onSelectWork: (work: any) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gridCol = 3;
  const gridRow = 3;
  const totalCells = gridCol * gridRow;

  const filledWorks = [
    ...works.slice(0, totalCells),
    ...Array(Math.max(0, totalCells - works.length)).fill(null),
  ];

  useEffect(() => {
    const workKey = searchParams.get("work");
    if (workKey) {
      const found = works.find((w) => w.key === workKey);
      if (found) onSelectWork(found);
    }
  }, [searchParams, onSelectWork]);

  const handleOpenWork = (work: any) => {
    router.push(`?work=${work.id}`, { scroll: false });
    onSelectWork(work);
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
