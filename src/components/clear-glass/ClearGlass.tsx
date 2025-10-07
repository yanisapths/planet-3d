"use client";
import ClearButton from "@/components/ClearButton";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

export const ClearGlass = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 100 }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <ClearButton />
      <Environment background files="/images/chromatic-bg.jpeg" />
      <OrbitControls enableZoom={true} enableRotate={true} enablePan={true} />
    </Canvas>
  );
};
