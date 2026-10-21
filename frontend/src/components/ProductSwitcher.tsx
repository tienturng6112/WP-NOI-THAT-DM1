"use client";

import React from "react";
import { ProductItem } from "@/lib/graphql";

interface ProductSwitcherProps {
  products: ProductItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onBuyNowClick: () => void;
}

export default function ProductSwitcher({
  products,
  selectedIndex,
  onSelect,
  onBuyNowClick,
}: ProductSwitcherProps) {
  const currentProduct = products[selectedIndex] || products[0];

  return (
    <div className="sticky top-11 z-40 w-full backdrop-blur-md bg-[#151516]/90 border-b border-white/[0.08] transition-all">
      <div className="max-w-[1024px] mx-auto px-4 h-14 flex items-center justify-between">
        {/* Model Selector Tabs */}
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar">
          {products.map((product, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={product.slug || product.id}
                onClick={() => onSelect(idx)}
                className={`relative px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "text-[#f5f5f7] bg-white/[0.12] shadow-sm"
                    : "text-neutral-400 hover:text-[#f5f5f7] hover:bg-white/[0.05]"
                }`}
              >
                {product.name}
                {isSelected && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#0071e3] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Info: Live Price & Fast Action */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="text-right">
            <span className="block text-[11px] text-neutral-400">Giá khởi điểm từ</span>
            <span className="text-sm font-semibold text-[#f5f5f7]">
              {currentProduct?.storages?.[0]?.priceFormatted || currentProduct?.price || "28.990.000₫"}
            </span>
          </div>

          <button
            onClick={onBuyNowClick}
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium px-4 py-1.5 transition-all duration-200 shadow-md hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
            style={{ borderRadius: "98px" }}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
