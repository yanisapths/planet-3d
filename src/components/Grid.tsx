import React, { CSSProperties, ReactNode } from "react";

interface GridProps {
  gridRow?: number;
  gridCol?: number;
  children: ReactNode;
  gap?: number;
}

const Grid = ({ children, gridRow = 4, gridCol = 4, gap = 0 }: GridProps) => {
  return (
    <div
      className="grid w-full h-auto grid-cols-1 auto-rows-[minmax(16rem,auto)] gap-2 md:h-full md:auto-rows-auto md:[grid-template-columns:repeat(var(--grid-col),minmax(0,1fr))] md:[grid-template-rows:repeat(var(--grid-row),minmax(0,1fr))] md:[gap:var(--grid-gap)]"
      style={
        {
          "--grid-col": gridCol,
          "--grid-row": gridRow,
          "--grid-gap": `${gap}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

Grid.Root = Grid;

interface GridItemProps {
  children: ReactNode;
  showOutliner?: boolean;
}

const GridItem = ({ children, showOutliner = false }: GridItemProps) => {
  return (
    <div
      className={`rounded-2xl w-full h-full aspect-square md:aspect-auto ${
        showOutliner ? "border border-black/10" : ""
      }`}
    >
      {children}
    </div>
  );
};

Grid.Item = GridItem;

export { Grid, GridItem };
