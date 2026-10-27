"use client";

import React, { useMemo, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Environment,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { FabricOption, DimensionOption, ProductItem } from "@/lib/graphql";
import { Box, RotateCcw, Image as ImageIcon, Sparkles, RefreshCw } from "lucide-react";
import Image from "next/image";

interface Sofa3DViewerProps {
  fabric: FabricOption;
  dimension: DimensionOption;
  product: ProductItem;
  onSwitchTo2D: () => void;
}

// Convert hex to slightly lighter color for Velvet sheen effect
function getSheenColor(hex: string): string {
  try {
    const col = new THREE.Color(hex);
    col.offsetHSL(0, -0.05, 0.2);
    return `#${col.getHexString()}`;
  } catch {
    return "#FFFFFF";
  }
}

// -------------------------------------------------------------
// PBR MATERIALS FOR R3F MESHES
// -------------------------------------------------------------
function SofaMaterial({ fabric }: { fabric: FabricOption }) {
  const typeStr = (fabric?.type || "").toLowerCase();
  const nameStr = (fabric?.name || "").toLowerCase();
  const baseColor = fabric?.hex || "#E1D7D2";

  const isLeather =
    typeStr.includes("da") ||
    nameStr.includes("da") ||
    typeStr.includes("nappa") ||
    nameStr.includes("nappa");

  const isVelvet =
    typeStr.includes("nhung") ||
    nameStr.includes("nhung") ||
    typeStr.includes("velvet") ||
    nameStr.includes("velvet");

  if (isLeather) {
    return (
      <meshPhysicalMaterial
        color={baseColor}
        roughness={0.28}
        metalness={0.05}
        clearcoat={0.3}
        clearcoatRoughness={0.25}
      />
    );
  }

  if (isVelvet) {
    return (
      <meshPhysicalMaterial
        color={baseColor}
        roughness={0.65}
        metalness={0.0}
        sheen={1.0}
        sheenColor={getSheenColor(baseColor)}
        sheenRoughness={0.5}
      />
    );
  }

  // Default: Bouclé or Linen
  return (
    <meshPhysicalMaterial
      color={baseColor}
      roughness={0.9}
      metalness={0.0}
      sheen={0.8}
      sheenColor={getSheenColor(baseColor)}
      sheenRoughness={0.8}
    />
  );
}

function AccentMaterial({ fabric }: { fabric: FabricOption }) {
  const isLight = ["#F8F2EF", "#DEE6EC", "#C8D7E1", "#E1D7D2"].includes(
    (fabric?.hex || "").toUpperCase()
  );
  const accentHex = isLight ? "#4C637C" : "#CEB88E";
  return (
    <meshPhysicalMaterial
      color={accentHex}
      roughness={0.7}
      metalness={0.05}
      sheen={0.6}
      sheenColor="#FFFFFF"
    />
  );
}

// -------------------------------------------------------------
// OPTIONAL GLTF/GLB MODEL LOADER (useGLTF)
// -------------------------------------------------------------
function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return <primitive object={cloned} position={[0, -0.4, 0]} />;
}

// -------------------------------------------------------------
// 1. MILANO MODULAR SOFA MESH (Low-profile, Square Modules, Chaise Lounge)
// -------------------------------------------------------------
function Milano3DMesh({
  fabric,
  isLShape,
  isGrand,
}: {
  fabric: FabricOption;
  isLShape: boolean;
  isGrand: boolean;
}) {
  const baseWidth = isGrand ? 3.3 : 2.8;
  const moduleW = isGrand ? 1.0 : 0.85;

  return (
    <group position={[isLShape ? -0.22 : 0, -0.46, 0]}>
      {/* Low Recessed Shadow Plinth Base (Sát sàn) */}
      <mesh position={[0, -0.02, isLShape ? 0.35 : 0]}>
        <boxGeometry args={[baseWidth + 0.1, 0.05, isLShape ? 1.6 : 0.95]} />
        <meshStandardMaterial color="#14181E" roughness={0.7} />
      </mesh>

      {/* Main Base Platform */}
      <RoundedBox
        args={[baseWidth, 0.16, 0.96]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.06, 0]}
        castShadow
        receiveShadow
      >
        <SofaMaterial fabric={fabric} />
      </RoundedBox>

      {/* L-Shape Extended Modular Base */}
      {isLShape && (
        <RoundedBox
          args={[moduleW + 0.08, 0.16, 0.9]}
          radius={0.03}
          smoothness={4}
          position={[baseWidth / 2 - (moduleW + 0.08) / 2, 0.06, 0.88]}
          castShadow
          receiveShadow
        >
          <SofaMaterial fabric={fabric} />
        </RoundedBox>
      )}

      {/* Modular Low Deep Seat Cushions */}
      <group position={[0, 0.22, 0.04]}>
        {/* Module 1 (Left) */}
        <RoundedBox
          args={[moduleW, 0.2, 0.84]}
          radius={0.05}
          smoothness={4}
          position={[-moduleW, 0, 0]}
          castShadow
        >
          <SofaMaterial fabric={fabric} />
        </RoundedBox>

        {/* Module 2 (Center) */}
        <RoundedBox
          args={[moduleW, 0.2, 0.84]}
          radius={0.05}
          smoothness={4}
          position={[0, 0, 0]}
          castShadow
        >
          <SofaMaterial fabric={fabric} />
        </RoundedBox>

        {/* Module 3 (Right) */}
        <RoundedBox
          args={[moduleW, 0.2, 0.84]}
          radius={0.05}
          smoothness={4}
          position={[moduleW, 0, 0]}
          castShadow
        >
          <SofaMaterial fabric={fabric} />
        </RoundedBox>

        {/* Extended Chaise Lounge Module for L-Shape */}
        {isLShape && (
          <RoundedBox
            args={[moduleW, 0.2, 0.9]}
            radius={0.05}
            smoothness={4}
            position={[moduleW, 0, 0.82]}
            castShadow
          >
            <SofaMaterial fabric={fabric} />
          </RoundedBox>
        )}
      </group>

      {/* Low Broad Modular Backrest */}
      <RoundedBox
        args={[baseWidth, 0.44, 0.22]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.36, -0.37]}
        castShadow
      >
        <SofaMaterial fabric={fabric} />
      </RoundedBox>

      {/* Plush Backrest Cushions */}
      <group position={[0, 0.44, -0.24]}>
        <RoundedBox args={[moduleW - 0.04, 0.34, 0.16]} radius={0.06} smoothness={4} position={[-moduleW, 0, 0]} castShadow>
          <SofaMaterial fabric={fabric} />
        </RoundedBox>
        <RoundedBox args={[moduleW - 0.04, 0.34, 0.16]} radius={0.06} smoothness={4} position={[0, 0, 0]} castShadow>
          <SofaMaterial fabric={fabric} />
        </RoundedBox>
        <RoundedBox args={[moduleW - 0.04, 0.34, 0.16]} radius={0.06} smoothness={4} position={[moduleW, 0, 0]} castShadow>
          <SofaMaterial fabric={fabric} />
        </RoundedBox>
      </group>

      {/* Wide Squared Armrests (Low Italian Profile) */}
      <RoundedBox
        args={[0.26, 0.38, 0.94]}
        radius={0.05}
        smoothness={4}
        position={[-baseWidth / 2 - 0.11, 0.23, 0.01]}
        castShadow
      >
        <SofaMaterial fabric={fabric} />
      </RoundedBox>

      <RoundedBox
        args={[0.26, 0.38, isLShape ? 1.78 : 0.94]}
        radius={0.05}
        smoothness={4}
        position={[baseWidth / 2 + 0.11, 0.23, isLShape ? 0.43 : 0.01]}
        castShadow
      >
        <SofaMaterial fabric={fabric} />
      </RoundedBox>

      {/* Modular Throw Pillows in Matching Fabric */}
      <group position={[-baseWidth / 2 + 0.24, 0.38, -0.02]} rotation={[0.08, 0.3, -0.1]}>
        <RoundedBox args={[0.34, 0.34, 0.12]} radius={0.05} smoothness={4} castShadow>
          <AccentMaterial fabric={fabric} />
        </RoundedBox>
      </group>
      {isLShape && (
        <group position={[baseWidth / 2 - 0.16, 0.38, 0.85]} rotation={[0.1, -0.3, 0.15]}>
          <RoundedBox args={[0.34, 0.34, 0.12]} radius={0.05} smoothness={4} castShadow>
            <AccentMaterial fabric={fabric} />
          </RoundedBox>
        </group>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// 2. NORDIC BOUCLÉ LOUNGE SOFA MESH (Curved Kidney Bean / Hạt Đậu Điêu Khắc)
// -------------------------------------------------------------
function Nordic3DMesh({ fabric }: { fabric: FabricOption }) {
  // 1. Procedural 2D Kidney Bean Seat Shape (Organic curved profile)
  const seatGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.4, -0.2);
    shape.bezierCurveTo(-1.6, 0.22, -1.2, 0.48, -0.7, 0.42);
    shape.bezierCurveTo(-0.2, 0.37, 0.2, 0.28, 0.7, 0.38);
    shape.bezierCurveTo(1.3, 0.48, 1.62, 0.15, 1.4, -0.2);
    shape.bezierCurveTo(1.2, -0.68, 0.4, -0.82, 0.0, -0.82);
    shape.bezierCurveTo(-0.5, -0.82, -1.1, -0.68, -1.4, -0.2);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelSegments: 10,
      curveSegments: 36,
    });
    geom.computeVertexNormals();
    geom.rotateX(Math.PI / 2);
    return geom;
  }, []);

  // 2. Procedural Sweeping Curved Backrest Shape
  const backrestGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.32, -0.15);
    shape.bezierCurveTo(-0.85, -0.58, 0.85, -0.58, 1.32, -0.15);
    shape.bezierCurveTo(1.42, -0.28, 1.28, -0.48, 1.12, -0.6);
    shape.bezierCurveTo(0.6, -0.92, -0.6, -0.92, -1.12, -0.6);
    shape.bezierCurveTo(-1.28, -0.48, -1.42, -0.28, -1.32, -0.15);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.44,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 10,
      curveSegments: 36,
    });
    geom.computeVertexNormals();
    geom.rotateX(Math.PI / 2);
    return geom;
  }, []);

  return (
    <group position={[0, -0.38, 0.1]}>
      {/* Low Scandinavian Rounded Wood Glides (Chạm sát sàn) */}
      <mesh position={[-1.1, -0.18, 0.1]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.09, 20]} />
        <meshStandardMaterial color="#D7B58B" roughness={0.5} />
      </mesh>
      <mesh position={[1.1, -0.18, 0.1]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.09, 20]} />
        <meshStandardMaterial color="#D7B58B" roughness={0.5} />
      </mesh>
      <mesh position={[-0.8, -0.18, -0.5]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.09, 20]} />
        <meshStandardMaterial color="#D7B58B" roughness={0.5} />
      </mesh>
      <mesh position={[0.8, -0.18, -0.5]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.09, 20]} />
        <meshStandardMaterial color="#D7B58B" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.18, -0.6]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.09, 20]} />
        <meshStandardMaterial color="#D7B58B" roughness={0.5} />
      </mesh>

      {/* Monolithic Curved Kidney Bean Seat Cushion */}
      <mesh geometry={seatGeometry} position={[0, 0.04, 0]} castShadow receiveShadow>
        <SofaMaterial fabric={fabric} />
      </mesh>

      {/* Soft Sweeping Curved Backrest Wall */}
      <mesh geometry={backrestGeometry} position={[0, 0.46, 0.04]} castShadow receiveShadow>
        <SofaMaterial fabric={fabric} />
      </mesh>

      {/* Nordic Organic Round Bolster Pillow (Gối tròn hữu cơ đồng điệu) */}
      <group position={[0.65, 0.34, 0.02]} rotation={[0.15, -0.4, 0.2]}>
        <mesh castShadow>
          <sphereGeometry args={[0.2, 32, 24]} />
          <AccentMaterial fabric={fabric} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 3. VERONA COGNAC LEATHER SOFA MESH (Mid-Century, Slim Brass Legs, Tailored Leather)
// -------------------------------------------------------------
function Verona3DMesh({
  fabric,
  isGrand,
}: {
  fabric: FabricOption;
  isGrand: boolean;
}) {
  const baseW = isGrand ? 3.2 : 2.6;
  const seatW = isGrand ? 0.94 : 0.76;

  return (
    <group position={[0, -0.46, 0]}>
      {/* 4 Slim Tapered Brass Legs (Chân đồng thau xước mờ cao ráo) */}
      <group position={[-baseW / 2 + 0.14, -0.06, 0.38]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.028, 0.015, 0.24, 20]} />
          <meshPhysicalMaterial color="#D4AF37" roughness={0.25} metalness={0.9} clearcoat={0.3} />
        </mesh>
      </group>
      <group position={[baseW / 2 - 0.14, -0.06, 0.38]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.028, 0.015, 0.24, 20]} />
          <meshPhysicalMaterial color="#D4AF37" roughness={0.25} metalness={0.9} clearcoat={0.3} />
        </mesh>
      </group>
      <group position={[-baseW / 2 + 0.14, -0.06, -0.38]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.028, 0.015, 0.24, 20]} />
          <meshPhysicalMaterial color="#D4AF37" roughness={0.25} metalness={0.9} clearcoat={0.3} />
        </mesh>
      </group>
      <group position={[baseW / 2 - 0.14, -0.06, -0.38]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.028, 0.015, 0.24, 20]} />
          <meshPhysicalMaterial color="#D4AF37" roughness={0.25} metalness={0.9} clearcoat={0.3} />
        </mesh>
      </group>

      {/* Slim Under-Plinth Bar */}
      <RoundedBox args={[baseW, 0.1, 0.86]} radius={0.02} smoothness={4} position={[0, 0.08, 0]} castShadow>
        <SofaMaterial fabric={fabric} />
      </RoundedBox>

      {/* 3 Tailored Seat Cushions (Đệm da sắc sảo Mid-Century) */}
      <group position={[0, 0.22, 0.03]}>
        <RoundedBox args={[seatW, 0.17, 0.74]} radius={0.04} smoothness={4} position={[-seatW, 0, 0]} castShadow>
          <SofaMaterial fabric={fabric} />
        </RoundedBox>
        <RoundedBox args={[seatW, 0.17, 0.74]} radius={0.04} smoothness={4} position={[0, 0, 0]} castShadow>
          <SofaMaterial fabric={fabric} />
        </RoundedBox>
        <RoundedBox args={[seatW, 0.17, 0.74]} radius={0.04} smoothness={4} position={[seatW, 0, 0]} castShadow>
          <SofaMaterial fabric={fabric} />
        </RoundedBox>
      </group>

      {/* Elegant Vertical Backrest */}
      <RoundedBox args={[baseW, 0.48, 0.16]} radius={0.04} smoothness={4} position={[0, 0.42, -0.38]} castShadow>
        <SofaMaterial fabric={fabric} />
      </RoundedBox>

      {/* 3 Tailored Backrest Cushions (Nghiêng nhẹ) */}
      <group position={[0, 0.48, -0.27]}>
        <group position={[-seatW, 0, 0]} rotation={[-0.1, 0, 0]}>
          <RoundedBox args={[seatW - 0.04, 0.38, 0.15]} radius={0.05} smoothness={4} castShadow>
            <SofaMaterial fabric={fabric} />
          </RoundedBox>
        </group>
        <group position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
          <RoundedBox args={[seatW - 0.04, 0.38, 0.15]} radius={0.05} smoothness={4} castShadow>
            <SofaMaterial fabric={fabric} />
          </RoundedBox>
        </group>
        <group position={[seatW, 0, 0]} rotation={[-0.1, 0, 0]}>
          <RoundedBox args={[seatW - 0.04, 0.38, 0.15]} radius={0.05} smoothness={4} castShadow>
            <SofaMaterial fabric={fabric} />
          </RoundedBox>
        </group>
      </group>

      {/* Slim Tailored Vertical Armrests */}
      <RoundedBox
        args={[0.16, 0.46, 0.86]}
        radius={0.04}
        smoothness={4}
        position={[-baseW / 2 - 0.08, 0.28, 0.03]}
        castShadow
      >
        <SofaMaterial fabric={fabric} />
      </RoundedBox>
      <RoundedBox
        args={[0.16, 0.46, 0.86]}
        radius={0.04}
        smoothness={4}
        position={[baseW / 2 + 0.08, 0.28, 0.03]}
        castShadow
      >
        <SofaMaterial fabric={fabric} />
      </RoundedBox>

      {/* Leather Side Bolster Pillows */}
      <group position={[-baseW / 2 + 0.2, 0.34, 0.02]} rotation={[0.08, 0.2, -0.15]}>
        <RoundedBox args={[0.3, 0.3, 0.12]} radius={0.04} smoothness={4} castShadow>
          <AccentMaterial fabric={fabric} />
        </RoundedBox>
      </group>
      <group position={[baseW / 2 - 0.2, 0.34, 0.02]} rotation={[0.08, -0.2, 0.15]}>
        <RoundedBox args={[0.3, 0.3, 0.12]} radius={0.04} smoothness={4} castShadow>
          <AccentMaterial fabric={fabric} />
        </RoundedBox>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// MAIN PROCEDURAL SOFA DISPATCHER
// -------------------------------------------------------------
function ProceduralSofa({
  fabric,
  dimension,
  product,
}: {
  fabric: FabricOption;
  dimension: DimensionOption;
  product: ProductItem;
}) {
  const slug = (product?.slug || "").toLowerCase();
  const dimStr = (dimension?.size || "").toLowerCase();

  const isLShape = useMemo(() => {
    return (
      dimStr.includes("chữ l") ||
      dimStr.includes("góc l") ||
      dimStr.includes("3.2m") ||
      dimStr.includes("3.8m") ||
      slug.includes("milano")
    );
  }, [dimStr, slug]);

  const isGrand = useMemo(() => {
    return dimStr.includes("3.8m") || dimStr.includes("4.0m") || dimStr.includes("3.4m");
  }, [dimStr]);

  // Dispatch appropriate 3D model based on product slug/id
  if (slug.includes("nordic")) {
    return <Nordic3DMesh fabric={fabric} />;
  }

  if (slug.includes("verona")) {
    return <Verona3DMesh fabric={fabric} isGrand={isGrand} />;
  }

  // Default: Milano Modular
  return (
    <Milano3DMesh
      fabric={fabric}
      isLShape={isLShape}
      isGrand={isGrand}
    />
  );
}

// -------------------------------------------------------------
// SOFA 3D VIEWER EXPORT WITH GLB & FALLBACK PLACEHOLDER
// -------------------------------------------------------------
export default function Sofa3DViewer({
  fabric,
  dimension,
  product,
  onSwitchTo2D,
}: Sofa3DViewerProps) {
  // If product explicitly does not have 3D model, start in fallback mode unless user previews mesh
  const [previewMeshMode, setPreviewMeshMode] = useState(product?.has3DModel !== false);
  const showFallback = product?.has3DModel === false && !previewMeshMode;

  return (
    <div className="w-full h-full relative select-none overflow-hidden">
      {/* ================= FALLBACK 3D PLACEHOLDER STATE ================= */}
      {showFallback ? (
        <div className="w-full h-full relative flex items-center justify-center p-6 text-center">
          {/* Background Blurred 2D Sofa Image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={fabric.image || product.featuredImage}
              alt={product.name}
              fill
              className="object-cover blur-md scale-110 opacity-40 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E252D]/95 via-[#1E252D]/80 to-[#1E252D]/85 backdrop-blur-xl" />
          </div>

          {/* Luxury Atelier Glassmorphic Card */}
          <div className="relative z-10 max-w-md p-8 rounded-3xl bg-[#F8F2EF]/[0.08] border border-[#CEB88E]/30 shadow-2xl backdrop-blur-md">
            {/* Fine-line 3D Cube Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#DEE6EC]/10 border border-[#CEB88E]/40 flex items-center justify-center shadow-2xl relative mx-auto mb-5">
              <Box className="w-8 h-8 text-[#CEB88E] stroke-[1.2]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CEB88E] rounded-full animate-ping" />
            </div>

            {/* Title & Description */}
            <h3 className="font-serif text-xl sm:text-2xl text-[#F8F2EF] font-medium leading-snug mb-2.5">
              Chưa tải được mô hình 3D tương ứng
            </h3>
            <p className="text-xs sm:text-sm text-[#DEE6EC]/85 font-light leading-relaxed mb-7 max-w-sm mx-auto">
              Bản dựng 3D điêu khắc hữu cơ (GLTF/GLB) chuẩn tỷ lệ 1:1 cho mẫu ghế này đang được đồng bộ từ Atelier Studio.
            </p>

            {/* 2 Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="btn-fallback-back-2d"
                type="button"
                onClick={onSwitchTo2D}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#F8F2EF] text-[#1E252D] text-xs font-semibold tracking-wider uppercase hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#4C637C]" />
                <span>Quay lại Ảnh Studio (2D)</span>
              </button>

              <button
                id="btn-fallback-preview-mesh"
                type="button"
                onClick={() => setPreviewMeshMode(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#4C637C] text-[#F8F2EF] text-xs font-semibold tracking-wider uppercase hover:bg-[#3A4E63] transition-all border border-[#CEB88E]/40 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#CEB88E]" />
                <span>Xem thử Phiên bản 3D Dựng Khung (Preview Mesh)</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= 3D CANVAS VIEWPORT ================= */
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
          {/* Top Info Banner for Preview Mesh */}
          <div className="absolute top-16 left-4 z-10 flex items-center gap-2">
            <button
              id="btn-toggle-mesh-report"
              type="button"
              onClick={() => setPreviewMeshMode(false)}
              className="px-3 py-1 rounded-full bg-[#1E252D]/85 backdrop-blur-md text-[#DEE6EC] hover:text-white border border-[#CEB88E]/30 text-[10px] tracking-wider uppercase flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
              title="Nhấn để xem trạng thái đồng bộ GLTF/GLB"
            >
              <RefreshCw className="w-3 h-3 text-[#CEB88E]" />
              <span>Bản Preview Mesh • Xem Báo Cáo</span>
            </button>
          </div>

          <Canvas
            camera={{ position: [2.8, 2.0, 3.4], fov: 42 }}
            shadows
            gl={{
              antialias: true,
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
              powerPreference: "high-performance",
            }}
            dpr={[1, 2]}
          >
            {/* Studio Ambient & Directional Lighting */}
            <ambientLight intensity={0.65} color="#FAF7F5" />
            <directionalLight
              position={[4, 6, 4]}
              intensity={1.2}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
            <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#DEE6EC" />
            <directionalLight position={[0, 4, -4]} intensity={0.4} color="#FFF8F0" />

            {/* Self-contained Zero-latency Studio Environment Map */}
            <Environment background={false}>
              <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 12]} />
                <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
              </mesh>
              <mesh position={[6, 4, 3]} rotation={[0, -Math.PI / 2.5, 0]}>
                <planeGeometry args={[8, 8]} />
                <meshBasicMaterial color="#FFF6EA" toneMapped={false} />
              </mesh>
              <mesh position={[-6, 3, -2]} rotation={[0, Math.PI / 2.5, 0]}>
                <planeGeometry args={[8, 8]} />
                <meshBasicMaterial color="#EBF3FA" toneMapped={false} />
              </mesh>
              <mesh position={[0, 4, -6]}>
                <planeGeometry args={[10, 6]} />
                <meshBasicMaterial color="#FFE8C4" toneMapped={false} />
              </mesh>
            </Environment>

            {/* GLB Loader or Procedural Mesh */}
            <Suspense fallback={null}>
              {product.model3dUrl ? (
                <GLBModel url={product.model3dUrl} />
              ) : (
                <ProceduralSofa
                  fabric={fabric}
                  dimension={dimension}
                  product={product}
                />
              )}
            </Suspense>

            {/* Realistic Studio Floor Contact Shadows */}
            <ContactShadows
              position={[0, -0.76, 0]}
              opacity={0.48}
              scale={9}
              blur={2.0}
              far={3.5}
              color="#1E252D"
            />

            {/* Smooth OrbitControls with Safe Tilt Angles */}
            <OrbitControls
              makeDefault
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.8}
              minDistance={2.4}
              maxDistance={5.5}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.05}
            />
          </Canvas>
        </div>
      )}
    </div>
  );
}
