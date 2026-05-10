"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  PresentationControls,
  Float,
  Html,
  useGLTF,
  Center,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const SHOE_GLB =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb";

useGLTF.preload(SHOE_GLB);

const VARIANTS = [
  { label: "Heritage", swatch: "#1a1a1a" },
  { label: "Crimson", swatch: "#e63946" },
  { label: "Cream", swatch: "#f5f1e6" },
] as const;

function Shoe({ variant }: { variant: number }) {
  const { scene } = useGLTF(SHOE_GLB) as unknown as { scene: THREE.Group };
  const ref = useRef<THREE.Group>(null);

  // The KHR_materials_variants extension stores per-mesh variant materials in userData
  useEffect(() => {
    scene.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      const meshUser = o.userData as {
        variantMaterials?: Array<{ material: THREE.Material; variants: number[] }>;
        originalMaterial?: THREE.Material;
      };
      const list = meshUser.variantMaterials;
      if (!list) return;
      const match = list.find((m) => m.variants?.includes(variant));
      if (match) o.material = match.material;
      else if (meshUser.originalMaterial) o.material = meshUser.originalMaterial;
    });
  }, [variant, scene]);

  // Cast / receive shadows for premium ground contact
  useEffect(() => {
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, [scene]);

  // Slow auto-rotation when user isn't dragging
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref}>
      {/* Center auto-positions the model around origin so PresentationControls rotates around its center */}
      <Center>
        {/* Model is ~30cm long; scale 14 gives ~4.2 unit length — nicely fills our viewport */}
        <primitive object={scene} scale={14} />
      </Center>
    </group>
  );
}

function LoaderFallback() {
  return (
    <Html center>
      <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-ink-3 animate-pulse">
        loading shoe…
      </div>
    </Html>
  );
}

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight
        position={[4, 6, 4]}
        angle={0.3}
        penumbra={1}
        intensity={2.2}
        castShadow
        color="#fff8ec"
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[-4, 3, -2]}
        angle={0.4}
        penumbra={1}
        intensity={1.0}
        color="#e63946"
      />
      <spotLight
        position={[0, -2, 3]}
        angle={0.5}
        penumbra={1}
        intensity={0.6}
        color="#ff5a1f"
      />
    </>
  );
}

export function ShoeShowcase() {
  const [variant, setVariant] = useState(0);

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-square min-h-[460px] sm:min-h-[560px] lg:min-h-[680px]">
      {/* Soft ground glow under the shoe for premium feel */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[8%] h-[60%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(230, 57, 70, 0.18), transparent 60%)",
        }}
      />

      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 1, 5.5], fov: 28 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <StudioLights />
        <Suspense fallback={<LoaderFallback />}>
          <PresentationControls
            global
            polar={[-0.35, 0.35]}
            azimuth={[-Math.PI, Math.PI]}
            speed={1.4}
            zoom={1}
            snap
          >
            <Float floatIntensity={0.45} rotationIntensity={0.18} speed={1.6}>
              <group rotation={[0, Math.PI * 0.18, 0]}>
                <Shoe variant={variant} />
              </group>
            </Float>
          </PresentationControls>
          <ContactShadows
            position={[0, -1.45, 0]}
            opacity={0.7}
            scale={9}
            blur={2.4}
            far={2}
            resolution={1024}
            color="#000"
          />
          <Environment preset="studio" environmentIntensity={0.7} />
        </Suspense>
      </Canvas>

      {/* Variant swatch picker */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-bg-2/80 backdrop-blur-md border border-line px-4 py-2.5 rounded-full z-10">
        {VARIANTS.map((v, i) => (
          <button
            key={v.label}
            onClick={() => setVariant(i)}
            className="group flex items-center gap-2 cursor-pointer"
            aria-label={`switch to ${v.label} variant`}
            aria-pressed={variant === i}
          >
            <span
              className="block w-5 h-5 rounded-full border-2 transition-transform"
              style={{
                background: v.swatch,
                borderColor: variant === i ? "var(--color-crimson)" : "rgba(248,246,240,0.25)",
                transform: variant === i ? "scale(1.12)" : "scale(1)",
              }}
            />
            <span
              className={`font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors ${
                variant === i ? "text-ink" : "text-ink-3 group-hover:text-ink-2"
              }`}
            >
              {v.label}
            </span>
          </button>
        ))}
      </div>

      {/* Drag hint */}
      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.28em] uppercase text-ink-3 hidden sm:block">
        drag to rotate
      </div>
    </div>
  );
}

