"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BackgroundScene = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
      camera={{ position: [5, 0, 5], fov: 50 }}
    >
      <ambientLight intensity={1.5} />
      <Whale />
    </Canvas>
  );
};

const Whale = () => {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("./assets/ocean/humpback_whale.glb");

  useEffect(() => {
    if (!group.current) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#smooth-content",
          start: "top top",
          end: "bottom 200px",
          scrub: true,
          markers: true,
        },
      })
      .to(
        group.current.position,
        {
          y: -0.7,
          ease: "in-out",
        },
        0
      );
  }, []);

  return (
    <group ref={group} position={[1, 0, 0]} scale={1.8}>
      <primitive object={scene} />
    </group>
  );
};
