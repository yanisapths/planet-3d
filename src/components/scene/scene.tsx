"use client";
import { Canvas } from "@react-three/fiber";
import { ZoomedParticles } from "./infitnite-zoom-space";

export const StarScene = () => {
  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.1} />
        <ZoomedParticles />
      </Canvas>
    </div>
  );
};
