"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductItem } from "@/lib/graphql";
import { Check, ShieldCheck, Truck, RotateCcw, Sparkles, Zap, Heart } from "lucide-react";

interface ProductDetailProps {
  product: ProductItem;
  onAddToCart: (item: {
    product: ProductItem;
    color: string;
    storage: string;
    priceFormatted: string;
    priceNum: number;
    image: string;
  }) => void;
  onBuyNow: (item: {
    product: ProductItem;
    color: string;
    storage: string;
    priceFormatted: string;
    priceNum: number;
    image: string;
  }) => void;
}

export default function ProductDetail({
  product,
  onAddToCart,
  onBuyNow,
}: ProductDetailProps) {
  // State for selected options
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Reset indices when product changes
  useEffect(() => {
    setSelectedColorIndex(0);
    setSelectedStorageIndex(0);
    setSelectedImageIndex(0);
  }, [product.slug]);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const currentStorage = product.storages[selectedStorageIndex] || product.storages[0];

  // Images list
  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.featuredImage];

  const activeImage = images[selectedImageIndex] || product.featuredImage;

  const handleAddToCart = () => {
    onAddToCart({
      product,
      color: currentColor.name,
      storage: currentStorage.size,
      priceFormatted: currentStorage.priceFormatted,
      priceNum: currentStorage.priceNum,
      image: activeImage,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    onBuyNow({
      product,
      color: currentColor.name,
      storage: currentStorage.size,
      priceFormatted: currentStorage.priceFormatted,
      priceNum: currentStorage.priceNum,
      image: activeImage,
    });
  };

  // Color glow tone based on selected finish
  const colorGlowMap: Record<string, string> = {
    "Titan Tự Nhiên": "rgba(164, 157, 148, 0.25)",
    "Titan Sa Mạc": "rgba(200, 171, 144, 0.28)",
    "Đen Nhám": "rgba(60, 60, 65, 0.35)",
  };
  const glowColor = colorGlowMap[currentColor.name] || "rgba(0, 113, 227, 0.2)";

  return (
    <section className="relative w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 bg-[#1c1c1e] text-[#f5f5f7] border border-white/[0.15] shadow-2xl rounded-2xl px-5 py-3.5 flex items-center space-x-3 backdrop-blur-xl"
          >
            <div className="w-7 h-7 rounded-full bg-[#0071e3] flex items-center justify-center text-white">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Đã thêm vào giỏ hàng!</p>
              <p className="text-[11px] text-neutral-400">
                {product.name} ({currentStorage.size}, {currentColor.name})
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* ========================================================================= */}
        {/* CỘT TRÁI: ẢNH SẢN PHẨM LỚN ĐÃ TÁCH NỀN VỚI FRAMER MOTION FLOATING        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Main Showcase Stage */}
          <div className="relative w-full aspect-square max-w-[540px] flex items-center justify-center rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent p-6 sm:p-10 overflow-visible">
            {/* Ambient Titanium Glow Aura */}
            <motion.div
              animate={{
                background: `radial-gradient(circle, ${glowColor} 0%, rgba(21,21,22,0) 70%)`,
                scale: [1, 1.08, 1],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none rounded-3xl blur-2xl"
            />

            {/* Floating Isolated Product Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${product.slug}-${selectedImageIndex}`}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <motion.img
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  src={activeImage}
                  alt={`${product.name} - ${currentColor.name}`}
                  style={{ maxHeight: "460px", maxWidth: "100%", width: "auto", objectFit: "contain" }}
                  className="max-h-[380px] sm:max-h-[460px] w-auto object-contain filter drop-shadow-[0_28px_40px_rgba(0,0,0,0.85)] cursor-pointer select-none transition-transform hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>

            {/* Interactive Feature Pills */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-md text-[11px] font-medium text-neutral-300 border border-white/[0.06]">
                <Sparkles className="w-3 h-3 text-[#0071e3]" />
                <span>Camera 48MP Pro</span>
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-9 h-9 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.06] flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Yêu thích"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>
            </div>

            {/* Bottom 3D / AR Indicator */}
            <div className="absolute bottom-4 z-20 flex items-center justify-center w-full">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] text-neutral-400 border border-white/[0.06]">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Hiển thị chuẩn màu Apple Display P3</span>
              </div>
            </div>
          </div>

          {/* Product Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="mt-6 flex items-center justify-center space-x-3">
              {images.map((imgUrl, idx) => {
                const isActive = idx === selectedImageIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-[#1c1c1e] transition-all duration-300 cursor-pointer flex items-center justify-center border ${
                      isActive
                        ? "border-[#0071e3] shadow-lg shadow-blue-500/20 scale-105"
                        : "border-white/[0.08] hover:border-white/[0.25] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Góc nhìn ${idx + 1}`}
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                    />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#0071e3] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CỘT PHẢI: TÊN SẢN PHẨM H1, GIÁ TIỀN, BỘ CHỌN MÀU/DUNG LƯỢNG, NÚT CTA      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col space-y-6 pt-2">
          {/* Header Tagline & Model Badge */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Thế hệ mới nhất
              </span>
              <span className="text-xs text-neutral-400">Chip Apple A20 3nm</span>
            </div>

            {/* H1 Tên sản phẩm */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f5f5f7]">
              {product.name}
            </h1>

            <p className="text-sm text-neutral-400 leading-relaxed pt-1">
              {product.shortDescription || product.tagline}
            </p>
          </div>

          {/* Giá tiền */}
          <div className="pt-2 pb-4 border-b border-white/[0.08]">
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#f5f5f7]">
                {currentStorage.priceFormatted}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                {(currentStorage.priceNum * 1.08).toLocaleString("vi-VN")}₫
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Hoặc chỉ từ{" "}
              <span className="text-[#0071e3] font-medium">
                {(Math.round(currentStorage.priceNum / 24)).toLocaleString("vi-VN")}₫/tháng
              </span>{" "}
              với trả góp 0% trong 24 tháng.
            </p>
          </div>

          {/* 1. BỘ CHỌN MÀU SẮC (Color Selector) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#f5f5f7]">
                Màu sắc:{" "}
                <span className="font-normal text-neutral-300">{currentColor.name}</span>
              </span>
              <span className="text-[11px] text-neutral-500">{currentColor.desc}</span>
            </div>

            <div className="flex items-center space-x-4">
              {product.colors.map((color, idx) => {
                const isSelected = idx === selectedColorIndex;
                return (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      // If gallery has at least 3, sync image with color
                      if (images[idx]) {
                        setSelectedImageIndex(idx);
                      }
                    }}
                    className={`group relative p-1 rounded-full transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "ring-2 ring-[#0071e3] ring-offset-2 ring-offset-[#151516] scale-110"
                        : "hover:scale-105"
                    }`}
                    aria-label={color.name}
                  >
                    <span
                      className="block w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-inner border border-white/20 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. BỘ CHỌN DUNG LƯỢNG (Storage Selector) */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#f5f5f7]">Dung lượng lưu trữ</span>
              <span className="text-[11px] text-neutral-400">Bạn cần bao nhiêu dung lượng?</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {product.storages.map((storage, idx) => {
                const isSelected = idx === selectedStorageIndex;
                return (
                  <button
                    key={storage.size}
                    onClick={() => setSelectedStorageIndex(idx)}
                    className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? "border-[#0071e3] bg-[#0071e3]/10 shadow-md shadow-blue-500/10"
                        : "border-white/[0.1] bg-[#1c1c1e] hover:border-white/[0.25]"
                    }`}
                  >
                    <span className="text-sm font-bold text-[#f5f5f7]">
                      {storage.size}
                    </span>
                    <span className="text-[11px] text-neutral-400 mt-0.5">
                      {storage.priceFormatted}
                    </span>

                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#0071e3] text-white rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. NÚT BẤM (Call to Action): MÀU XANH DƯƠNG APPLE #0071e3, BORDER-RADIUS: 98PX */}
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Nút Thêm vào giỏ hàng */}
              <button
                onClick={handleAddToCart}
                id="btn-add-to-cart"
                className="w-full text-center py-3.5 px-6 font-semibold text-sm text-white bg-transparent border-2 border-[#0071e3] hover:bg-[#0071e3]/15 transition-all duration-200 active:scale-98 cursor-pointer shadow-sm hover:shadow-blue-500/15"
                style={{ borderRadius: "98px" }}
              >
                Thêm vào giỏ hàng
              </button>

              {/* Nút Mua ngay - chuẩn màu #0071e3, border-radius: 98px */}
              <button
                onClick={handleBuyNow}
                id="btn-buy-now"
                className="w-full text-center py-3.5 px-6 font-semibold text-sm text-white bg-[#0071e3] hover:bg-[#0077ed] transition-all duration-200 active:scale-98 cursor-pointer shadow-lg shadow-blue-600/30 hover:shadow-blue-600/45"
                style={{ borderRadius: "98px" }}
              >
                Mua ngay
              </button>
            </div>

            <p className="text-[11px] text-center text-neutral-400 pt-1">
              Giao hàng nhanh miễn phí toàn quốc hoặc nhận tại Apple Store.
            </p>
          </div>

          {/* Perks & Service Value Props */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2.5 text-xs text-neutral-300">
            <div className="flex items-center space-x-3">
              <Truck className="w-4 h-4 text-[#0071e3] shrink-0" />
              <span>Giao hàng miễn phí trong 24 giờ cho mọi đơn hàng iPhone.</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-4 h-4 text-[#0071e3] shrink-0" />
              <span>Đổi trả miễn phí và dễ dàng trong vòng 14 ngày.</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 text-[#0071e3] shrink-0" />
              <span>Bảo hành chính hãng 1 năm và hỗ trợ kỹ thuật chuyên gia Apple.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
