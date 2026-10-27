"use client";

import React from "react";
import Image from "next/image";
import { ProductItem } from "@/lib/graphql";
import { Sparkles } from "lucide-react";

interface ProductSwitcherProps {
  products: ProductItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ProductSwitcher({
  products,
  selectedIndex,
  onSelect,
}: ProductSwitcherProps) {
  return (
    <div className="w-full bg-[#F8F2EF] py-8 border-b border-[#4C637C]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4C637C] block mb-1">
              BỘ SƯU TẬP CHỦ ĐẠO 2026
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E252D] font-medium">
              Chọn Tác Phẩm Sofa Của Bạn
            </h2>
          </div>
          <p className="text-xs text-[#5F6872] max-w-md font-light leading-relaxed">
            3 phong cách nội thất kinh điển đại diện cho sự phóng khoáng đương đại, nét hữu cơ Bắc Âu và di sản da thuộc Ý.
          </p>
        </div>

        {/* 3 Master Cards Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {products.map((p, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={p.id || idx}
                onClick={() => onSelect(idx)}
                className={`text-left p-4 rounded-2xl transition-all duration-300 relative flex items-center gap-4 cursor-pointer border ${
                  isSelected
                    ? "bg-[#F8F2EF] border-[#4C637C] shadow-lg shadow-[#4C637C]/10 ring-2 ring-[#4C637C]/20"
                    : "bg-[#E1D7D2]/40 hover:bg-[#E1D7D2]/70 border-transparent hover:border-[#4C637C]/15"
                }`}
              >
                {/* Active Indicator Top Pill */}
                {isSelected && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#4C637C] text-[#F8F2EF] text-[9px] font-bold tracking-[0.1em] uppercase flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 text-[#CEB88E]" /> Đang Xem
                  </span>
                )}

                {/* Thumbnail Image */}
                <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-[#DEE6EC] relative">
                  <Image
                    src={p.featuredImage}
                    alt={p.name}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#5F6872] block truncate">
                    Tác phẩm #{idx + 1}
                  </span>
                  <h3
                    className={`font-serif text-base sm:text-lg truncate transition-colors ${
                      isSelected ? "text-[#4C637C] font-semibold" : "text-[#1E252D] font-medium"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#1E252D] font-semibold mt-0.5 font-sans">
                    Từ {p.price}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
