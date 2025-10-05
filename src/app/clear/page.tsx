"use client";
import ClearButton from "@/components/ClearButton";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const page = () => {
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
      <OrbitControls
        enableZoom={false}
        enableRotate={true}
        minDistance={4.5}
        maxDistance={5.5}
        minPolarAngle={Math.PI / 2 - 0.1}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minAzimuthAngle={-0.1}
        maxAzimuthAngle={0.1}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};
export default page;
