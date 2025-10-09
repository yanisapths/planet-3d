"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const HologramBusinessCard = () => (
  <div style={{ width: "100vw", height: "100vh", background: "#f2f2f2" }}>
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{
        antialias: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <HologramCard />
      <OrbitControls enableZoom={true} enableRotate enablePan />
    </Canvas>
  </div>
);

const HologramCard = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const frontUrl = "/images/business-card/front-card-1.png";
  const backUrl = "/images/business-card/back-card-1.png";
  const frontTexture = useLoader(THREE.TextureLoader, frontUrl as string);
  const backTexture = useLoader(THREE.TextureLoader, backUrl as string);

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.009;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform sampler2D frontTexture;
    uniform sampler2D backTexture;
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      // Determine which side we're viewing
      float facing = step(0.0, vNormal.z);
      
      // Flip the back texture horizontally
      vec2 flippedUv = vec2(1.0 - vUv.x, vUv.y);
      vec4 texColor = mix(texture2D(backTexture, flippedUv), texture2D(frontTexture, vUv), facing);
      
      // Create holographic rainbow effect based on view angle
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.0);
      float baseHologram = 0.5;
      float hologramIntensity = baseHologram + fresnel * 1.5;

      // Rainbow colors that shift with angle and time
      float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
      float dist = length(vUv - 0.5);
      float rainbow = angle + dist * 3.0 + uTime * 0.5;
      
      vec3 hologramColor = vec3(
        sin(rainbow) * 0.5 + 0.5,
        sin(rainbow + 2.094) * 0.5 + 0.5,
        sin(rainbow + 4.189) * 0.5 + 0.5
      );
      
      // Combine texture with holographic overlay
      vec3 finalColor = texColor.rgb * 0.95+ hologramColor * hologramIntensity * fresnel * 0.9;
      
      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `;

  const geometry = new THREE.PlaneGeometry(5, 3);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          frontTexture: { value: frontTexture },
          backTexture: { value: backTexture },
          uTime: { value: 0 },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
