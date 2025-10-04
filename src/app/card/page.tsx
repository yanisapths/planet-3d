"use client";
import { Canvas } from "@react-three/fiber";
import { Card } from "@/components/Card";
import { OrbitControls } from "@react-three/drei";

export default function Page() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ width: "100vw", height: "100vh", background: "#eaeaea" }}
    >
      <Card frontUrl="/images/card.png" backUrl="/images/card.png" />
      <OrbitControls enableRotate enableZoom enablePan rotateSpeed={2} />
    </Canvas>
  );
}
