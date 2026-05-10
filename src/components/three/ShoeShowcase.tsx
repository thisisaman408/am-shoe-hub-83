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
  Bounds,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const SHOE_GLB =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb";

useGLTF.preload(SHOE_GLB);

const VARIANTS = [
  { label: "Heritage", swatch: "#1a1a1a" },
  { label: "Crimson", swatch: "#e63946" },
  { label: "Cream", swatch: "#f5f1e6" },
] as const;

interface VariantMapping {
  material: number;
  variants: number[];
}
interface VariantsExt {
  mappings?: VariantMapping[];
}
interface MeshUserData {
  gltfExtensions?: { KHR_materials_variants?: VariantsExt };
  originalMaterial?: THREE.Material;
}

function Shoe({ variantIdx }: { variantIdx: number }) {
  const gltf = useGLTF(SHOE_GLB) as unknown as GLTF & {
    parser: { getDependency: (type: string, idx: number) => Promise<unknown> };
  };
  const { scene } = gltf;
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!gltf.parser) return;
    let cancelled = false;
    const apply = async () => {
      const meshes: THREE.Mesh[] = [];
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) meshes.push(o);
      });
      for (const object of meshes) {
        const ud = object.userData as MeshUserData;
        const ext = ud.gltfExtensions?.KHR_materials_variants;
        if (!ext?.mappings) continue;
        if (!ud.originalMaterial) {
          ud.originalMaterial = object.material as THREE.Material;
        }
        const mapping = ext.mappings.find((m) => m.variants.includes(variantIdx));
        if (mapping) {
          try {
            const newMat = (await gltf.parser.getDependency("material", mapping.material)) as THREE.Material;
            if (cancelled) return;
            object.material = newMat;
          } catch {
            object.material = ud.originalMaterial;
          }
        } else {
          object.material = ud.originalMaterial;
        }
      }
    };
    apply();
    return () => {
      cancelled = true;
    };
  }, [variantIdx, scene, gltf.parser]);

  useEffect(() => {
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.16;
  });

  return (
    <group ref={ref}>
      <Center>
        <primitive object={scene} scale={1} />
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

function StudioLights({ enableShadows }: { enableShadows: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[4, 6, 4]}
        angle={0.3}
        penumbra={1}
        intensity={2.0}
        castShadow={enableShadows}
        color="#fff8ec"
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-4, 3, -2]} angle={0.4} penumbra={1} intensity={1.0} color="#e63946" />
      <spotLight position={[0, -2, 3]} angle={0.5} penumbra={1} intensity={0.5} color="#ff5a1f" />
    </>
  );
}

/** Detects narrow viewports — mobile gets lower DPR + no shadows for smooth perf. */
function useDeviceTier() {
  const [tier, setTier] = useState<"mobile" | "desktop" | null>(null);
  useEffect(() => {
    const update = () =>
      setTier(window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
    update();
    const mq = window.matchMedia("(max-width: 767px)");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return tier;
}

export function ShoeShowcase() {
  const [variant, setVariant] = useState(0);
  const tier = useDeviceTier();

  // Mobile: lower DPR, no shadows, lighter env. Same composition, just smoother.
  const isMobile = tier === "mobile";
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.6];
  const enableShadows = !isMobile;
  const envIntensity = isMobile ? 0.55 : 0.7;

  return (
    <div className="relative w-full h-full min-h-[100svh]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[28%] h-[55%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center 38%, rgba(230, 57, 70, 0.24), transparent 62%)",
        }}
      />

      {tier === null ? (
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-ink-3 animate-pulse">
            loading…
          </span>
        </div>
      ) : (
        <Canvas
          shadows={enableShadows}
          dpr={dpr}
          camera={{ position: [0, 0, 5], fov: 32 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <StudioLights enableShadows={enableShadows} />
          <Suspense fallback={<LoaderFallback />}>
            <PresentationControls
              global
              polar={[-0.35, 0.35]}
              azimuth={[-Math.PI, Math.PI]}
              speed={1.4}
              zoom={1}
              snap
            >
              {/*
                Bounds auto-fits the camera to its bbox on every resize/aspect change.
                margin=1.15 → shoe fills ~85% of the fitted area (a little BIGGER than before).
                The hidden spacer at y=-1.6 extends the bbox downward, so when Bounds centers
                on the bbox midpoint, the visible shoe (at y=0) sits in the UPPER half of the
                viewport — "a little above" center. Same composition on every screen size.
              */}
              <Bounds fit clip observe margin={1.15}>
                <Float floatIntensity={0.22} rotationIntensity={0.1} speed={1.3}>
                  <group rotation={[0, Math.PI * 0.22, 0]}>
                    <Shoe variantIdx={variant} />
                  </group>
                </Float>
                {/* invisible spacer — shifts apparent shoe position upward */}
                <mesh position={[0, -1.6, 0]} visible={false}>
                  <boxGeometry args={[0.01, 0.01, 0.01]} />
                </mesh>
              </Bounds>
            </PresentationControls>
            {enableShadows && (
              <ContactShadows
                position={[0, -1.05, 0]}
                opacity={0.6}
                scale={8}
                blur={2.4}
                far={2}
                resolution={1024}
                color="#000"
              />
            )}
            <Environment preset="studio" environmentIntensity={envIntensity} />
          </Suspense>
        </Canvas>
      )}

      {/* Variant swatch picker — works on all devices */}
      <div className="absolute bottom-[170px] sm:bottom-[200px] left-1/2 -translate-x-1/2 flex items-center gap-3 bg-bg-2/85 backdrop-blur-md border border-line px-4 py-2.5 rounded-full z-30">
        {VARIANTS.map((v, i) => (
          <button
            key={v.label}
            onClick={() => setVariant(i)}
            className="group flex items-center gap-2 cursor-pointer"
            aria-label={`switch to ${v.label} colourway`}
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
              className={`hidden sm:inline font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors ${
                variant === i ? "text-ink" : "text-ink-3 group-hover:text-ink-2"
              }`}
            >
              {v.label}
            </span>
          </button>
        ))}
      </div>

      <div className="hidden md:block absolute top-28 right-8 font-mono text-[10px] tracking-[0.28em] uppercase text-ink-3 z-30 pointer-events-none">
        drag to rotate
      </div>
    </div>
  );
}
