"use client";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { AdditiveBlending, BufferAttribute, Points } from "three";

interface Star {
  position: [number, number, number];
}

const generateStars = (count: number): Star[] => {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        Math.random() * -10,
      ],
    });
  }
  return stars;
};

export function ZoomedParticles() {
  const ref = useRef<Points>(null);
  const count = 5000;
  const stars = useRef(generateStars(count));
  const positionsArray = useRef(new Float32Array(stars.current.length * 3));

  useFrame((state, delta) => {
    stars.current.forEach((star, i) => {
      const speed = 0.01 + (i % 10) * 0.001;
      star.position[2] += speed * delta * 60;
      if (star.position[2] > 0) {
        star.position[0] = (Math.random() - 0.5) * 100;
        star.position[1] = (Math.random() - 0.5) * 100;
        star.position[2] = -50;
      }

      positionsArray.current[i * 3] = star.position[0];
      positionsArray.current[i * 3 + 1] = star.position[1];
      positionsArray.current[i * 3 + 2] = star.position[2];
    });

    if (ref.current) {
      const attr = ref.current.geometry.attributes.position as BufferAttribute;
      attr.array = positionsArray.current;
      attr.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positionsArray.current}
          args={[positionsArray.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={AdditiveBlending}
      />
    </points>
  );
}
