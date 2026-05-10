"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, PresentationControls, Float, Html } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const SHOE_GLB =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb";

const VARIANTS = [
  { label: "Heritage", swatch: "#1a1a1a" },
  { label: "Crimson", swatch: "#e63946" },
  { label: "Cream", swatch: "#f5f1e6" },
] as const;

function Shoe({ variant }: { variant: number }) {
  const gltf = useLoader(GLTFLoader, SHOE_GLB);
  const ref = useRef<THREE.Group>(null);

  const variants = useMemo(() => {
    // GLTF MaterialsVariantsShoe has KHR_materials_variants extension
    const userData = gltf.userData as { variants?: Array<{ name: string }> };
    return userData.variants ?? [];
  }, [gltf]);

  // Apply variant on change
  useEffect(() => {
    if (!variants.length) return;
    gltf.scene.traverse((o) => {
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
  }, [variant, gltf, variants]);

  // Apply environment + tweak materials for premium look
  useEffect(() => {
    gltf.scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, [gltf]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref} position={[0, -0.04, 0]} scale={9} rotation={[0, Math.PI * 0.15, 0]}>
      <primitive object={gltf.scene} />
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

export function ShoeShowcase() {
  const [variant, setVariant] = useState(0);

  return (
    <div className="relative w-full h-[58vh] sm:h-[68vh] lg:h-full lg:min-h-[640px]">
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 1.4], fov: 32 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.25} />
        <spotLight position={[3, 5, 3]} angle={0.35} penumbra={1} intensity={1.6} castShadow color="#fff8ec" />
        <spotLight position={[-3, 2, -2]} angle={0.4} penumbra={1} intensity={0.8} color="#e63946" />
        <Suspense fallback={<LoaderFallback />}>
          <PresentationControls
            global
            polar={[-0.25, 0.25]}
            azimuth={[-Math.PI, Math.PI]}
            snap
          >
            <Float floatIntensity={0.3} rotationIntensity={0.1} speed={1.4}>
              <Shoe variant={variant} />
            </Float>
          </PresentationControls>
          <ContactShadows
            position={[0, -0.32, 0]}
            opacity={0.55}
            scale={6}
            blur={2.6}
            far={1}
            resolution={1024}
            color="#000"
          />
          <Environment preset="studio" environmentIntensity={0.6} />
        </Suspense>
      </Canvas>

      {/* Variant swatch picker */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-bg-2/70 backdrop-blur-md border border-line px-4 py-2.5 rounded-full">
        {VARIANTS.map((v, i) => (
          <button
            key={v.label}
            onClick={() => setVariant(i)}
            className="group flex items-center gap-2"
            aria-label={`switch to ${v.label} variant`}
            aria-pressed={variant === i}
          >
            <span
              className="block w-5 h-5 rounded-full border-2 transition-transform"
              style={{
                background: v.swatch,
                borderColor: variant === i ? "var(--color-crimson)" : "rgba(248,246,240,0.25)",
                transform: variant === i ? "scale(1.1)" : "scale(1)",
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
        drag to rotate · scroll to flow
      </div>
    </div>
  );
}
