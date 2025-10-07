import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Card } from "../Card";

export const CardCustomImage = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ width: "100vw", height: "100vh", background: "#eaeaea" }}
    >
      <Card frontUrl="/images/card.png" backUrl="/images/card.png" />
      <OrbitControls enableRotate enableZoom enablePan rotateSpeed={2} />
    </Canvas>
  );
};
