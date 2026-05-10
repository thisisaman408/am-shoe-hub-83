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

  // Apply KHR_materials_variants properly via three.js' built-in extension surface.
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

  // Cast / receive shadows
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
      <spotLight position={[-4, 3, -2]} angle={0.4} penumbra={1} intensity={1.0} color="#e63946" />
      <spotLight position={[0, -2, 3]} angle={0.5} penumbra={1} intensity={0.6} color="#ff5a1f" />
    </>
  );
}

function MobileFallback() {
  return (
    <div className="relative w-full h-full grid place-items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[5%] h-[60%]"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(230, 57, 70, 0.30), transparent 65%)",
        }}
      />
      {/* Premium static shoe image. Object-contain so the whole shoe is always visible. */}
      <picture className="block w-full h-full relative">
        <img
          src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&w=1400"
          alt="Shoe Hub 83 — featured kick"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "contrast(1.1) saturate(1.05) brightness(0.95)" }}
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/30 pointer-events-none" />
      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.28em] uppercase text-ink-3 z-10">
        featured drop
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.matchMedia("(max-width: 767px)").matches ||
          // also fallback if device is low-power
          (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency !== undefined &&
            (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency! <= 4 &&
            window.innerWidth <= 900
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function ShoeShowcase() {
  const [variant, setVariant] = useState(0);
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full aspect-square min-h-[420px] sm:min-h-[560px] lg:min-h-[700px]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[6%] h-[60%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(230, 57, 70, 0.20), transparent 60%)",
        }}
      />

      {isMobile === null ? (
        // SSR safe — no render until we know
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-ink-3 animate-pulse">
            loading…
          </span>
        </div>
      ) : isMobile ? (
        <MobileFallback />
      ) : (
        <Canvas
          shadows
          dpr={[1, 1.6]}
          camera={{ position: [0, 1, 5.5], fov: 28 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <StudioLights />
          <Suspense fallback={<LoaderFallback />}>
            <PresentationControls global polar={[-0.35, 0.35]} azimuth={[-Math.PI, Math.PI]} speed={1.4} zoom={1} snap>
              <Float floatIntensity={0.45} rotationIntensity={0.18} speed={1.6}>
                <group rotation={[0, Math.PI * 0.18, 0]}>
                  <Shoe variantIdx={variant} />
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
      )}

      {/* Variant swatch picker — only show if actually 3D */}
      {!isMobile && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-bg-2/85 backdrop-blur-md border border-line px-4 py-2.5 rounded-full z-10">
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
                className={`font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors ${
                  variant === i ? "text-ink" : "text-ink-3 group-hover:text-ink-2"
                }`}
              >
                {v.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {!isMobile && (
        <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.28em] uppercase text-ink-3">
          drag to rotate
        </div>
      )}
    </div>
  );
}
