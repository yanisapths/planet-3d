import React, { ReactNode } from "react";

interface GridProps {
  gridRow?: number;
  gridCol?: number;
  children: ReactNode;
  gap?: number;
}

const Grid = ({ children, gridRow = 4, gridCol = 4, gap = 0 }: GridProps) => {
  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateColumns: `repeat(${gridCol}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridRow}, minmax(0, 1fr))`,
        gap,
      }}
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
      className={`rounded-2xl w-full h-full ${
        showOutliner ? "border border-black/10" : ""
      }`}
    >
      {children}
    </div>
  );
};

Grid.Item = GridItem;

export { Grid, GridItem };
