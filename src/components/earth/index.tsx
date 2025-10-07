"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, Spherical, Texture, TextureLoader } from "three";

import { StarsScene } from "./StarsScene";
import { Glow } from "./Glow";

function EarthGroup({ texture }: { texture: Texture }) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const spherical = useRef(new Spherical(5, Math.PI / 2, 0));

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      spherical.current.theta -= dx * 0.005;
      spherical.current.phi = Math.min(
        Math.max(0.1, spherical.current.phi - dy * 0.005),
        Math.PI - 0.1
      );

      camera.position.setFromSpherical(spherical.current);
      camera.lookAt(0, -0.5, 0);

      lastPos.current = { x: e.clientX, y: e.clientY };
    };
    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [camera]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }

    if (!isDragging.current) {
      spherical.current.theta += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={1}>
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Glow />
    </group>
  );
}

export default function Earth() {
  const [color] = useLoader(TextureLoader, ["/assets/earth/earthmap1k.jpg"]);

  return (
    <div className="overflow-hidden">
      <div className="w-screen h-[100vh] bg-black">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.1} />
          <directionalLight intensity={3.5} position={[1, 1, 1]} />

          <EarthGroup texture={color} />
          <StarsScene />
        </Canvas>
      </div>
    </div>
  );
}
