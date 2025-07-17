import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import getStarfield from "./getStarField";
import { Material, Points } from "three";

export function StarsScene() {
  const { scene } = useThree();
  const starfieldRef = useRef<Points>(null);

  useEffect(() => {
    const stars = getStarfield({ numStars: 1000 });
    starfieldRef.current = stars;
    scene.add(stars);

    return () => {
      scene.remove(stars);
      stars.geometry.dispose();
      if (stars.material instanceof Material) stars.material.dispose();
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (starfieldRef.current) {
      starfieldRef.current.rotation.y += delta * 0.003;
      starfieldRef.current.rotation.x += delta * 0.002;
    }
  });

  return null;
}
