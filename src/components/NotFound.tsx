"use client";
import React from "react";

export const NotFound = () => {
  return (
    <div className="flex flex-col text-center h-screen text-cetner justify-center items-center">
      <p
        className="flex flex-col justify-center text-black/10 font-semibold"
        style={{
          fontSize: "128px",
        }}
      >
        404
      </p>
      <p className="flex flex-col justify-center text-black/10 font-semibold">
        Data not found
      </p>
    </div>
  );
};
