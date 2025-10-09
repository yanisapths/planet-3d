"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export const WhaleScene = () => {
  return (
    <div className="flex justify-center items-center text-center">
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="w-screen h-[100vh] bg-[#e8e8e8]">
            <BackgroundScene />
          </div>
          <div className="w-screen h-[100vh] bg-black/8"></div>
          <div className="w-screen h-[100vh] bg-black/4"></div>
        </div>
      </div>
    </div>
  );
};

export const BackgroundScene = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      camera={{
        position: [5, 0, 5],
        fov: 50,
      }}
    >
      <ambientLight intensity={1.5} />
      <Whale />
    </Canvas>
  );
};

const Whale = () => {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/assets/ocean/humpback_whale.glb");

  useEffect(() => {
    if (!group.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
      },
    });

    tl.to(group.current.position, {
      y: 0,
      x: -1,
      z: -1,
      duration: 1,
      ease: "none",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <group ref={group} position={[1, 0, 0]} scale={1.8}>
      <primitive object={scene} />
    </group>
  );
};
