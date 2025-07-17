"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { getFresnelMat } from "./getFresnelMat";
import { Mesh, ShaderMaterial } from "three";

export function Glow() {
  const glowRef = useRef<Mesh>(null!);
  useFrame(({ camera }) => {
    const mat = glowRef.current?.material;
    if (mat instanceof ShaderMaterial && mat.uniforms.viewVector) {
      mat.uniforms.viewVector.value.copy(camera.position);
    }
  });

  return (
    <mesh position={[0, -0.2, 0]} ref={glowRef} scale={1.01}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={getFresnelMat()} attach="material" />
    </mesh>
  );
}
