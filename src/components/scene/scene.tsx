"use client";
import { Canvas } from "@react-three/fiber";
import { ZoomedParticles } from "./infitnite-zoom-space";
import { OrbitControls } from "@react-three/drei";

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
        <OrbitControls enableZoom={true} enableRotate={true} enablePan={true} />
      </Canvas>
    </div>
  );
};
