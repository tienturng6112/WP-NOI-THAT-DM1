"use client";

import React, { useState, useEffect, useRef, MouseEvent, Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ProductItem, FabricOption, DimensionOption } from "@/lib/graphql";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Sparkles,
  ShieldCheck,
  Truck,
  Layers,
  Ruler,
  ChevronDown,
  ShoppingBag,
  Package,
  ZoomIn,
  Send,
  Box,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";

// Luxury 3D Loading Skeleton
function Sofa3DLoadingSkeleton() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1E252D]/10 backdrop-blur-md relative overflow-hidden select-none">
      <div className="w-16 h-16 rounded-2xl bg-[#F8F2EF] border border-[#CEB88E]/40 flex items-center justify-center shadow-xl relative mb-4">
        <Box className="w-8 h-8 text-[#4C637C] animate-bounce" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CEB88E] rounded-full animate-ping" />
      </div>
      <p className="font-serif text-base text-[#1E252D] font-medium tracking-wide">
        Đang khởi tạo không gian 3D Studio...
      </p>
      <p className="text-[11px] text-[#5F6872] mt-1 font-mono tracking-wider uppercase">
        Three.js PBR Shaders • 60 FPS
      </p>
      <div className="w-48 h-1 bg-[#4C637C]/20 rounded-full overflow-hidden mt-3">
        <div className="w-full h-full bg-gradient-to-r from-[#4C637C] via-[#CEB88E] to-[#4C637C] animate-pulse" />
      </div>
    </div>
  );
}

// Dynamic Client-Only R3F 3D Configurator
const Sofa3DViewer = dynamic(() => import("@/components/Sofa3DViewer"), {
  ssr: false,
  loading: () => <Sofa3DLoadingSkeleton />,
});

interface ProductDetailProps {
  product: ProductItem;
  products?: ProductItem[];
  selectedIndex?: number;
  onSelectProduct?: (index: number) => void;
  onAddToCart: (item: {
    product: ProductItem;
    selectedFabric: FabricOption;
    selectedDimension: DimensionOption;
  }) => void;
  onOpenConsult: () => void;
}

export default function ProductDetail({
  product,
  products = [],
  selectedIndex = 0,
  onSelectProduct,
  onAddToCart,
  onOpenConsult,
}: ProductDetailProps) {
  const [selectedFabricIdx, setSelectedFabricIdx] = useState(0);
  const [selectedDimensionIdx, setSelectedDimensionIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Reset selections when product changes
  useEffect(() => {
    setSelectedFabricIdx(0);
    setSelectedDimensionIdx(0);
  }, [product.slug]);

  // Active selections - dynamically update currentImage to match chosen fabric/material option
  const currentFabric = product.fabrics[selectedFabricIdx] || product.fabrics[0];
  const currentDimension = product.dimensions[selectedDimensionIdx] || product.dimensions[0];
  const currentImage = currentFabric?.image || product.featuredImage;

  // Interactive Lens Zoom calculation
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleAddClick = () => {
    onAddToCart({
      product,
      selectedFabric: currentFabric,
      selectedDimension: currentDimension,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  return (
    <section id="customizer" className="scroll-mt-24 py-16 lg:py-24 bg-[#F8F2EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN: IMAGERY & INTERACTIVE ZOOM ================= */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 self-start space-y-5">
            {/* Main Interactive Showcase (2D Photography or 3D Interactive Configurator) */}
            <div
              ref={imageContainerRef}
              onMouseEnter={() => {
                if (viewMode === "2d") setIsZooming(true);
              }}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#1E252D]/5 border border-[#4C637C]/[0.1] shadow-xl shadow-[#4C637C]/[0.05] group"
            >
              {/* ================= VIEW MODE TOGGLE (Ảnh 2D vs 3D 360°) ================= */}
              <div className="absolute top-4 right-4 z-20 flex items-center p-1 rounded-full bg-[#1E252D]/85 backdrop-blur-md border border-[#CEB88E]/40 shadow-xl">
                <button
                  id="toggle-view-2d"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("2d");
                    setIsZooming(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "2d"
                      ? "bg-[#F8F2EF] text-[#1E252D] font-semibold shadow-sm"
                      : "text-[#DEE6EC]/80 hover:text-[#F8F2EF]"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#4C637C]" />
                  <span>Ảnh Studio (2D)</span>
                </button>

                <button
                  id="toggle-view-3d"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("3d");
                    setIsZooming(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer relative ${
                    viewMode === "3d"
                      ? "bg-[#4C637C] text-[#F8F2EF] font-semibold shadow-md ring-1 ring-[#CEB88E]/60"
                      : "text-[#DEE6EC]/80 hover:text-[#F8F2EF]"
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[#CEB88E]" />
                  <span>Mô Phỏng 3D (360°)</span>
                  <span className="w-2 h-2 rounded-full bg-[#CEB88E] animate-pulse" />
                </button>
              </div>

              {/* MODE 1: 2D High-Resolution Studio Photography */}
              {viewMode === "2d" ? (
                <div className="w-full h-full relative cursor-crosshair">
                  {/* Direct Fast Cross-fade Without Blank Flash */}
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={`${product.slug}-${currentFabric.name}`}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={currentImage}
                        alt={`${product.name} - ${currentFabric.name}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                        className={`object-cover transition-transform duration-500 ${
                          isZooming ? "scale-105" : "scale-100"
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Magnifying Lens Zoom Preview Overlay */}
                  {isZooming && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-200 hidden md:block"
                      style={{
                        backgroundImage: `url('${currentImage}')`,
                        backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                        backgroundSize: "260%",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div className="absolute top-16 right-4 bg-[#1E252D]/85 backdrop-blur-md text-[#F8F2EF] text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-[#CEB88E]/30">
                        <ZoomIn className="w-3 h-3 text-[#CEB88E]" /> Kính Lúp Vân Vải 2.6x
                      </div>
                    </div>
                  )}

                  {/* Floating Luxury Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F2EF]/90 backdrop-blur-md text-[#1E252D] text-[10px] font-semibold tracking-[0.1em] uppercase border border-[#4C637C]/15 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#CEB88E]" /> Chế Tác Thủ Công Ý
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E252D]/85 backdrop-blur-md text-[#F8F2EF] text-[10px] font-medium tracking-[0.1em] uppercase shadow-sm">
                      <ShieldCheck className="w-3 h-3 text-[#CEB88E]" /> Khung Sồi Bảo Hành 10 Năm
                    </span>
                  </div>
                </div>
              ) : (
                /* MODE 2: 3D Interactive WebGL Configurator */
                <div className="w-full h-full relative bg-gradient-to-b from-[#F8F2EF] to-[#DEE6EC]/50">
                  <Sofa3DViewer
                    fabric={currentFabric}
                    dimension={currentDimension}
                    product={product}
                    onSwitchTo2D={() => setViewMode("2d")}
                  />

                  {/* Floating 3D Badge on Top Left */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F2EF]/90 backdrop-blur-md text-[#1E252D] text-[10px] font-semibold tracking-[0.1em] uppercase border border-[#4C637C]/15 shadow-sm">
                      <Box className="w-3 h-3 text-[#CEB88E]" /> WebGL PBR Shaders
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E252D]/85 backdrop-blur-md text-[#F8F2EF] text-[10px] font-medium tracking-[0.1em] uppercase shadow-sm">
                      <RotateCcw className="w-3 h-3 text-[#CEB88E]" /> Tương Tác 360° Đa Chiều
                    </span>
                  </div>

                  {/* Bottom Right 3D Interaction Guide Helper */}
                  <div className="absolute bottom-4 right-4 z-10 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#1E252D]/85 backdrop-blur-md text-[#F8F2EF] text-[10px] sm:text-xs font-medium border border-white/10 shadow-lg flex items-center gap-2 pointer-events-none">
                    <RotateCcw className="w-3.5 h-3.5 text-[#CEB88E] animate-spin [animation-duration:8s]" />
                    <span>Giữ chuột trái để xoay 360° • Cuộn để phóng to</span>
                  </div>
                </div>
              )}

              {/* Current Active Fabric Watermark Pill (Visible in both 2D & 3D modes) */}
              <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#F8F2EF]/95 backdrop-blur-md text-[#1E252D] text-xs font-medium border border-[#4C637C]/15 flex items-center gap-2 shadow-md pointer-events-none">
                <span
                  className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: currentFabric.hex }}
                />
                <span className="font-serif italic">{currentFabric.name}</span>
                <span className="text-[10px] text-[#4C637C] font-sans border-l border-[#4C637C]/20 pl-2 hidden sm:inline font-normal">
                  {currentFabric.type}
                </span>
              </div>
            </div>

            {/* 3 Master Sofas Synchronized Carousel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold uppercase tracking-wider text-[#1E252D] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#CEB88E]" />
                  <span>3 Tác Phẩm Sofa Chủ Đạo:</span>
                </span>
                <span className="text-[#4C637C] font-semibold">
                  Đang xem: #{selectedIndex + 1} — {product.name}
                </span>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {(products.length > 0 ? products : [product]).map((p, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={p.id || idx}
                      onClick={() => onSelectProduct?.(idx)}
                      className={`relative w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer group ${
                        isSelected
                          ? "border-[#4C637C] ring-2 ring-[#4C637C]/30 scale-105 shadow-md"
                          : "border-transparent hover:border-[#4C637C]/40 hover:scale-105 shadow-sm"
                      }`}
                      title={`Tác phẩm #${idx + 1}: ${p.name}`}
                    >
                      <Image
                        src={p.featuredImage}
                        alt={p.name}
                        fill
                        sizes="120px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span
                        className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider backdrop-blur-md ${
                          isSelected ? "bg-[#4C637C] text-[#F8F2EF]" : "bg-black/60 text-white"
                        }`}
                      >
                        #{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#DEE6EC]/60 border border-[#4C637C]/[0.08] text-xs text-[#1E252D]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#4C637C] shrink-0" />
                <span className="font-medium text-[11px] leading-tight">Giao &amp; Lắp đặt VIP tại nhà</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#4C637C] shrink-0" />
                <span className="font-medium text-[11px] leading-tight">Đệm lông vũ 70% êm ái</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#4C637C] shrink-0" />
                <span className="font-medium text-[11px] leading-tight">Gửi mẫu vải miễn phí</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: CUSTOMIZATION & CONFIGURATOR ================= */}
          <div className="lg:col-span-5 space-y-7">
            {/* Header Titles */}
            <div className="border-b border-[#4C637C]/[0.1] pb-6">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4C637C] block mb-2">
                ATELIER BESPOKE COLLECTION • 2026
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1E252D] font-normal leading-tight mb-3">
                {product.name}
              </h1>
              <p className="font-serif italic text-[#5F6872] text-sm leading-relaxed mb-4">
                &ldquo;{product.tagline}&rdquo;
              </p>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-3xl sm:text-4xl font-semibold text-[#1E252D] tracking-tight">
                  {currentDimension.priceFormatted}
                </span>
                <span className="text-xs text-[#5F6872] uppercase tracking-wider font-light">
                  (Đã bao gồm VAT &amp; Lắp đặt)
                </span>
              </div>
            </div>

            {/* 1. FABRIC SWATCHES SELECTOR (Chất liệu bọc) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-[0.12em] uppercase text-[#1E252D] flex items-center gap-2">
                  <span>1. Chọn Chất Liệu Bọc:</span>
                  <span className="font-serif italic font-normal text-[#4C637C] normal-case text-sm">
                    {currentFabric.name}
                  </span>
                </label>
                <span className="text-[11px] text-[#5F6872] font-light">
                  {product.fabrics.length} dòng vải/da Ý
                </span>
              </div>

              {/* Swatch Pill Circles */}
              <div className="flex flex-wrap gap-3">
                {product.fabrics.map((fabric, idx) => {
                  const isFabricSelected = selectedFabricIdx === idx;
                  const isLightColor = ["#F8F2EF", "#DEE6EC", "#C8D7E1", "#E1D7D2"].includes(fabric.hex.toUpperCase());
                  return (
                    <button
                      key={fabric.name}
                      onClick={() => setSelectedFabricIdx(idx)}
                      title={`${fabric.name} - ${fabric.type}`}
                      className={`group relative p-1 rounded-full transition-all cursor-pointer ${
                        isFabricSelected
                          ? "ring-2 ring-[#4C637C] ring-offset-2 ring-offset-[#F8F2EF] scale-110 shadow-md"
                          : "hover:scale-105 opacity-85 hover:opacity-100"
                      }`}
                    >
                      <span
                        className="w-9 h-9 rounded-full block border border-black/15 shadow-inner transition-transform"
                        style={{ backgroundColor: fabric.hex }}
                      />
                      {isFabricSelected && (
                        <Check
                          className={`w-3.5 h-3.5 absolute inset-0 m-auto drop-shadow-sm ${
                            isLightColor ? "text-[#1E252D]" : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Swatch Sensory Description Card */}
              <div className="p-3.5 rounded-xl bg-[#DEE6EC]/70 border border-[#4C637C]/[0.1] text-xs space-y-1.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#1E252D] flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block border border-black/20 shrink-0"
                      style={{ backgroundColor: currentFabric.hex }}
                    />
                    {currentFabric.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#4C637C] font-semibold bg-[#4C637C]/10 px-2 py-0.5 rounded-md">
                    {currentFabric.type}
                  </span>
                </div>
                <p className="text-[#5F6872] text-[11px] leading-relaxed">
                  {currentFabric.desc}
                </p>
              </div>
            </div>

            {/* 2. CONFIGURATION / DIMENSION SELECTOR (Kích thước & Góc chữ L) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-[0.12em] uppercase text-[#1E252D] flex items-center gap-2">
                  <Ruler className="w-3.5 h-3.5 text-[#4C637C]" />
                  <span>2. Kích Thước &amp; Cấu Hình:</span>
                </label>
                <span className="text-[11px] text-[#4C637C] font-semibold">
                  {currentDimension.dimensions}
                </span>
              </div>

              <div className="space-y-2">
                {product.dimensions.map((dim, idx) => {
                  const isDimSelected = selectedDimensionIdx === idx;
                  return (
                    <button
                      key={dim.size}
                      onClick={() => setSelectedDimensionIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isDimSelected
                          ? "bg-[#F8F2EF] border-[#4C637C] shadow-sm ring-1 ring-[#4C637C]"
                          : "bg-[#DEE6EC]/40 border-transparent hover:border-[#4C637C]/15 hover:bg-[#DEE6EC]/70"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-medium ${
                              isDimSelected ? "text-[#4C637C] font-semibold" : "text-[#1E252D]"
                            }`}
                          >
                            {dim.size}
                          </span>
                          {dim.isPopular && (
                            <span className="px-2 py-0.5 rounded-full bg-[#CEB88E]/25 text-[#1E252D] text-[9px] font-bold uppercase tracking-wider">
                              Ưa chuộng
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#5F6872] block mt-0.5 font-sans">
                          Kích thước phủ bì: {dim.dimensions}
                        </span>
                      </div>
                      <span className="font-semibold text-xs text-[#1E252D] font-sans">
                        {dim.priceFormatted}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. ERGONOMICS & INTERIOR SPECS (Chiều sâu đệm, khung gỗ) */}
            <div className="p-4 rounded-2xl bg-[#E1D7D2]/40 border border-[#4C637C]/[0.1] space-y-2.5 text-xs">
              <span className="font-semibold text-[11px] tracking-[0.1em] uppercase text-[#1E252D] block">
                Thông Số Chế Tác Tiêu Chuẩn:
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#5F6872] block">Chiều Sâu Đệm Ngồi:</span>
                  <span className="font-semibold text-[#1E252D]">{product.specs.depth}</span>
                </div>
                <div>
                  <span className="text-[#5F6872] block">Chiều Cao Ghế Ngồi:</span>
                  <span className="font-semibold text-[#1E252D]">{product.specs.seatHeight}</span>
                </div>
                <div>
                  <span className="text-[#5F6872] block">Lõi Đệm Êm:</span>
                  <span className="font-semibold text-[#1E252D]">{product.specs.cushion}</span>
                </div>
                <div>
                  <span className="text-[#5F6872] block">Khung Xương Mộng Gỗ:</span>
                  <span className="font-semibold text-[#1E252D]">{product.specs.frame}</span>
                </div>
              </div>
            </div>

            {/* ACTION CTA BUTTONS */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddClick}
                className="w-full py-4 px-6 rounded-full bg-[#4C637C] hover:bg-[#3A4E63] text-[#F8F2EF] font-medium text-xs tracking-[0.18em] uppercase transition-all shadow-xl shadow-[#4C637C]/20 border border-[#CEB88E]/30 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#CEB88E]" />
                    <span>ĐÃ THÊM VÀO GIỎ HÀNG CHẾ TÁC!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#CEB88E] group-hover:scale-110 transition-transform" />
                    <span>ĐẶT CHẾ TÁC RIÊNG — {currentDimension.priceFormatted}</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenConsult}
                className="w-full py-3.5 px-6 rounded-full border border-[#4C637C]/25 hover:bg-[#DEE6EC]/50 text-[#1E252D] font-medium text-xs tracking-[0.12em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Package className="w-4 h-4 text-[#4C637C]" />
                <span>Đăng Ký Nhận Hộp Mẫu Vải Tận Nhà (Miễn Phí)</span>
              </button>
            </div>

            {/* LUXURY ACCORDIONS (Craftsmanship, Delivery, Care) */}
            <div className="border-t border-[#4C637C]/10 pt-4 space-y-2">
              {[
                {
                  title: "Đặc Tính Cấu Tạo & Độ Bền Vượt Thời Gian",
                  content:
                    "Khung gỗ sồi Nga tự nhiên được ghép bằng mộng truyền thống không dùng đinh kim loại lỏng lẻo. Hệ thống lò xo túi độc lập kết hợp đệm lông vũ tỷ lệ vàng mang lại độ êm bồng bềnh và không bị xẹp lún sau 10 năm sử dụng.",
                },
                {
                  title: "Quy Trình Chế Tác & Giao Hàng VIP",
                  content:
                    "Thời gian may đo tỉ mỉ từ 3 - 4 tuần. Đội ngũ chuyên gia của Atelier Sofa sẽ vận chuyển nguyên khối, bọc lót chống xước và hỗ trợ bố trí phòng khách hoàn hảo nhất theo yêu cầu gia chủ.",
                },
                {
                  title: "Chăm Sóc & Vệ Sinh Vải / Da Thuộc",
                  content:
                    "Sản phẩm được phủ sẵn lớp Nano Lotus Effect trượt nước. Khi vô tình đổ chất lỏng, chỉ cần dùng khăn sạch thấm nhẹ. Atelier tặng kèm bộ dung dịch bảo dưỡng da và dưỡng sợi vải chuyên dụng cho mỗi đơn hàng.",
                },
              ].map((acc, idx) => (
                <div key={idx} className="border-b border-[#4C637C]/[0.08] pb-2">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                    className="w-full py-2.5 flex items-center justify-between text-left text-xs font-semibold text-[#1E252D] hover:text-[#4C637C] transition-colors cursor-pointer"
                  >
                    <span>{acc.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openAccordion === idx ? "rotate-180 text-[#4C637C]" : "text-[#5F6872]"
                      }`}
                    />
                  </button>
                  {openAccordion === idx && (
                    <p className="text-xs text-[#5F6872] font-light leading-relaxed pb-3 animate-in fade-in duration-200">
                      {acc.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
