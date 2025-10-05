"use client";
import React, { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import {
  Environment,
  MeshTransmissionMaterial,
  Lightformer,
  Text,
  RoundedBox,
} from "@react-three/drei";
import { Mesh } from "three";

function ClearButton() {
  const [hovered, setHovered] = useState(false);
  const [textWidth, setTextWidth] = useState(2);
  const textRef = useRef<Mesh>(null);

  const { scale } = useSpring({
    scale: hovered ? 1.08 : 1,
    config: { mass: 1, tension: 400, friction: 15 },
  });

  return (
    <group>
      <animated.mesh
        position={[0, 0, 0]}
        scale={scale}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox
          args={[textWidth + 1.2, 1, 4]} // width, height, depth
          radius={0.2} // corner radius
          smoothness={8} // number of subdivision steps for roundness
        >
          <MeshTransmissionMaterial
            transmission={1}
            roughness={0.02}
            ior={1.52}
            thickness={2.5}
            chromaticAberration={0.01}
            color="#ffffff"
            backside={false}
          />
        </RoundedBox>
        <Environment resolution={512}>
          <group rotation={[-Math.PI / 4, -0.3, 1]}>
            <Lightformer
              intensity={8}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
              color="white"
            />
            <Lightformer
              intensity={10}
              rotation-y={Math.PI / 2}
              position={[-10, 0, -1]}
              scale={[10, 2, 1]}
              color="#d0e3ff"
            />
            <Lightformer
              intensity={6}
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={[20, 10, 1]}
              color="#fff2dd"
            />
          </group>
        </Environment>
        <Environment preset="warehouse" />
      </animated.mesh>

      <Text
        ref={textRef}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.6}
        color={hovered ? "#ffffff" : "#e0e7ff"}
        anchorX="center"
        anchorY="middle"
        onSync={(text) => {
          const size = text.geometry.boundingBox
            ? text.geometry.boundingBox.max.x - text.geometry.boundingBox.min.x
            : 2;
          setTextWidth(size);
        }}
      >
        Hello World
      </Text>
    </group>
  );
}

export default ClearButton;
