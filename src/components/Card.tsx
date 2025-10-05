"use client";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  Image,
  Lightformer,
} from "@react-three/drei";
import { RoundedPlaneGeometry } from "maath/geometry";
import { useRef } from "react";
import { useControls } from "leva";
import {
  EffectComposer,
  HueSaturation,
  TiltShift2,
} from "@react-three/postprocessing";

export const Card = ({ frontUrl, backUrl, ...props }: any) => {
  const frontTexture = useLoader(THREE.TextureLoader, frontUrl as string);

  const ref = useRef(null);

  const config = useControls({
    metalness: { value: 1, min: 0, max: 1, step: 0.01 },
    backsideThickness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.15, min: 0, max: 30, step: 0.01 },
    samples: { value: 6, min: 1, max: 32, step: 1 },
    transmission: { value: 0.6, min: 0, max: 1 },
    saturation: { value: 0.5, min: -1, max: 1 },
    roughness: { value: 0.98, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0.01, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
  });

  return (
    <group {...props} ref={ref}>
      <ambientLight intensity={0} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Front */}
      <mesh position={[0, 0, 0.01]}>
        <primitive object={new RoundedPlaneGeometry(2, 3, 0.2)} />
        <MeshTransmissionMaterial {...config} map={frontTexture}>
          <Image
            ref={ref}
            url={frontUrl}
            transparent
            side={THREE.DoubleSide}
            {...props}
          ></Image>
        </MeshTransmissionMaterial>
      </mesh>

      {/* Back */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.01]}>
        <primitive object={new RoundedPlaneGeometry(2, 3, 0.2)} />
        <MeshTransmissionMaterial {...config} map={frontTexture}>
          <Image
            ref={ref}
            url={frontUrl}
            transparent
            side={THREE.DoubleSide}
            {...props}
          ></Image>
        </MeshTransmissionMaterial>
      </mesh>

      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.3, 1]}>
          <Lightformer
            intensity={5}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={5}
            rotation-y={Math.PI / 2}
            position={[-10, 0, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={5}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[20, 10, 1]}
          />
        </group>
      </Environment>

      <EffectComposer multisampling={1}>
        <TiltShift2 blur={0} />
        <HueSaturation hue={0} saturation={config?.saturation as any} />
      </EffectComposer>
    </group>
  );
};
